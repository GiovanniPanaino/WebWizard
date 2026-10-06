// Requirement meaning and context determine guidance; there is no points score.
export const featureGuidance = {
  whatsapp: { kind: 'conventional', name: 'WhatsApp contact' },
  'enquiry-form': { kind: 'conventional', name: 'enquiries' },
  'map-directions': { kind: 'conventional', name: 'maps and directions' },
  'social-links': { kind: 'conventional', name: 'social links' },
  downloads: { kind: 'conventional', name: 'downloads' },
  'booking-requests': { kind: 'interactive', name: 'booking requests' },
  search: { kind: 'interactive', name: 'search' },
  filters: { kind: 'interactive', name: 'filters' },
  'protected-area': { kind: 'review', name: 'protected content' },
  'payments-checkout': { kind: 'review', name: 'payments and checkout' },
  'customer-accounts': { kind: 'application', name: 'customer accounts' },
  'custom-functionality': { kind: 'application', name: 'custom functionality' },
};

export const complexityLevels = {
  standard: { id: 'standard', label: 'STANDARD WEBSITE' },
  advanced: { id: 'advanced', label: 'ADVANCED WEBSITE' },
  custom: { id: 'custom', label: 'CUSTOM DEVELOPMENT' },
};

// Most specific combinations take priority over individual requirement guidance.
export const combinationRules = [
  { features: ['customer-accounts', 'protected-area', 'payments-checkout'], level: 'custom', reason: 'Customer accounts, protected content and payments introduce connected functionality beyond a conventional public website.' },
  { features: ['customer-accounts', 'protected-area'], level: 'custom', reason: 'Customer accounts and protected content introduce application-level functionality beyond a standard public website.' },
  { features: ['customer-accounts', 'payments-checkout'], level: 'custom', reason: 'Customer accounts and payments connect customer access with purchasing, calling for a tailored development approach.' },
  { features: ['protected-area', 'payments-checkout'], level: 'custom', reason: 'Protected content combined with payments extends the project beyond a conventional public website. The access and purchasing requirements need review together.' },
];

export const individualReasons = {
  'customer-accounts': 'Customer accounts introduce individual customer access and experiences beyond a conventional public website.',
  'custom-functionality': 'Your requested custom functionality needs a tailored development approach. Its scope will be clarified during project review.',
  'protected-area': 'Protected content needs access requirements to be clarified. Business+ may accommodate it, depending on the level of protection required.',
  'payments-checkout': 'Payments and checkout need a closer scope review. A simple payment option differs from a complete ordering system.',
};

export const sectionSuggestionRules = [
  { featureId: 'booking-requests', sectionId: 'booking', sectionName: 'Booking', label: 'Suggested section', explanation: 'You selected Booking Requests, but your current website structure does not contain a Booking section.', action: '+ ADD BOOKING SECTION' },
];

// Section count only distinguishes a small brochure from a multi-section website.
// Business+ requires richer functionality or catalogue structure, not more content alone.
export const packageScope = { launchSections: 3 };
export const catalogueSections = ['products', 'categories'];
export const contentDiscoveryFeatures = ['search', 'filters'];
