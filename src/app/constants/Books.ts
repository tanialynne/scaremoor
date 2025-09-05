import { StaticImageData } from "next/image";

import { slugify } from "../utils";

import HunterBook from "../../../public/images/books/haunted-locker-carousel.png";
import PhantomGround from "../../../public/images/books/phantom-playground-carousel.png";
import LivingVine from "../../../public/images/books/living-vines-carousel.png";
import ChangingPortrait from "../../../public/images/books/changing-portrait-carousel.png";
import VanishingWords from "../../../public/images/books/vanishing-words-carousel.png";
import MaskRoom from "../../../public/images/books/mask-room-carousel.png";

import HunterBookFlat from "../../../public/images/books/haunted-locker-flat.png";
import PhantomGroundFlat from "../../../public/images/books/phantom-playground-flat.png";
import LivingVineFlat from "../../../public/images/books/living-vines-flat.png";
import ChangingPortraitFlat from "../../../public/images/books/changing-portrait-flat.png";
import VanishingWordsFlat from "../../../public/images/books/vanishing-words-flat.png";
import MaskRoomFlat from "../../../public/images/books/mask-room-flat.png";

export type Book = {
  bookImage: {
    open?: StaticImageData;
    close?: StaticImageData;
  };
  bookSlug: string;
  bookTitle: string;
  bookSubHeading: string;
  purchaseLink: string;
  bookDescription?: string;
  videoPreview?: string;
  leadMagnetId?: string;
};

const Books: Book[] = [
  {
    bookTitle: "The Haunted Locker",
    bookSlug: slugify("The Haunted Locker"),
    bookImage: {
      open: HunterBookFlat,
      close: HunterBook,
    },
    bookSubHeading: "Some doors should never be opened",
    purchaseLink: "https://www.amazon.com/gp/product/B0DKLP6KCT",
    bookDescription: `
When Ben Carter transfers to Crestwood Middle School, he's assigned locker 113—a locker with a terrifying history. Strange whispers, eerie shadows, and unsettling events soon surround him. With the help of his friend Mia, Ben uncovers a dark secret: the locker holds the key to spirits trapped within the school, and they're desperate to break free.

Now, Ben and Mia must race against time to stop the spirits from escaping, but the more they uncover, the more dangerous their mission becomes. Can they lock the evil away for good, or will they become the next victims of locker 113?

*A spine-chilling adventure perfect for young readers who love a good scare!*
    `.trim(),
  },
  {
    bookTitle: "The Night of the Living Vines",
    bookSlug: slugify("The Night of the Living Vines"),
    bookImage: {
      open: LivingVineFlat,
      close: LivingVine,
    },
    bookSubHeading: "The gardenʼs not growing—itʼs hunting",
    purchaseLink: "https://www.amazon.com/gp/product/B0DPT9X153",
    bookDescription: `
When Lily and Samantha discover that the garden vines around Lily's home are growing at an unnatural rate, they think it's just a strange summer mystery. But the more they investigate, the more sinister things become. The vines aren't just growing—they're alive, creeping, and spreading, with a terrifying purpose.

A hidden seed, an ancient force, and whispers that chill the air draw the girls into a dangerous race against time. As the vines start to take over the house and those that live in it, Lily and Samantha must uncover the truth buried deep beneath the garden. But every step closer to the answer makes the vines stronger and their escape more uncertain.

Will they find a way to stop the ancient force before it's too late? Or will the living vines consume everything they hold dear?

*A suspenseful, hair-raising adventure for readers who love a good scare!*
    `.trim(),
  },
  {
    bookTitle: "The Phantom Playground",
    bookSlug: slugify("The Phantom Playground"),
    bookImage: {
      open: PhantomGroundFlat,
      close: PhantomGround,
    },
    bookSubHeading: "Theyʼre still waiting to play.",
    purchaseLink: "https://www.amazon.com/gp/product/B0F4GFP5PW",
    bookDescription: `
The playground wasn't supposed to be haunted. When Emily and her friends stumble onto a forgotten clearing in the woods—overgrown, abandoned, and strangely magnetic—they wake up something buried long ago.

Now ghostly children lurk in the shadows. The swings move on their own. And the seesaw... bites. The deeper they dig into the playground's past, the darker the truth becomes. Someone built this place to forget. But the children buried beneath it? They remember. And they're waiting.

If Emily and her friends can't uncover the truth—and survive it—they might be the next ones left behind.

*A ghostly adventure made for kids who love good scare—and one more chapter.*
    `.trim(),
  },
  {
    bookTitle: "The Changing Portrait",
    bookSlug: slugify("The Changing Portrait"),
    bookImage: {
      open: ChangingPortraitFlat,
      close: ChangingPortrait,
    },
    bookSubHeading: "The girl in the painting wants out.",
    purchaseLink: "https://www.amazon.com/gp/product/B0F8T63QBR",
    bookDescription: `
The painting changed when no one was looking. Haley expected a boring family trip to the old Blackwood Mansion. What she didn't expect was a portrait that watched her. One that whispered in her dreams. One that changed.

Now the girl in the painting—Isabella—is begging for help, and Haley's the only one who hears her. But Blackwood Mansion holds more than just dusty furniture and faded wallpaper. It holds secrets. It holds memories. It holds them.

As the past bleeds into the present, Haley must solve the mystery before the mansion adds another portrait to its cursed collection...hers.

*A spine-chilling adventure perfect for kids who love a good scare.*
    `.trim(),
  },
  {
    bookTitle: "The Vanishing Words",
    bookSlug: slugify("The Vanishing Words"),
    bookImage: {
      open: VanishingWordsFlat,
      close: VanishingWords,
    },
    bookSubHeading: "Say the wrong word… and disappear",
    purchaseLink: "https://www.amazon.com/gp/product/B0FHJBT5YH",
    bookDescription: `
The notebook was hidden for a reason. Oliver didn't mean to make his best friend disappear. All he did was say a word—one strange, glowing word scrawled in a cracked leather notebook buried behind a library shelf.

Now Leo's gone. So is the family dog. And the notebook is getting louder. Each page holds a secret. Each word rewrites reality. And Oliver's running out of time—and chances.

Because some words don't just have meaning. They have a mind of their own.

*A twisty, terrifying tale for kids who can't resist a good scare*
    `.trim(),
  },
  {
    bookTitle: "The Mask Room",
    bookSlug: slugify("The Mask Room"),
    bookImage: {
      open: MaskRoomFlat,
      close: MaskRoom,
    },
    bookSubHeading: "Put one on—and lose yourself forever.",
    purchaseLink: "https://www.amazon.com/dp/B0FMQF5L3H",
    videoPreview: "/videos/themaskroom_trailer.mp4",
    leadMagnetId: "8524362",
    bookDescription: `
There's a room backstage no one talks about. No door number. No record it ever existed. Until Natalie finds it. Inside? Shelves lined with old masks. Some stitched. Some cracked. Some smiling way too wide. All waiting.

The rule is simple: Wear one... and it wears you back. Natalie thought she was imagining things—until her classmates started changing. Until her best friend started forgetting herself.

Now the masks are spreading. The school is shifting. And Natalie might be the only one who remembers what's real. But the masks want her too. They whisper promises. They know her name. And one of them is already hers.

Would you recognize yourself... without your face?
    `.trim(),
  },
];

export default Books;
