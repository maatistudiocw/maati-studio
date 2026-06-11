export interface Service {
  number: string;
  name: string;
  tagline: string;
  subServices: string[];
}

export const services: Service[] = [
  {
    number: '01',
    name: 'Brand Strategy & Identity',
    tagline:
      'We build brands that hold — in boardrooms, on billboards, and on screens.',
    subServices: [
      'Brand strategy & positioning',
      'Logo, visual identity & brand guidelines',
      'Brand audit, refresh & rebranding',
      'Naming, tagline & tone of voice',
      'Employer & co-branding',
      'Presentation & pitch deck design',
    ],
  },
  {
    number: '02',
    name: 'Design & Static Graphics',
    tagline: 'Visuals that communicate before a word is read.',
    subServices: [
      'Social media creatives & ad banners',
      'Brochures, catalogues & lookbooks',
      'Infographics & data visualisation',
      'Email & newsletter design',
      'Event & exhibition collateral',
      'Print — stationery, signage, merch',
    ],
  },
  {
    number: '03',
    name: 'Motion Graphics & Animation',
    tagline: 'Movement that makes the message impossible to ignore.',
    subServices: [
      'Brand films & explainer videos',
      'Social reels & short-form content',
      'Animated infographics & kinetic type',
      '2D/3D animation',
      'Video ad production (Meta, YT, LinkedIn)',
      'UGC-style & testimonial videos',
    ],
  },
  {
    number: '04',
    name: 'Photography & Videography',
    tagline: 'Real moments, crafted to last.',
    subServices: [
      'Product & architectural photography',
      'Corporate & team shoots',
      'Event photography & coverage',
      'Lifestyle & editorial shoots',
      'Drone & aerial photography',
      'Founder & personal brand shoots',
    ],
  },
  {
    number: '05',
    name: 'Social Media Management',
    tagline: 'Consistent presence. Genuine community. Real results.',
    subServices: [
      'Strategy, calendar & content planning',
      'Platform management & publishing',
      'Community management & engagement',
      'Influencer identification & campaigns',
      'Founder LinkedIn management',
      'Monthly analytics & reporting',
    ],
  },
  {
    number: '06',
    name: 'Digital Marketing',
    tagline: "Performance that's built on strategy, not just spend.",
    subServices: [
      'Meta, Google & LinkedIn Ads',
      'SEO & SEM',
      'Email & WhatsApp marketing',
      'Lead generation campaigns',
      'Retargeting & remarketing',
      'Analytics setup & dashboards',
    ],
  },
  {
    number: '07',
    name: 'Product & Web Development',
    tagline: 'Websites and digital products that convert, not just impress.',
    subServices: [
      'Website design & development',
      'Landing pages & microsites',
      'UX/UI design for web & app',
      'Marketing funnels & lead capture',
      'CMS setup & management',
      'Chatbot & form integration',
    ],
  },
  {
    number: '08',
    name: 'Content & Thought Leadership',
    tagline: 'Ideas that earn attention, not just fill space.',
    subServices: [
      'Content strategy & editorial calendar',
      'SEO blogs, articles & whitepapers',
      'Founder & CXO thought leadership',
      'Case studies & press releases',
      'Podcast scripting & production',
      'Newsletter content & management',
    ],
  },
  {
    number: '09',
    name: 'Integrated Campaign Management',
    tagline: 'When everything works together, everything works better.',
    subServices: [
      '360° campaign strategy & execution',
      'ATL — OOH, print, radio',
      'PR & media relations',
      'Product & launch campaigns',
      'GTM strategy for new services',
      'Agency-of-record (AOR) retainers',
    ],
  },
];
