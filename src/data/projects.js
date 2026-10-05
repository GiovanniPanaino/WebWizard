import hero from '../images/projects/harvard-cafe/hero-1026.webp';
import heroSmall from '../images/projects/harvard-cafe/hero-640.webp';
import whyMenu from '../images/projects/harvard-cafe/why-menu-1027.webp';
import whyMenuSmall from '../images/projects/harvard-cafe/why-menu-640.webp';
import menuModal from '../images/projects/harvard-cafe/menu-modal-1053.webp';
import menuModalSmall from '../images/projects/harvard-cafe/menu-modal-640.webp';
import overview from '../images/projects/command-deck/overview-1028.webp';
import overviewSmall from '../images/projects/command-deck/overview-640.webp';
import menuManager from '../images/projects/command-deck/menumanager-1026.webp';
import menuManagerSmall from '../images/projects/command-deck/menumanager-640.webp';
import photoManager from '../images/projects/command-deck/photomanager-1004.webp';
import photoManagerSmall from '../images/projects/command-deck/photomanager-640.webp';
import pos from '../images/projects/dragonpos/pos-1078.webp';
import posSmall from '../images/projects/dragonpos/pos-640.webp';
import dashboard from '../images/projects/dragonpos/dashboard-1073.webp';
import dashboardSmall from '../images/projects/dragonpos/dashboard-640.webp';
import productsScreen from '../images/projects/dragonpos/products-1077.webp';
import productsSmall from '../images/projects/dragonpos/products-640.webp';
import reports from '../images/projects/dragonpos/reports-1072.webp';
import reportsSmall from '../images/projects/dragonpos/reports-640.webp';

const mobileScreenSizes = '(max-width: 600px) calc(100vw - 52px)';
const commandPrimarySizes = `${mobileScreenSizes}, (max-width: 1100px) calc(100vw - 76px), (max-width: 1712px) calc((100vw - 160px) * .46 - 12px), 701px`;
const commandSupportSizes = `${mobileScreenSizes}, (max-width: 1100px) calc((100vw - 88px) / 2 - 12px), (max-width: 1712px) calc((100vw - 160px) * .27 - 12px), 407px`;
const systemSupportSizes = `${mobileScreenSizes}, (max-width: 1100px) calc(100vw - 76px), (max-width: 1712px) calc((100vw - 160px) / 3 - 12px), 505px`;

