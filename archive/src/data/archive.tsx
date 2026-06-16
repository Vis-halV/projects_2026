export type ArchiveEntry = {
  title: string;
  description: string;
  tone: string;
  align: string;
  image?: string;
};

export const archiveSectionCopy = {
  eyebrow: "#My thoughts ",
  title: "Blog",
  description: "Inspired from https://www.ordrhealth.com/archive",
};

export const archiveEntries: ArchiveEntry[] = [
  {
    title: "The Longevity Protocols",
    description:
      "A considered guide to ritual, recovery, and performance through small daily systems that compound with time.",
    tone:
      "bg-[linear-gradient(135deg,#d9ded2_0%,#ebe8df_52%,#d8d3ca_100%)] text-[#273126]",
    align: "md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)_auto]",
  },
  {
    title: "The 7-Day Nervous System Reset",
    description:
      "Seven restorative chapters balancing breathwork, nutrition, and sensory calm into one immersive editorial feature.",
    tone: "bg-[#D85B55] text-[#fff8f1]",
    align: "md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_auto]",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
  },
];
