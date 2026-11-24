export type FaqPage = "home" | "services";

export type LocalFaq = {
  question: string;
  answer: string;
};

// Bundled fallback content, also used by scripts/seed-sanity.mjs to import into Sanity.
export const localFaqs: Record<FaqPage, LocalFaq[]> = {
  home: [
    {
      question: "What services does Stronghold specialise in?",
      answer:
        "We specialize in post-tensioning solutions and civil construction services. We deliver structurally efficient post-tensioned systems and execute civil works with precision, supporting residential, commercial, and industrial projects of varying scales.",
    },
    {
      question: "Why choose post-tensioning for construction?",
      answer:
        "Post-tensioning enhances structural performance by increasing load capacity, reducing slab thickness, and minimising cracks. It allows for longer spans, material optimisation, and improved durability, making it a smart and cost-effective solution for modern construction.",
    },
    {
      question: "Is Post-Tensioning only for large commercial buildings?",
      answer:
        "Not at all. PT is increasingly used in luxury residential projects to create wide, open living areas without intrusive columns, and in villas to allow for more flexible floor plans.",
    },
    {
      question: "Does Stronghold handle standard RCC construction?",
      answer:
        "Yes. While we are specialists in Post-Tensioning, we are first and foremost civil contractors. We handle complete structural work from the ground up, integrating PT only where it adds value to the project.",
    },
    {
      question: "Can you work with my existing architect/engineer?",
      answer:
        "Absolutely. We often act as a specialized sub-contractor for PT works or as the main civil contractor working in tandem with your design team to optimize the building’s framework.",
    },
    {
      question: "How do you maintain quality and safety on-site?",
      answer:
        "We follow stringent quality control measures, use certified materials, and adhere to industry-standard safety practices. Regular inspections, skilled workmanship, and strict process monitoring ensure consistent quality and safe execution across all projects.",
    },
    {
      question: "How can I get started with Stronghold?",
      answer:
        "You can connect with our team by sharing your project details and requirements. We offer professional consultation, technical guidance, and reliable execution support to help you move forward with confidence.",
    },
  ],
  services: [
    {
      question: "What types of construction projects do you handle?",
      answer:
        "We undertake residential, commercial, and industrial construction projects. Our expertise covers both civil construction works and specialised post-tensioning systems. Each project is handled based on its structural needs, scale, and design requirements.",
    },
    {
      question: "Do you provide complete project support?",
      answer:
        "Yes, we provide end-to-end support from initial planning to final execution. Our team coordinates with engineers, consultants, and site teams to ensure smooth progress. This approach helps deliver projects efficiently and with consistent quality.",
    },
    {
      question: "How can I get a quotation for my project?",
      answer:
        "You can request a quotation by contacting us and sharing your project details or drawings. We carefully review the scope of work and technical requirements and provide a clear and transparent cost estimate.",
    },
    {
      question: "What determines the project timeline?",
      answer:
        "Project timelines depend on the scope, complexity, and site conditions of the work. After reviewing the project, we define a realistic execution schedule and follow structured planning to ensure timely completion.",
    },
    {
      question: "How do you ensure quality and safety on site?",
      answer:
        "We follow strict quality control and safety practices on all projects. Approved materials, trained supervision, and regular inspections are part of our process. This ensures safe execution and long-term structural reliability.",
    },
    {
      question: "Do you provide warranty or post-project support?",
      answer:
        "Yes, we stand by the quality of our work. We offer post-project support in line with industry standards and project agreements, giving our clients confidence in the durability and performance of our structures.",
    },
  ],
};
