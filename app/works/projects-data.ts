export type ProjectStatus = "Ongoing" | "Completed" | "Post Tensioning";

export type LocalProject = {
  id: number;
  title: string;
  status: ProjectStatus;
  details?: string;
  images: string[];
  featured?: boolean;
};

// Bundled fallback content, also used by scripts/seed-sanity.mjs to import into Sanity.
export const localProjects: LocalProject[] = [
  // Ongoing
  {
    id: 1,
    title: "Bizopp Mall, Vadanappally, Thrissur",
    featured: true,
    status: "Ongoing",
    details: "G+2 · 15,010 sqft · Structural works in final stage",
    images: ["/projects/bizopp-mall-render.webp", "/projects/bizopp-mall-site.webp"],
  },
  {
    id: 2,
    title: "Anwar Residence, Chenthrappinni, Thrissur",
    status: "Ongoing",
    details: "G+1 · 13,960 sqft · Structure completed, block works at final stage",
    images: ["/projects/anwar-residence-render.webp", "/projects/anwar-residence-site.webp"],
  },
  {
    id: 3,
    title: "Juma Masjid, Chamakkala, Thrissur",
    featured: true,
    status: "Ongoing",
    details: "G+1 · 14,978 sqft · Structural works in final stage",
    images: ["/projects/chamakkala-masjid-render.webp", "/projects/chamakkala-masjid-site.webp"],
  },
  {
    id: 4,
    title: "Masjid at Ponmanikkudam, Perinjanam, Thrissur",
    status: "Ongoing",
    details: "G+1 · 16,340 sqft · Structural works in final stage",
    images: ["/projects/ponmanikkudam-masjid-render.webp", "/projects/ponmanikkudam-masjid-site.webp"],
  },
  {
    id: 5,
    title: "GN Lights, Athani, Aluva",
    status: "Ongoing",
    details: "B+G+1 · 9,310 sqft · Structural frame completed",
    images: [
      "/projects/gn-lights-site-1.webp",
      "/projects/gn-lights-site-2.webp",
      "/projects/gn-lights-site-3.webp",
    ],
  },
  {
    id: 6,
    title: "Metco Aura Commercial Building, Edappally",
    status: "Ongoing",
    details: "B+G+3 · 8,200 sqft · PT raft slab & retaining wall in progress",
    images: [
      "/projects/metco-aura-site-1.webp",
      "/projects/metco-aura-site-2.webp",
      "/projects/metco-aura-site-3.webp",
    ],
  },
  {
    id: 7,
    title: "Commercial Building, Changampuzha, Kochi",
    status: "Ongoing",
    details: "B+G+3 · 19,800 sqft · PT raft slab & retaining wall in progress",
    images: [
      "/projects/changampuzha-site-1.webp",
      "/projects/changampuzha-site-2.webp",
      "/projects/changampuzha-site-3.webp",
    ],
  },
  // Completed
  {
    id: 8,
    title: "Claysys Lifestyle Apartment, Kochi",
    featured: true,
    status: "Completed",
    details: "B1+B2+G+14 · Structure completed in 8 months",
    images: ["/projects/claysys-lifestyle-kochi.webp"],
  },
  {
    id: 9,
    title: "Chakolas Complex, Thrissur",
    status: "Completed",
    details: "G+5 · Architecture, structural design & construction",
    images: ["/projects/chakolas-complex-thrissur.webp"],
  },
  {
    id: 10,
    title: "Masjid at Kakkodi, Kozhikode",
    status: "Completed",
    details: "B+G+2 · Architecture, structural design & construction",
    images: ["/projects/masjid-kakkodi.webp"],
  },
  {
    id: 11,
    title: "Hotel AS Residency, Edappally",
    status: "Completed",
    details: "B+G+4 · Architecture, structural design & construction",
    images: ["/projects/hotel-as-residency-edappally.webp"],
  },
  {
    id: 12,
    title: "Commercial Building, Kakkanad",
    status: "Completed",
    details: "B1+B2+G+7 · Architecture, structural design & construction",
    images: ["/projects/commercial-kakkanad.webp"],
  },
  {
    id: 13,
    title: "Commercial Building, West Fort, Thrissur",
    status: "Completed",
    details: "B+G+3 · Architecture, structural design & construction",
    images: ["/projects/commercial-west-fort-thrissur.webp"],
  },
  {
    id: 14,
    title: "Joseph Commercial Complex, Perinthalmanna",
    status: "Completed",
    details: "G+1 · Architecture, structural design & construction",
    images: ["/projects/joseph-complex-perinthalmanna.webp"],
  },
  {
    id: 15,
    title: "Juma Masjid, Vallom, Perumbavoor",
    status: "Completed",
    details: "G+1 · 22 m PT span",
    images: ["/projects/juma-masjid-vallom.webp"],
  },
  {
    id: 16,
    title: "SAM MG Mall, Eraviperoor, Thiruvalla",
    status: "Completed",
    details: "Architecture, structural design, PMC & construction",
    images: ["/projects/sam-mg-mall-thiruvalla.webp"],
  },
  {
    id: 17,
    title: "Josh Pavilion, Thodupuzha",
    status: "Completed",
    details: "Pre-engineered building · 24,000 sqft",
    images: ["/projects/josh-pavilion-thodupuzha.webp"],
  },
  {
    id: 18,
    title: "KBC Wonder Homes Warehouse, Thiruvalla",
    status: "Completed",
    details: "Pre-engineered building · 16,000 sqft in 3 months",
    images: ["/projects/kbc-warehouse-thiruvalla.webp"],
  },
  // Post tensioning — Chandigarh region
  {
    id: 19,
    title: "Maat Pitah Gaudham Trust, Ambala Road",
    status: "Post Tensioning",
    details: "30 m span PT beam",
    images: ["/projects/maat-pitah-ambala.webp"],
  },
  {
    id: 20,
    title: "Skyline Elevators Commercial Building, Zirakpur",
    status: "Post Tensioning",
    details: "PT slabs · Chandigarh",
    images: ["/projects/skyline-zirakpur.webp"],
  },
  {
    id: 21,
    title: "Residence for Mr. Ashok Dua, Chandigarh",
    status: "Post Tensioning",
    details: "PT slabs · Sector 11B",
    images: ["/projects/ashok-dua-chandigarh.webp"],
  },
  {
    id: 25,
    title: "Hotel Apartment Building, Kangra, Himachal",
    status: "Post Tensioning",
    details: "PT slabs",
    images: ["/projects/hotel-kangra.webp"],
  },
  {
    id: 22,
    title: "United Technocrates Commercial Building, Mohali",
    status: "Post Tensioning",
    details: "PT slabs",
    images: [
      "/projects/united-technocrates-mohali-1.webp",
      "/projects/united-technocrates-mohali-2.webp",
    ],
  },
  {
    id: 23,
    title: "Brahma Kumaris Meditation Centre, Panchkula",
    status: "Post Tensioning",
    details: "PT slabs · Sector 2A",
    images: [
      "/projects/brahma-kumaris-panchkula-1.webp",
      "/projects/brahma-kumaris-panchkula-2.webp",
    ],
  },
  {
    id: 24,
    title: "Rakhra Associates Commercial Building, DLF Pinjore",
    status: "Post Tensioning",
    details: "PT slabs",
    images: ["/projects/rakhra-pinjore-1.webp", "/projects/rakhra-pinjore-2.webp"],
  },
];
