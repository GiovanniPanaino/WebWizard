import { Building2, Utensils, BriefcaseBusiness, Images, Package, CalendarDays, Blocks } from 'lucide-react';
import { sectionsById } from './sections';

function recipe(...ids) {
  return ids.map(id => sectionsById[id]);
}

export const projectTypes = [
  {
    id: 'business', label: 'BUSINESS WEBSITE', icon: Building2,
    sections: recipe('hero', 'about', 'services', 'contact'),
  },
  {
    id: 'hospitality', label: 'RESTAURANT / HOSPITALITY', icon: Utensils,
    sections: recipe('hero', 'about', 'menu', 'gallery', 'contact'),
  },
  {
    id: 'services', label: 'SERVICES', icon: BriefcaseBusiness,
    sections: recipe('hero', 'services', 'why-us', 'testimonials', 'contact'),
  },
  {
    id: 'portfolio', label: 'PORTFOLIO', icon: Images,
    sections: recipe('hero', 'about', 'portfolio', 'contact'),
  },
  {
    id: 'catalogue', label: 'CATALOGUE', icon: Package,
    sections: recipe('hero', 'categories', 'products', 'contact'),
  },
  {
    id: 'booking', label: 'BOOKING / APPOINTMENTS', icon: CalendarDays,
    sections: recipe('hero', 'services', 'booking', 'contact'),
  },
  {
    id: 'custom', label: 'CUSTOM', icon: Blocks,
    sections: recipe('hero', 'custom-section', 'contact'),
  },
];
