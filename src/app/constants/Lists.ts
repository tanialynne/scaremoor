import { StaticImageData } from "next/image";

import KidHorror from "../../../public/images/icons/kid-first-horror.svg";
import Mic from "../../../public/images/icons/mic-icon.svg";
import Twisty from "../../../public/images/icons/twisty-icon.svg";
import Emotion from "../../../public/images/icons/emotional-icon.svg";
import Connection from "../../../public/images/icons/connection-icon.svg";

export type List = {
  cardIcon: StaticImageData;
  cardTitle?: string;
  cardDescription: string;
};

export const ListItems: List[] = [
  {
    cardIcon: KidHorror,
    cardTitle: "Kid-first horror",
    cardDescription: "Scaremoor stories center real kid fears: being forgotten, being replaced, not being believed.",
  },
  {
    cardIcon: Mic,
    cardTitle: "Cinematic voice",
    cardDescription: "Told in first-person, present tense, with immersive atmosphere and eerie pacing.",
  },
  {
    cardIcon: Twisty,
    cardTitle: "Twisty but safe",
    cardDescription: "Big reveals. Spooky builds. Just enough light to sleep at night.",
  },
  {
    cardIcon: Emotion,
    cardTitle: "Emotional depth",
    cardDescription: "These aren’t just haunted objects. They’re haunted feelings.",
  },

  {
    cardIcon: Connection,
    cardTitle: "A Connected world",
    cardDescription: "Read one story and you're hooked. Read more, and you'll spot the secrets hiding in the shadows.",
  },
];
