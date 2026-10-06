import test from 'node:test';
import assert from 'node:assert/strict';
import { assessProject } from '../src/utils/assessProject.js';

const sections = (...ids) => ids.map(id => ({ id }));
const base = { selectedSections: sections('hero', 'about', 'services', 'contact') };
const assess = values => assessProject({ ...base, ...values });

test('unanswered features produce no insight', () => {
  assert.equal(assess({ selectedFeatures: [] }), null);
});
test('A: No Extra Features is Standard with structure-aware package guidance', () => {
  const result = assess({ noExtraFeatures: true });
  assert.equal(result.complexity.id, 'standard');
  assert.equal(result.packageGuidance.id, 'business');
  assert.match(result.reasons.join(' '), /No additional functionality/);
});
test('B: several conventional features remain Standard', () => {
  assert.equal(assess({ selectedFeatures: ['whatsapp', 'enquiry-form', 'map-directions', 'social-links'] }).complexity.id, 'standard');
});
test('C: Booking suggestion disappears when Booking exists, without mutating input', () => {
  const input = { ...base, selectedFeatures: ['booking-requests'] };
  const before = structuredClone(input);
  assert.equal(assess(input).suggestions[0].sectionId, 'booking');
  assert.equal(assess(input).complexity.id, 'standard');
  assert.deepEqual(input, before);
  assert.deepEqual(assess({ ...input, selectedSections: sections('hero', 'booking', 'contact') }).suggestions, []);
});
test('D: Search + Filters with a catalogue are Advanced', () => {
  const result = assess({ selectedFeatures: ['search', 'filters'], selectedSections: sections('hero', 'categories', 'products', 'contact') });
  assert.equal(result.complexity.id, 'advanced');
  assert.equal(result.packageGuidance.id, 'business-plus');
  assert.match(result.reasons.join(' '), /catalogue|products/i);
});
for (const [scenario, features] of [['E', ['customer-accounts', 'protected-area']], ['F', ['customer-accounts', 'payments-checkout']], ['G', ['customer-accounts', 'protected-area', 'payments-checkout']]]) {
  test(`${scenario}: account combinations are Custom with specific reasons`, () => {
    const result = assess({ selectedFeatures: features });
    assert.equal(result.complexity.id, 'custom');
    assert.equal(result.packageGuidance.id, 'custom');
    assert.match(result.reasons.join(' '), /accounts/i);
    assert.match(result.packageGuidance.price, /Quotation required/);
    if (features.includes('protected-area')) assert.match(result.reasons.join(' '), /protected/i);
    if (features.includes('payments-checkout')) assert.match(result.reasons.join(' '), /payments/i);
  });
}
test('H: Launch growth is derived, without changing the starting package', () => {
  const result = assess({ startingPackageId: 'launch', selectedFeatures: ['search', 'filters'] });
  assert.equal(result.growth.startingPackageId, 'launch');
  assert.equal(result.packageGuidance.id, 'business-plus');
  assert.match(result.growth.explanation, /Launch.*Business\+/);
});
test('I: Business + accounts/payment requirements signals Custom growth', () => {
  const result = assess({ startingPackageId: 'business', selectedFeatures: ['customer-accounts', 'payments-checkout'] });
  assert.equal(result.growth.startingPackageId, 'business');
  assert.equal(result.packageGuidance.id, 'custom');
});
test('J: no package query makes no claim about an original package', () => {
  const result = assess({ selectedFeatures: ['customer-accounts'] });
  assert.equal(result.growth, null);
  assert.equal(result.startingPackage, null);
});
test('isolated richer features stay contextual; catalogue search increases scope', () => {
  for (const feature of ['booking-requests', 'search', 'filters']) assert.equal(assess({ selectedFeatures: [feature] }).complexity.id, 'standard');
  assert.equal(assess({ selectedFeatures: ['search'], selectedSections: sections('hero', 'products', 'contact') }).complexity.id, 'advanced');
  for (const feature of ['protected-area', 'payments-checkout']) assert.equal(assess({ selectedFeatures: [feature] }).complexity.id, 'advanced');
  assert.equal(assess({ selectedFeatures: ['custom-functionality'] }).complexity.id, 'custom');
});
test('section scope respects package boundaries without downgrading a starting package', () => {
  const simple = { selectedFeatures: ['whatsapp'], selectedSections: sections('hero', 'about', 'contact') };
  assert.equal(assess(simple).packageGuidance.id, 'launch');
  assert.equal(assess({ ...simple, startingPackageId: 'custom' }).growth, null);
  assert.equal(assess({ ...simple, startingPackageId: 'custom' }).startingPackage.id, 'custom');
  assert.equal(assess({ noExtraFeatures: true, selectedSections: sections('hero', 'about', 'services', 'gallery', 'team', 'faq', 'testimonials', 'contact') }).packageGuidance.id, 'business');
});
test('eight ordinary sections remain Business with conventional features or no extras', () => {
  const selectedSections = sections('hero', 'about', 'services', 'why-us', 'testimonials', 'gallery', 'faq', 'contact');
  for (const answer of [{ noExtraFeatures: true }, { selectedFeatures: ['whatsapp', 'enquiry-form'] }]) {
    const result = assess({ ...answer, selectedSections, startingPackageId: 'business' });
    assert.equal(result.complexity.id, 'standard');
    assert.equal(result.packageGuidance.id, 'business');
    assert.equal(result.growth, null);
  }
});
test('small Advanced projects recommend Business+ independently of section count', () => {
  const result = assess({ selectedSections: sections('hero', 'contact'), selectedFeatures: ['search', 'filters'] });
  assert.equal(result.complexity.id, 'advanced');
  assert.equal(result.packageGuidance.id, 'business-plus');
});
test('small conventional brochure projects recommend Launch, but interaction is not brochure functionality', () => {
  const selectedSections = sections('hero', 'about', 'contact');
  for (const answer of [{ noExtraFeatures: true }, { selectedFeatures: ['whatsapp', 'enquiry-form', 'downloads'] }]) {
    assert.equal(assess({ ...answer, selectedSections }).packageGuidance.id, 'launch');
  }
  const booking = assess({ selectedSections, selectedFeatures: ['booking-requests'] });
  assert.equal(booking.complexity.id, 'standard');
  assert.equal(booking.packageGuidance.id, 'business');
});
test('richer catalogue structure recommends Business+ even without extra features', () => {
  assert.equal(assess({ noExtraFeatures: true, selectedSections: sections('hero', 'products', 'categories', 'contact') }).packageGuidance.id, 'business-plus');
});
test('results are deterministic, ignore invalid input, and preserve advertised pricing', () => {
  const a = assess({ selectedFeatures: ['filters', 'search', 'search', 'unknown'], startingPackageId: 'unknown' });
  const b = assess({ selectedFeatures: ['search', 'filters'] });
  assert.deepEqual(a, b);
  assert.equal(assess({ selectedFeatures: ['unknown'] }), null);
  assert.equal(assess({ selectedFeatures: ['whatsapp'], selectedSections: sections('hero', 'contact') }).packageGuidance.price, 'Starting from R2,950');
  assert.equal(assess({ selectedFeatures: ['whatsapp'] }).packageGuidance.price, 'Starting from R5,950');
  assert.equal(a.packageGuidance.price, 'Business+ starts from R9,950');
});
