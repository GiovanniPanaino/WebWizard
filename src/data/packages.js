export const packages = [
  {
    id: 'launch', name: 'Launch', stage: '01', level: 1,
    price: 'R2,950', cta: 'CHOOSE LAUNCH',
    description: 'A professional online presence for small businesses that need the essentials done properly.',
    features: [
      'Up to 3 pages or equivalent sections', 'Custom responsive design', 'Business branding integration',
      'Contact details and click-to-call', 'WhatsApp integration', 'Enquiry form', 'Map / location integration',
      'Social links', 'Basic on-page SEO', 'Performance optimisation', 'Favicon and deployment', '1 revision round',
    ],
  },
  {
    id: 'business', name: 'Business', stage: '02', level: 2, recommended: true,
    price: 'R5,950', cta: 'CHOOSE BUSINESS',
    description: 'A complete business website for organisations that need stronger content, functionality and customer engagement.',
    features: [
      'Up to 7 pages', 'Everything in Launch', 'Enhanced custom design', 'Galleries',
      'Services, products or menu sections', 'Multiple enquiry calls-to-action', 'Enhanced forms',
      'Social integration', 'Stronger SEO structure', 'Analytics integration',
      'Additional interactions and animation', '2 revision rounds',
    ],
  },
  {
    id: 'business-plus', name: 'Business+', stage: '03', level: 3,
    price: 'From R9,950', cta: 'CHOOSE BUSINESS+',
    description: 'Advanced websites for businesses requiring richer functionality, larger content structures or more complex customer interactions.',
    note: 'Scope and final price confirmed in your quotation.',
    features: [
      'Everything in Business', 'Searchable or filterable content', 'Larger catalogues', 'Advanced forms',
      'Booking or request workflows', 'Protected areas where required', 'Custom interactive components',
      'Integrations', 'Business-specific functionality',
    ],
  },
  {
    id: 'custom', name: 'Custom Development', stage: '04', level: 4,
    price: 'Quoted individually', cta: 'DISCUSS YOUR PROJECT',
    description: 'For projects that extend beyond a conventional website into applications, databases, portals, dashboards or operational systems.',
    features: [
      'Web applications', 'Customer portals', 'Administration systems', 'Databases',
      'Authentication and user roles', 'Dashboards', 'Business workflows', 'Custom integrations',
    ],
  },
];

export const paymentTerms = [
  { name: 'Launch and Business', stages: ['50% to commence', '50% before production launch / handover'] },
  { name: 'Business+', stages: ['40% to commence', '30% at design / milestone approval', '30% before production launch / handover'] },
  { name: 'Custom Development', stages: ['30% to commence', 'Remaining payments tied to agreed project milestones'] },
];
