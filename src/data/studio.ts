// Keep the same offering across the homepage, services page and enquiry form.
export const engagements = [
  {
    id: "direction",
    title: "Product strategy.",
    enquiryLabel: "Product strategy",
    homeSummary: "Product direction, priorities and a plan.",
    summary: "Before we decide what to make, we work out why anyone would care.",
    description: "We question the brief with you, look at the alternatives and make the hard calls about what belongs in the product. Including what to leave out.",
    takeaway: "A product direction, concept options and a plan for testing the assumptions.",
  },
  {
    id: "exploration",
    title: "Design & prototyping.",
    enquiryLabel: "Design & prototyping",
    homeSummary: "Interfaces and prototypes you can test.",
    summary: "A good idea should survive being used. We turn it into a prototype you can put in someone’s hands.",
    description: "See it before you commit to it. We work through the journeys, visual direction and interactions in a prototype, while changing your mind is still cheap.",
    takeaway: "An interactive prototype, a design direction and questions to test with future users.",
  },
  {
    id: "build",
    title: "Product engineering.",
    enquiryLabel: "Design & build",
    homeSummary: "Production-ready software, built end to end.",
    summary: "The prototype made a promise. We build the product that has to keep it, in the hands of real people.",
    description: "Good thinking should survive contact with production. We build the product and the systems behind it, from the interface to the details nobody notices until they break.",
    takeaway: "A working product, its code and design files, and a clear handover.",
  },
] as const;
