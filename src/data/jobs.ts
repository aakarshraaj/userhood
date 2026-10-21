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
    description: "Help us meet founders and teams who need a partner to think through, design or build a product. You’ll research people and their businesses, write thoughtful outreach and learn how a conversation becomes a useful collaboration.",
    responsibilities: [
      "Identify and research potential leads, focusing on ambitious founders, startups, and enterprise clients.",
      "Write personal outreach that connects a prospect’s product challenge to the work we do.",
      "Maintain and update the CRM with lead statuses and communication logs.",
      "Analyze market trends and competitor strategies to refine our pitch.",
      "Support the sales team in preparing presentations, pitch decks, and proposals."
    ],
    requirements: [
      "Strong communication skills, both written and verbal, with a knack for persuasive storytelling.",
      "Curiosity about people, businesses, design and how products are made.",
      "Comfort asking questions, organising your work and following through on conversations.",
      "Basic understanding of B2B sales cycles and lead generation techniques is a plus.",
      "Available for a 3 to 6-month internship."
    ],
    googleFormLink: "https://forms.gle/edrdfKLi3t4DitAp9"
  }
];
