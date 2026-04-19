export interface Job {
  id: string;
  slug: string;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  googleFormLink: string;
}

export const jobs: Job[] = [
  {
    id: "sales-intern",
    slug: "sales-intern",
    title: "Sales Intern",
    type: "Internship",
    location: "Remote / Hybrid (India)",
    department: "Sales & Growth",
    description: "We are looking for a highly motivated Sales Intern to join our growth team and help us build powerful connections with ambitious founders and enterprises. You'll be at the forefront of identifying high-value opportunities and learning the intricacies of B2B sales in a premium design and technology studio environment.",
    responsibilities: [
      "Identify and research potential leads, focusing on ambitious founders, startups, and enterprise clients.",
      "Assist in crafting personalized, high-conversion outreach emails and messages.",
      "Maintain and update the CRM with lead statuses and communication logs.",
      "Analyze market trends and competitor strategies to refine our pitch.",
      "Support the sales team in preparing presentations, pitch decks, and proposals."
    ],
    requirements: [
      "Strong communication skills, both written and verbal, with a knack for persuasive storytelling.",
      "A proactive, hustle-oriented mindset with a genuine interest in technology, design, and product development.",
      "Ability to thrive in a fast-paced, ambiguous startup environment.",
      "Basic understanding of B2B sales cycles and lead generation techniques is a plus.",
      "Available for a 3 to 6-month internship."
    ],
    googleFormLink: "https://forms.gle/edrdfKLi3t4DitAp9"
  }
];
