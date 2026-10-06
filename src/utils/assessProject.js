import { packages } from '../data/packages.js';
import { sectionsById } from '../data/sections.js';
import { catalogueSections, combinationRules, complexityLevels, contentDiscoveryFeatures, featureGuidance, individualReasons, packageScope, sectionSuggestionRules } from '../data/wizardRules.js';

function listNames(ids) {
  const names = ids.map(id => featureGuidance[id].name);
  return names.length < 2 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`;
}

function classify(features, sectionIds, noExtraFeatures) {
  if (noExtraFeatures) return { level: 'standard', reasons: ['No additional functionality is currently required. Your project remains focused on its selected content and sections.'] };
  const combination = combinationRules.find(rule => rule.features.every(id => features.includes(id)));
  if (combination) return { level: combination.level, reasons: [combination.reason] };
  const applicationFeatures = features.filter(id => featureGuidance[id].kind === 'application');
  if (applicationFeatures.length) return { level: 'custom', reasons: applicationFeatures.map(id => individualReasons[id]) };
  const reviewFeatures = features.filter(id => featureGuidance[id].kind === 'review');
  if (reviewFeatures.length) return { level: 'advanced', reasons: reviewFeatures.map(id => individualReasons[id]) };
  const interactiveFeatures = features.filter(id => featureGuidance[id].kind === 'interactive');
  const catalogueDiscovery = contentDiscoveryFeatures.some(id => features.includes(id)) && catalogueSections.some(id => sectionIds.includes(id));
  if (catalogueDiscovery) return { level: 'advanced', reasons: [`Using ${listNames(interactiveFeatures)} within your products or catalogue adds richer content discovery and customer interaction.`] };
  if (interactiveFeatures.length >= 2) return { level: 'advanced', reasons: [`Combining ${listNames(interactiveFeatures)} adds richer customer interaction than a straightforward information website.`] };
  const reasons = [`Your selected ${listNames(features)} ${features.length === 1 ? 'fits' : 'fit'} within conventional website functionality.`];
  if (interactiveFeatures.length) reasons[0] = `Your ${listNames(interactiveFeatures)} requirement can remain part of a focused website. The details will be confirmed during project review.`;
  return { level: 'standard', reasons };
}

export function assessProject({ selectedFeatures = [], selectedSections = [], noExtraFeatures = false, startingPackageId } = {}) {
  const features = noExtraFeatures ? [] : Object.keys(featureGuidance).filter(id => selectedFeatures.includes(id));
  if (!noExtraFeatures && !features.length) return null;
  const sectionIds = [...new Set(selectedSections.map(section => section.id).filter(id => sectionsById[id]))];
  const { level, reasons } = classify(features, sectionIds, noExtraFeatures);
  const richerCatalogue = catalogueSections.every(id => sectionIds.includes(id));
  const conventionalFeaturesOnly = features.every(id => featureGuidance[id].kind === 'conventional');
  let packageId = 'launch';
  let scopeReason = 'Your selected structure fits a focused website starting point.';
  if (sectionIds.length > packageScope.launchSections) {
    packageId = 'business';
    scopeReason = 'Your selected content structure suits a multi-section business website.';
  }
  if (!conventionalFeaturesOnly && packageId === 'launch') {
    packageId = 'business';
    scopeReason = 'Your customer interaction requirements suit a business website rather than a small brochure site.';
  }
  if (level === 'advanced' || richerCatalogue) {
    packageId = 'business-plus';
    scopeReason = level === 'advanced' ? 'Your richer functionality is likely better suited to Business+.' : 'Your products and categories create a richer catalogue structure.';
  }
  if (level === 'custom') {
    packageId = 'custom';
    scopeReason = 'These requirements extend into Custom Development.';
  }
  const likelyPackage = packages.find(item => item.id === packageId);
  const startingPackage = packages.find(item => item.id === startingPackageId) || null;
  const growth = startingPackage && likelyPackage.level > startingPackage.level ? {
    startingPackageId: startingPackage.id,
    label: 'YOUR PROJECT HAS GROWN',
    explanation: `Your current requirements extend beyond the typical ${startingPackage.name} package. ${likelyPackage.name} may be a better starting point.`,
  } : null;
  return {
    complexity: complexityLevels[level],
    reasons,
    packageGuidance: {
      id: likelyPackage.id, name: likelyPackage.name,
      price: packageId === 'custom' ? 'Quotation required' : packageId === 'business-plus' ? `${likelyPackage.name} starts from ${likelyPackage.price.replace(/^From /, '')}` : `Starting from ${likelyPackage.price}`,
      explanation: scopeReason,
      disclaimer: packageId === 'custom' ? 'Technical approach, scope and pricing are confirmed after review.' : 'Final scope and pricing are confirmed after project review.',
    },
    startingPackage: startingPackage ? { id: startingPackage.id, name: startingPackage.name } : null,
    growth,
    suggestions: sectionSuggestionRules.filter(rule => features.includes(rule.featureId) && !sectionIds.includes(rule.sectionId) && sectionsById[rule.sectionId]),
  };
}