export const projects = [
  {
    id: 'harvard-cafe', number: '01', category: 'WEBSITE DEVELOPMENT',
    title: 'Harvard Café', status: 'LIVE PROJECT',
    description: "A responsive restaurant website designed to bring together the café's menu, specials, functions, gallery and aviation setting within a clear customer-facing experience.",
    capabilities: ['Responsive website', 'Menu presentation', 'Specials', 'Functions', 'Gallery', 'Customer-facing content'],
    technologies: ['React', 'Vite', 'Responsive Web'],
    media: {
      variant: 'browser', label: 'HARVARD CAFÉ', composition: 'harvard',
      images: [
        { src: hero, srcSet: `${heroSmall} 640w, ${hero} 1026w`, sizes: '(max-width: 600px) calc(100vw - 40px), (max-width: 800px) calc(100vw - 64px), (max-width: 1024px) calc((100vw - 96px) / 2), (max-width: 1366px) 58vw, 760px', width: 1026, height: 1778, role: 'hero', label: 'Homepage', alt: 'Harvard Café website homepage showing the Rand Airport café and aviation setting' },
        { src: whyMenu, srcSet: `${whyMenuSmall} 640w, ${whyMenu} 1027w`, sizes: '(max-width: 600px) 90vw, (max-width: 800px) 52vw, (max-width: 1100px) 45vw, 410px', width: 1027, height: 1733, role: 'structure', label: 'Venue & menu', alt: 'Harvard Café website showing the venue introduction and interactive menu section' },
        { src: menuModal, srcSet: `${menuModalSmall} 640w, ${menuModal} 1053w`, sizes: '(max-width: 600px) 82vw, (max-width: 800px) 42vw, (max-width: 1100px) 40vw, 335px', width: 1053, height: 1235, role: 'detail', label: 'Menu interaction', alt: 'Harvard Café website breakfast menu interface displayed in a modal' },
      ],
    },
    liveUrl: 'https://giovannipanaino.github.io/harvard-cafe-v2/',
    demoUrl: null, caseStudyUrl: null,
  },
  {
    id: 'harvard-command-deck', number: '02', category: 'WEB APPLICATION',
    title: 'Harvard Command Deck', status: 'APPLICATION PROTOTYPE',
    description: 'A management interface designed to give the business direct control over customer-facing website content and operational information.',
    capabilities: ['Menu management', 'Pricing and descriptions', 'Gallery management', 'Specials control', 'Business information management', 'Administrative interface'],
    technologies: [],
    media: {
      variant: 'workspace', label: 'COMMAND DECK', composition: 'command-deck',
      images: [
        { src: overview, srcSet: `${overviewSmall} 640w, ${overview} 1028w`, sizes: commandPrimarySizes, width: 1028, height: 1037, role: 'overview', label: 'Command Deck / Overview', alt: 'Command Deck administration overview with content status, management shortcuts and recent changes' },
        { src: menuManager, srcSet: `${menuManagerSmall} 640w, ${menuManager} 1026w`, sizes: commandSupportSizes, width: 1026, height: 889, role: 'menu', label: 'Menu management', alt: 'Command Deck menu editor with category selection, item name, price, description and customer-facing preview' },
        { src: photoManager, srcSet: `${photoManagerSmall} 640w, ${photoManager} 1004w`, sizes: commandSupportSizes, width: 1004, height: 1668, role: 'photos', label: 'Photo management', alt: 'Command Deck photo manager with category filters and a gallery of food and drink images with editing controls' },
      ],
    },
    liveUrl: null, demoUrl: null, caseStudyUrl: null,
  },
  {
    id: 'dragonpos', number: '03', category: 'BUSINESS SYSTEM',
    title: 'DragonPOS', status: 'BUSINESS SYSTEM',
    description: 'A point-of-sale and business management system combining sales, stock control, cash-up workflows, user roles and administration within an installable progressive web application.',
    capabilities: ['Point of sale', 'Inventory and stock control', 'Cash-up workflows', 'User roles', 'Administration', 'Installable PWA', 'Offline capability'],
    technologies: ['PWA', 'PHP', 'MySQL'],
    media: {
      variant: 'system', label: 'DRAGONPOS', composition: 'dragonpos',
      images: [
        { src: pos, srcSet: `${posSmall} 640w, ${pos} 1078w`, sizes: `${mobileScreenSizes}, (max-width: 1100px) calc(100vw - 76px), 1066px`, width: 1078, height: 485, role: 'pos', label: 'DragonPOS / Transaction interface', alt: 'DragonPOS operational sales screen with product categories, item selection and the current sale panel' },
        { src: dashboard, srcSet: `${dashboardSmall} 640w, ${dashboard} 1073w`, sizes: systemSupportSizes, width: 1073, height: 416, role: 'dashboard', label: '01 / Dashboard', alt: 'FIERO Core management dashboard with shortcuts to products, accounts, reports, stock and users' },
        { src: productsScreen, srcSet: `${productsSmall} 640w, ${productsScreen} 1077w`, sizes: systemSupportSizes, width: 1077, height: 625, role: 'products', label: '02 / Products', alt: 'FIERO Core product administration form showing pricing, stock, category and product settings' },
        { src: reports, srcSet: `${reportsSmall} 640w, ${reports} 1072w`, sizes: systemSupportSizes, width: 1072, height: 563, role: 'reports', label: '03 / Reports', alt: 'FIERO Core reporting workspace with report categories and a list of cash-up reports' },
      ],
    },
    liveUrl: null, demoUrl: null, caseStudyUrl: null,
  },
];
