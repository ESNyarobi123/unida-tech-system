/**
 * Sample image & video URLs for placeholder/sample data.
 * Replace with your own assets or CMS URLs in production.
 */

const PICSUM = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/**
 * Hero section background – professional technology / digital transformation.
 * High-quality online image (Unsplash). Replace with your own asset in production.
 */
export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80";

/** About Us section (office/tech) */
export const ABOUT_IMAGE = PICSUM("unida-about", 800, 600);

/** Insights / blog cards – one per card */
export const INSIGHT_IMAGES = [
  PICSUM("unida-insight-1", 600, 400),
  PICSUM("unida-insight-2", 600, 400),
  PICSUM("unida-insight-3", 600, 400),
];

/** Portfolio project thumbnails */
export const PORTFOLIO_SAMPLES = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack online store with inventory and payments.",
    tag: "Web App",
    image: PICSUM("unida-port-1", 600, 400),
    url: "#",
  },
  {
    id: "2",
    title: "Fleet Tracking Dashboard",
    description: "Real-time GPS tracking and reporting for logistics.",
    tag: "System",
    image: PICSUM("unida-port-2", 600, 400),
    url: "#",
  },
  {
    id: "3",
    title: "Corporate Website",
    description: "Modern responsive site with CMS and contact forms.",
    tag: "Website",
    image: PICSUM("unida-port-3", 600, 400),
    url: "#",
  },
  {
    id: "4",
    title: "Mobile Inventory App",
    description: "Cross-platform app for warehouse and stock management.",
    tag: "Mobile",
    image: PICSUM("unida-port-4", 600, 400),
    url: "#",
  },
  {
    id: "5",
    title: "HR & Attendance System",
    description: "Employee records, leave, and attendance in one place.",
    tag: "System",
    image: PICSUM("unida-port-5", 600, 400),
    url: "#",
  },
  {
    id: "6",
    title: "Security Audit Report Portal",
    description: "Secure portal for pentest and compliance reports.",
    tag: "Security",
    image: PICSUM("unida-port-6", 600, 400),
    url: "#",
  },
];

/** Testimonials with avatar images */
export const TESTIMONIAL_SAMPLES = [
  {
    id: "1",
    quote: "Unida Tech delivered our e-commerce platform on time. Professional and responsive team.",
    author: "Sarah M.",
    role: "Director, Retail Co.",
    avatar: PICSUM("unida-avatar-1", 120, 120),
    rating: 5,
  },
  {
    id: "2",
    quote: "The tracking system they built has transformed our logistics. Highly recommend.",
    author: "James K.",
    role: "Operations Manager",
    avatar: PICSUM("unida-avatar-2", 120, 120),
    rating: 5,
  },
  {
    id: "3",
    quote: "Clean code, clear communication, and a website we are proud of.",
    author: "Amina H.",
    role: "Founder, Tech Startup",
    avatar: PICSUM("unida-avatar-3", 120, 120),
    rating: 5,
  },
];

/** Optional: sample video URL (e.g. for hero or about) – use a short demo or placeholder */
export const SAMPLE_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
