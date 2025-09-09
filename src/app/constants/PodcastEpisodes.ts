// Podcast episodes data
export interface PodcastEpisode {
  id: string;
  bookTitle: string;
  chapterNumber: number;
  chapterTitle?: string;
  description: string;
  duration: string; // e.g., "23 min"
  audioSrc: string;
  tags?: string[];
  coverImage?: string;
}

const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "mask-room-chapter-1",
    bookTitle: "The Mask Room",
    chapterNumber: 1,
    chapterTitle: "The Party's Over",
    description:
      "After the dance, Natalie's alone—until a janitor's warning and a moving curtain point to a locked secret backstage.",
    duration: "7 min",
    audioSrc: "/audio/TheMaskRoom-Chapter1.mp3",
    tags: ["mask-room", "chapter-reading", "middle-grade", "horror"],
  },
  {
    id: "mask-room-chapter-2",
    bookTitle: "The Mask Room",
    chapterNumber: 2,
    chapterTitle: "The Locked Door",
    description:
      'Backstage, a "Do Not Remove" key dangles. It knows her name. She turns it—and something old turns toward her.',
    duration: "7 min",
    audioSrc: "/audio/TheMaskRoom-Chapter2.mp3",
    tags: ["mask-room", "chapter-reading", "middle-grade", "horror"],
  },
  {
    id: "mask-room-chapter-3",
    bookTitle: "The Mask Room",
    chapterNumber: 3,
    chapterTitle: "The Mask Room",
    description:
      "A hidden room of masks—hundreds, some breathing. Natalie bolts, but the faces follow her into dreams.",
    duration: "8 min",
    audioSrc: "/audio/TheMaskRoom-Chapter3.mp3",
    tags: ["mask-room", "chapter-reading", "middle-grade", "horror"],
  },
  {
    id: "mask-room-chapter-4",
    bookTitle: "The Mask Room",
    chapterNumber: 4,
    chapterTitle: "The Try-On Dare",
    description:
      "Dare accepted. The mask slides on... power surges, the grin twitches—then a second heartbeat answers hers.",
    duration: "9 min",
    audioSrc: "/audio/TheMaskRoom-Chapter4.mp3",
    tags: ["mask-room", "chapter-reading", "middle-grade", "horror"],
  },
  {
    id: "mask-room-chapter-5",
    bookTitle: "The Mask Room",
    chapterNumber: 5,
    chapterTitle: '"We Remember You"',
    description:
      'At home, the mask fits like skin. In the mirror she\'s "better"—and a voice purrs inside: We remember you.',
    duration: "8 min",
    audioSrc: "/audio/TheMaskRoom-Chapter5.mp3",
    tags: ["mask-room", "chapter-reading", "middle-grade", "horror"],
  },
  {
    id: "mask-room-chapter-6",
    bookTitle: "The Mask Room",
    chapterNumber: 6,
    chapterTitle: "The Contest That Disappeared",
    description:
      "Everyone forgot the Halloween contest—except the masks. A 1991 photo shows hers staring back.",
    duration: "9 min",
    audioSrc: "/audio/TheMaskRoom-Chapter6.mp3",
    tags: ["mask-room", "chapter-reading", "middle-grade", "horror"],
  },
];

export default PODCAST_EPISODES;

// Helper functions
export const getEpisodesByBook = (bookTitle: string): PodcastEpisode[] => {
  return PODCAST_EPISODES.filter(
    (episode) => episode.bookTitle === bookTitle
  ).sort((a, b) => a.chapterNumber - b.chapterNumber);
};

export const getUniqueBooks = (): string[] => {
  return Array.from(
    new Set(PODCAST_EPISODES.map((episode) => episode.bookTitle))
  );
};

export const getEpisodeById = (id: string): PodcastEpisode | undefined => {
  return PODCAST_EPISODES.find((episode) => episode.id === id);
};

// Group episodes by book for display
export const getEpisodesGroupedByBook = (): Record<
  string,
  PodcastEpisode[]
> => {
  const grouped: Record<string, PodcastEpisode[]> = {};

  PODCAST_EPISODES.forEach((episode) => {
    if (!grouped[episode.bookTitle]) {
      grouped[episode.bookTitle] = [];
    }
    grouped[episode.bookTitle].push(episode);
  });

  // Sort chapters within each book
  Object.keys(grouped).forEach((bookTitle) => {
    grouped[bookTitle].sort((a, b) => a.chapterNumber - b.chapterNumber);
  });

  return grouped;
};
