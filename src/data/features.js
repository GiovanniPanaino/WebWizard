import { MessageCircle, Mail, MapPin, Share2, Download, CalendarDays, Search, ListFilter, LockKeyhole, CreditCard, UserRound, Blocks } from 'lucide-react';

export const featureCatalogue = [
  { id: 'whatsapp', label: 'WHATSAPP', description: 'Let visitors contact me on WhatsApp', icon: MessageCircle },
  { id: 'enquiry-form', label: 'ENQUIRY FORM', description: 'Let visitors send me enquiries', icon: Mail },
  { id: 'map-directions', label: 'MAP & DIRECTIONS', description: 'Show customers where I am', icon: MapPin },
  { id: 'social-links', label: 'SOCIAL LINKS', description: 'Link visitors to my social accounts', icon: Share2 },
  { id: 'downloads', label: 'DOWNLOADS', description: 'Let visitors download files or documents', icon: Download },
  { id: 'booking-requests', label: 'BOOKING REQUESTS', description: 'Let customers request appointments or bookings', icon: CalendarDays },
  { id: 'search', label: 'SEARCH', description: 'Let visitors search my website', icon: Search },
  { id: 'filters', label: 'FILTERS', description: 'Let visitors filter products, services or content', icon: ListFilter },
  { id: 'protected-area', label: 'PROTECTED AREA', description: 'Private or login-only content', icon: LockKeyhole },
  { id: 'payments-checkout', label: 'PAYMENTS / CHECKOUT', description: 'Accept payments or orders online', icon: CreditCard },
  { id: 'customer-accounts', label: 'CUSTOMER ACCOUNTS', description: 'Let customers create and use an account', icon: UserRound },
  { id: 'custom-functionality', label: 'CUSTOM FUNCTIONALITY', description: "I need something that isn't listed here", icon: Blocks },
];
