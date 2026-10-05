import { Building2, Utensils, BriefcaseBusiness, Images, Package, CalendarDays, Blocks } from 'lucide-react';

function section(title, type = 'text') {
  return { id: title.toLowerCase().replaceAll(' ', '-'), title: title.toUpperCase(), type };
}

export const projectTypes = [
  {
    id: 'business', label: 'BUSINESS WEBSITE', icon: Building2,
    sections: [section('Hero', 'hero'), section('About'), section('Services', 'cards'), section('Contact', 'contact')],
  },
  {
    id: 'hospitality', label: 'RESTAURANT / HOSPITALITY', icon: Utensils,
    sections: [section('Hero', 'hero'), section('About'), section('Menu'), section('Gallery', 'cards'), section('Contact', 'contact')],
  },
  {
    id: 'services', label: 'SERVICES', icon: BriefcaseBusiness,
    sections: [section('Hero', 'hero'), section('Services', 'cards'), section('Why Us'), section('Testimonials'), section('Contact', 'contact')],
  },
  {
    id: 'portfolio', label: 'PORTFOLIO', icon: Images,
    sections: [section('Hero', 'hero'), section('About'), section('Portfolio', 'cards'), section('Contact', 'contact')],
  },
  {
    id: 'catalogue', label: 'CATALOGUE', icon: Package,
    sections: [section('Hero', 'hero'), section('Categories'), section('Products', 'cards'), section('Contact', 'contact')],
  },
  {
    id: 'booking', label: 'BOOKING / APPOINTMENTS', icon: CalendarDays,
    sections: [section('Hero', 'hero'), section('Services', 'cards'), section('Booking'), section('Contact', 'contact')],
  },
  {
    id: 'custom', label: 'CUSTOM', icon: Blocks,
    sections: [section('Hero', 'hero'), section('Custom Section'), section('Contact', 'contact')],
  },
];
