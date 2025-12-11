
export const SKILLS = [
  { name: "Next.js", icon: "/images/tech/nextjs.png" },
  { name: "React", icon: "/images/tech/react.png" },
  { name: "HTML", icon: "/images/tech/html.png" },
  { name: "Tailwind CSS", icon: "/images/tech/tailwind.png" },
  { name: "Framer Motion", icon: "/images/tech/framer.png" },
  { name: "Java Script", icon: "/images/tech/js.png" },
  { name: "Angular", icon: "/images/tech/angular.png" },
  { name: "Bootstrap", icon: "/images/tech/bootstrap.png" },
  { name: "CSS", icon: "/images/tech/css.png" },
  { name: "Git", icon: "/images/tech/git.png" },
  { name: "JQuery", icon: "/images/tech/jquery.png" },
];
export const navlinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.projects", href: "/#projects" },
  { key: "nav.experience", href: "/#experience" },
];
export type ProjectCard = {
  bgColor: string;
  image: string;
  link?: string;
  titleKey: string;
  descriptionKey: string;
  toolKeys: string[];
};
export const cards: ProjectCard[] = [
  {
    bgColor: "#24B094",
    titleKey: "projects.cards.dorra.title",
    descriptionKey: "projects.cards.dorra.description",
    toolKeys: [
      "tech.next15",
      "tech.ts",
      "tech.tailwind",
      "tech.radix",
      "tech.fabric",
      "tech.fawry",
      "tech.paymob",
      "tech.rhf",
      "tech.yup"
    ],
    link: "https://dorraprint.com",
    image: "/images/projects/dorra-square.png",
  },
  {
    bgColor: "#ecedf5",
    titleKey: "projects.cards.midligner.title",
    descriptionKey: "projects.cards.midligner.description",
    toolKeys: ["tech.next", "tech.ts", "tech.tailwind", "tech.radix", "tech.mui", "tech.rhf", "tech.zod"],
    link: "https://midligner.com",
    image: "/images/projects/midligner-square.png",
  },
  {
    bgColor: "#024ce6",
    titleKey: "projects.cards.pixbyte.title",
    descriptionKey: "projects.cards.pixbyte.description",
    toolKeys: ["tech.next15", "tech.ts", "tech.tailwind", "tech.framer", "tech.shadcn", "tech.isr", "tech.rsc"],
    link: "https://pixbyte.co/",
    image: "/images/projects/pixbyte-square.png",
  },
  {
    bgColor: "#4ebc49",
    titleKey: "projects.cards.watan.title",
    descriptionKey: "projects.cards.watan.description",
    toolKeys: ["tech.next15", "tech.ts", "tech.tailwind", "tech.framer", "tech.shadcn", "tech.isr", "tech.rsc"],
    link: "https://dirulwatan.sa/",
    image: "/images/projects/watan-square.png",
  },
  {
    bgColor: "#ff69eb",
    titleKey: "projects.cards.mawj.title",
    descriptionKey: "projects.cards.mawj.description",
    toolKeys: ["tech.next15", "tech.ts", "tech.tailwind", "tech.framer", "tech.shadcn", "tech.isr"],
    link: "https://mawj.agency/",
    image: "/images/projects/mawj-square.png",
  },
  {
    bgColor: "#00b050e6",
    titleKey: "projects.cards.metrospeedy.title",
    descriptionKey: "projects.cards.metrospeedy.description",
    toolKeys: [
      "tech.react",
      "tech.tailwind",
      "tech.rq",
      "tech.map",
      "tech.charts",

    ],
    link: "https://www.metrospeedy.com/",
    image: "/images/projects/metrospeedy-square.png",
  },
  {
    bgColor: "#85a747",
    titleKey: "projects.cards.talentkid.title",
    descriptionKey: "projects.cards.talentkid.description",
    toolKeys: ["tech.next15", "tech.ts", "tech.tailwind", "tech.framer"],
    link: "https://talentkid.sa/",
    image: "/images/projects/talentkid-square.png",
  },
];
