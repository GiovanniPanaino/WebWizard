export const sectionCatalogue = [
  { id: 'hero', title: 'HERO', type: 'hero', core: true },
  { id: 'about', title: 'ABOUT', type: 'text' },
  { id: 'services', title: 'SERVICES', type: 'cards' },
  { id: 'products', title: 'PRODUCTS', type: 'cards' },
  { id: 'categories', title: 'CATEGORIES', type: 'text' },
  { id: 'menu', title: 'MENU', type: 'text' },
  { id: 'gallery', title: 'GALLERY', type: 'cards' },
  { id: 'specials', title: 'SPECIALS', type: 'cards' },
  { id: 'portfolio', title: 'PORTFOLIO', type: 'cards' },
  { id: 'why-us', title: 'WHY US', type: 'text' },
  { id: 'testimonials', title: 'TESTIMONIALS', type: 'text' },
  { id: 'team', title: 'TEAM', type: 'cards' },
  { id: 'faq', title: 'FAQ', type: 'text' },
  { id: 'booking', title: 'BOOKING', type: 'text' },
  { id: 'contact', title: 'CONTACT', type: 'contact', core: true },
  { id: 'custom-section', title: 'CUSTOM SECTION', type: 'text' },
];

export const sectionsById = Object.fromEntries(sectionCatalogue.map(section => [section.id, section]));
