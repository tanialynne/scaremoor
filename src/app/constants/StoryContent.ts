import { StaticImageData } from "next/image";

// Story-specific content and configuration
export interface StoryContent {
  id: string;
  title: string;
  slug: string;
  description: string;
  storyText: string;
  coverImage?: StaticImageData;
  gradeRange: string;
  subjects: string[];
  themes: string[];
  readingTime: string;
  published: boolean;
  publishDate: string;

  // Template assignments for each grade
  worksheetTemplates: {
    grade3: string[]; // Array of template IDs
    grade4: string[];
    grade5: string[];
  };

  // Fun activity template assignments
  funActivityTemplates: string[]; // Array of fun activity template IDs

  // Story-specific worksheet data
  worksheetData: {
    storyElements?: {
      characters?: string[];
      setting?: string;
      problem?: string;
      solution?: string;
    };
    sequencingEvents?: Array<{
      id: string;
      text: string;
      correctOrder: number;
    }>;
    vocabularyWords?: Array<{
      word: string;
      sentence: string;
      definition?: string;
    }>;
    causeEffectPairs?: Array<{
      id: string;
      cause: string;
      effect?: string;
    }>;
    plotPoints?: Array<{
      id: string;
      stage:
        | "exposition"
        | "rising-action"
        | "climax"
        | "falling-action"
        | "resolution";
      label: string;
      content?: string;
    }>;
    themeClues?: Array<{
      clue: string;
      meaning?: string;
    }>;
    characterTraits?: Array<{
      trait: string;
      evidence?: string;
    }>;
    inferenceQuestions?: Array<{
      question: string;
      answer?: string;
      evidence?: string;
    }>;
    figurativeLanguageExamples?: Array<{
      text: string;
      type: string;
      meaning?: string;
    }>;
    creativeWritingPrompts?: Array<{
      prompt: string;
      startingText?: string;
    }>;
  };

  // Fun activity specific data
  funActivityData: {
    wordSearchWords?: string[];
    bingoItems?: string[];
    cryptogramMessages?: Array<{
      message: string;
      cipher?: string;
    }>;
    scrambledWords?: Array<{
      word: string;
      hint?: string;
    }>;
    crosswordClues?: Array<{
      clue: string;
      answer: string;
      direction: "across" | "down";
      number: number;
    }>;
    hiddenMessagePuzzle?: {
      items: Array<{
        number: number;
        question: string;
        answer: string;
        firstLetter: string;
        hint?: string;
      }>;
      message: string;
    };
  };

  // Downloadable resources
  downloadableResources: Array<{
    id: string;
    title: string;
    description: string;
    fileType: "pdf" | "docx" | "png" | "zip";
    url: string;
    category:
      | "educator-packet"
      | "student-worksheet"
      | "answer-key"
      | "extension-activity";
  }>;
}

// The Forgotten Door story content
export const FORGOTTEN_DOOR_STORY: StoryContent = {
  id: "forgotten-door",
  title: "The Forgotten Door",
  slug: "forgotten-door",
  description:
    "A mysterious tale about a seventh-grader who discovers a magical door that can change her life - but every improvement comes with a hidden cost. Perfect for teaching theme, consequences, and character development.",
  storyText: `**The Forgotten Door**

Most kids hated supply closet duty.
Dani didn't mind it. It meant leaving class.
Plus, it smelled like dust, old hand sanitizer, and printer paper—a weird combo she'd grown to like.

She was halfway through seventh grade and still not sure if she liked school.
Mostly she liked the parts where she wasn't being looked at. Or talked to. Or asked why she ate lunch alone sometimes.

"Grab the microscope kit," Mr. Devlin had said, tossing her the closet key like it was no big deal.
She'd been in that closet a dozen times.

But today was different.

Today, there was a **door**.

Not just a door—an invitation. Something in her gut told her this wasn't for janitors or teachers. It was for her. And it wasn't just a way through a wall—it felt like a way *out* of something she couldn't name.

Not the usual metal panel in the back that led to pipes and wires.
This one was *wooden*. Old. Painted a kind of gray that looked like it had forgotten how to be any other color.

She blinked.
The flickering ceiling bulb buzzed like it always did.
But the door was still there.

It didn't match the walls. Or the school. Or *anything*.

There was no knob. Just a tarnished keyhole and a long, hairline crack down the center.

Dani took a step closer.
Then another.
She pressed her fingers against the door. Cold. Solid. Real.

Something shifted behind it—like air moving through a space that hadn't breathed in years.

She didn't hear a voice.
Not really.
But her brain translated the silence anyway:

> *Make it better.*

Dani pulled her hand back.

The regular supply closet light flickered once, then held steady.
The door was still there.

She grabbed the microscope kit, shut the closet, and locked it.

But the image burned in her mind like static on a screen.

A door that wasn't there yesterday.

A whisper she never heard.

And the unmistakable feeling that whatever was behind it—

Was *waiting for her*.

[Story continues with the full text...]`,
  gradeRange: "3-5",
  subjects: [
    "English Language Arts",
    "Character Education",
    "Creative Writing",
  ],
  themes: [
    "Consequences",
    "Identity",
    "Choices",
    "Be Careful What You Wish For",
  ],
  readingTime: "10-15 minutes",
  published: true,
  publishDate: "2024-09-15",

  worksheetTemplates: {
    grade3: [
      "story-elements-3",
      "sequencing-3",
      "vocabulary-context-3",
      "draw-describe-3",
    ],
    grade4: [
      "cause-effect-4",
      "theme-detective-4",
      "character-analysis-4",
      "creative-writing-4",
    ],
    grade5: [
      "inference-5",
      "plot-mountain-5",
      "figurative-language-5",
      "alternate-ending-5",
    ],
  },

  funActivityTemplates: [
    "word-search",
    "story-bingo",
    "cryptogram",
    "word-scramble",
    "crossword",
    "hidden-message",
  ],

  worksheetData: {
    storyElements: {
      characters: [
        "Dani (narrator)",
        "Mr. Devlin (teacher)",
        "Students",
        "Mysterious presence",
      ],
      setting: "Middle school supply closet",
      problem:
        "Dani discovers a magical door that grants wishes but extracts hidden costs",
      solution: "Unresolved - Dani faces the consequences of her choices",
    },

    sequencingEvents: [
      {
        id: "1",
        text: "Dani gets supply closet duty from Mr. Devlin",
        correctOrder: 1,
      },
      {
        id: "2",
        text: "Dani discovers the mysterious gray door",
        correctOrder: 2,
      },
      { id: "3", text: "The door whispers 'Make it better'", correctOrder: 3 },
      {
        id: "4",
        text: "Dani makes her first wish through the door",
        correctOrder: 4,
      },
      {
        id: "5",
        text: "Dani discovers the hidden cost of her wish",
        correctOrder: 5,
      },
      {
        id: "6",
        text: "Dani realizes she's trapped by the door's power",
        correctOrder: 6,
      },
    ],

    vocabularyWords: [
      {
        word: "tarnished",
        sentence: "Just a tarnished keyhole and a long, hairline crack.",
        definition: "dulled or damaged by age",
      },
      {
        word: "unmistakable",
        sentence: "And the unmistakable feeling that whatever was behind it...",
        definition: "impossible to mistake for anything else",
      },
      {
        word: "consequences",
        sentence: "Every improvement comes with hidden consequences.",
        definition: "results that follow from an action",
      },
    ],

    causeEffectPairs: [
      {
        id: "1",
        cause: "Dani touches the mysterious door",
        effect: "",
      },
      {
        id: "2",
        cause: "Dani makes a wish through the door",
        effect: "",
      },
      {
        id: "3",
        cause: "Dani keeps using the door",
        effect: "",
      },
    ],

    plotPoints: [
      {
        id: "exposition",
        stage: "exposition",
        label: "Exposition",
        content: "Dani, a seventh-grader, gets supply closet duty",
      },
      {
        id: "rising-action",
        stage: "rising-action",
        label: "Rising Action",
        content: "Dani discovers the mysterious door and makes wishes",
      },
      {
        id: "climax",
        stage: "climax",
        label: "Climax",
        content: "Dani realizes the door's true cost"
      },
      {
        id: "falling-action",
        stage: "falling-action",
        label: "Falling Action",
        content: "Dani tries to resist the door's pull",
      },
      {
        id: "resolution",
        stage: "resolution",
        label: "Resolution",
        content: "Dani faces the consequences of her choices",
      },
    ],
  },

  funActivityData: {
    wordSearchWords: [
      "door",
      "closet",
      "tarnished",
      "whisper",
      "mysterious",
      "consequences",
      "wish",
      "seventh",
      "grade",
      "supply",
    ],
    bingoItems: [
      "Mysterious door",
      "Supply closet",
      "Tarnished keyhole",
      "Gray paint",
      "Whisper",
      "Make it better",
      "Cold touch",
      "Flickering light",
      "Microscope kit",
      "Brass key",
      "Pizza lunch",
      "Trevor gone",
      "Ava returns",
      "Hallway of drawers",
      "Empty drawer",
      "Mr. Devlin",
      "Seventh grade",
      "Reality shifts",
      "Running away",
      "Choose wisely",
      "Perfect life",
      "Identity missing",
      "Note from mom",
      "Yogurt spill",
      "Forgotten",
    ],
    scrambledWords: [
      { word: "FORGOTTEN", hint: "What happens to memories" },
      { word: "IDENTITY", hint: "Who you are" },
      { word: "DRAWER", hint: "Contains memories" },
      { word: "WHISPER", hint: "What Dani hears" },
      { word: "CLOSET", hint: "Where the door appears" },
      { word: "BRASS KEY", hint: "Opens the door" },
      { word: "CHOICES", hint: "What Dani must make" },
      { word: "PERFECT", hint: "What Dani wants her life to be" },
    ],
    cryptogramMessages: [
      { message: "MAKE IT BETTER", cipher: "caesar-3" },
      { message: "BE CAREFUL WHAT YOU WISH FOR", cipher: "reverse" },
      { message: "EVERY CHOICE HAS A COST", cipher: "atbash" },
    ],
    crosswordClues: [
      // ACROSS
      {
        number: 2,
        direction: "across",
        clue: "Dani's best friend who mysteriously returns",
        answer: "AVA",
      },
      {
        number: 4,
        direction: "across",
        clue: "The type of key Dani finds in her lunch",
        answer: "BRASS",
      },
      {
        number: 6,
        direction: "across",
        clue: "What Trevor used to call Dani",
        answer: "WEIRDO",
      },
      {
        number: 8,
        direction: "across",
        clue: "The forgotten door leads to this magical place",
        answer: "HALLWAY",
      },
      {
        number: 9,
        direction: "across",
        clue: "Dani's favorite food she couldn't eat before",
        answer: "PIZZA",
      },
      {
        number: 10,
        direction: "across",
        clue: "Each one contains a piece of Dani's life",
        answer: "DRAWER",
      },
      {
        number: 11,
        direction: "across",
        clue: "The boy with yogurt on his chin",
        answer: "MAX",
      },
      {
        number: 12,
        direction: "across",
        clue: "What Mr. _____ teaches",
        answer: "DEVLIN",
      },

      // DOWN
      {
        number: 1,
        direction: "down",
        clue: "What Dani must make about changing her life",
        answer: "CHOICE",
      },
      {
        number: 3,
        direction: "down",
        clue: "Where Dani first finds the door",
        answer: "CLOSET",
      },
      {
        number: 5,
        direction: "down",
        clue: '"Better means ____"',
        answer: "GONE",
      },
      {
        number: 7,
        direction: "down",
        clue: "Color of the forgotten door",
        answer: "GRAY",
      },
      {
        number: 9,
        direction: "down",
        clue: "What happens to Dani's identity",
        answer: "PERFECT",
      },
      {
        number: 11,
        direction: "down",
        clue: '"_____ it better" - the door\'s whisper',
        answer: "MAKE",
      },
      {
        number: 12,
        direction: "down",
        clue: 'What disappears when things get "better"',
        answer: "FRIENDS",
      },
    ],
    hiddenMessagePuzzle: {
      items: [
        {
          number: 1,
          question: "What subject does Mr. Devlin teach?",
          answer: "CHEMISTRY",
          firstLetter: "C",
          hint: "Science class with experiments",
        },
        {
          number: 2,
          question: "What does Dani use to open the door?",
          answer: "HANDLE",
          firstLetter: "H",
          hint: "She touches the door with her...",
        },
        {
          number: 3,
          question: "Dani's favorite food?",
          answer: "ONION",
          firstLetter: "O",
          hint: "Rings on pizza, makes her allergic friend sick",
        },
        {
          number: 4,
          question: "The door is painted what color?",
          answer: "OLD",
          firstLetter: "O",
          hint: "Ancient, aged, not new",
        },
        {
          number: 5,
          question: "What does the hallway contain?",
          answer: "SHELVES",
          firstLetter: "S",
          hint: "Drawers sit on these",
        },
        {
          number: 6,
          question: "What happens to Trevor?",
          answer: "ERASED",
          firstLetter: "E",
          hint: "Completely removed from existence",
        },
        {
          number: 7,
          question: "What must Dani do at the end?",
          answer: "WALK",
          firstLetter: "W",
          hint: "Move away on foot",
        },
        {
          number: 8,
          question: "The brass object Dani finds?",
          answer: "INSTRUMENT",
          firstLetter: "I",
          hint: "Musical tool, or in this case, a key",
        },
        {
          number: 9,
          question: "What does the door do to Dani's life?",
          answer: "SIMPLIFIES",
          firstLetter: "S",
          hint: "Makes easier, removes complications",
        },
        {
          number: 10,
          question: "Who returns to Dani's class?",
          answer: "EVA",
          firstLetter: "E",
          hint: 'Friend whose name sounds like "Ava"',
        },
        {
          number: 11,
          question: "Where does Dani first find the door?",
          answer: "LOCKER",
          firstLetter: "L",
          hint: "Storage space in school hallway",
        },
        {
          number: 12,
          question: "What's Dani's friend with yogurt on chin?",
          answer: "YOUNGSTER",
          firstLetter: "Y",
          hint: "Young person, kid",
        },
      ],
      message: "CHOOSE WISELY",
    },
  },

  downloadableResources: [
    {
      id: "complete-educator-packet",
      title: "Complete Educator Packet",
      description:
        "Full PDF with story, all grade-level activities, implementation guide, and answer keys",
      fileType: "pdf",
      url: "/downloads/forgotten-door-educator-packet.pdf",
      category: "educator-packet",
    },
  ],
};

// The Pencil story content
export const THE_PENCIL_STORY: StoryContent = {
  id: "the-pencil",
  title: "The Pencil",
  slug: "the-pencil",
  description:
    "A chilling tale about a mysterious pencil that brings drawings to life - but not in the way you'd expect. Perfect for teaching cause and effect, inference, and the theme of unintended consequences.",
  storyText: `# THE PENCIL

### **Scene 1 – The Pencil Appears**

I checked my backpack again, like something might've magically appeared since the last three times I looked.
Still no pencil. No pen. Not even one of those gummy ones with bite marks and dried-up ink.

Great.

I swung by the Lost & Found on my way to class. It was the usual mess—hoodies, water bottles, a shoe that might've been alive once. But then I saw it.

A pencil.

It wasn't one of those bright, neon ones with encouraging words like "You Can Do It!"  It wasn't chewed or snapped or sticky. It looked old, but not used.
No eraser. No brand name. Just smooth, dark wood with this weird silvery shimmer in the grain.
Almost like it had been dipped in graphite dust. The tip was sharp—but not the splintery kind of sharp you get from a crank sharpener.
It looked machine-cut. Precise.

There was nothing wrong with it.
And nothing right about it, either.

I picked it up. It felt warm. Not like sitting-in-the-sun warm—like someone just put it down.

I looked around, but no one else was there.

A girl from the office walked by and gave me a weird look. I slipped the pencil into my pocket and shrugged.
"A pencil's a pencil," I muttered.

The second bell rang.

I jogged the rest of the way to class and slid into my seat right as the announcements started. I pulled out my notebook and grabbed the pencil without even thinking.

The wood felt smoother now. Softer. Familiar.

---

### **Scene 2 – The Cat at the Window**

I don't even remember what our morning work was supposed to be—something about synonyms, I think—but I definitely wasn't doing it.

My notebook was open to a blank page. The new pencil felt warm in my hand. Not hot, just... different.

I didn't mean to start doodling, but my hand sort of… moved. I drew a black cat. Not curled up or sitting pretty—this one was standing on the classroom windowsill, tail twitching, staring in through the glass.

I added big yellow eyes and little tufts of fur on the ears. Gave it one paw up like it was about to tap the glass.
It looked curious.
Hungry, maybe.

I smirked and added a caption bubble that said:

> *"Let me in."*

I was still smiling when the girl across from me gasped and pointed.
"Look!"

I turned. My heart thumped once—loud and low.

There was a cat.

**A black cat.**

Standing on the windowsill.
Tail flicking.
Staring straight at me.

Then it rubbed against the glass, curling its back like it was trying to get comfortable. Its eyes were round and gold and shiny—just like the ones I drew.

The class exploded.
A bunch of kids got out of their seats. Chairs scraped. Someone said it must be a Halloween prank.

Our teacher laughed. "Guess someone wants to join reading time!"

She tapped the window, shooing it off gently.
The cat didn't run. Just blinked and hopped down.

Everyone went back to their seats like it was nothing.

I looked down at my notebook. At the drawing.
Then at the pencil in my hand.

> *No way.*

But my hand was shaking just a little.

---

### **Scene 3 – The Water Bottle Spill**

I didn't plan to draw anything else. I told myself the cat was just weird timing. Coincidence. We probably had a black cat around the school already. Right?

But during math, I got bored.
My pencil started tapping the page like it had a mind of its own.

So I flipped to the next sheet and started sketching a classmate's water bottle—just for fun.
I drew it lying on its side, dripping across the floor.
Added some exaggerated splash lines and a dramatic arrow pointing to it like:

> *DISASTER STRIKES.*

I smirked.
I was just about to shade it when it happened.

**BANG.**

The real bottle hit the floor two desks over.

Water poured out, rushing toward someone's backpack.

"Seriously?" the teacher groaned.

Everyone jumped up. Someone yelled, "Get paper towels!"
Half the class turned into a clean-up crew while the kid who dropped it stood there, frozen.

I didn't move.
I couldn't.

I stared at the sketch on my desk, still half-finished. The shape of the bottle. The angle. The direction the water flowed. It was exactly the same.

Exactly.

I looked at the pencil in my hand.
Then at the spill again.
My chest felt tight, like the room had shrunk.

> *No way,* I whispered.

But my hand wouldn't stop shaking.

---

### **Scene 4 – The Strange Phrase**

By the time writing block rolled around, I had fully convinced myself I was imagining things.
Cats show up sometimes. Water bottles spill.
Weird stuff happens every day in fifth grade.

Right?

But I still opened my notebook.
And the pencil… was waiting.

This time, I didn't even try to be subtle. I drew a quick cartoon of our teacher, stick-figure style, with her long hair and triangle earrings.
She was standing at the whiteboard with a giant speech bubble that said:

> *"Pencils are portals to other dimensions."*

It made me laugh.
I added little sparkles around the pencil in her hand and a wormhole behind her. Dumb, funny, nothing serious.

I closed the notebook with a snap just as the bell rang for lunch.

Our teacher raised her voice over the noise. "Okay, if you haven't turned in your reading log, bring it after recess. Line up quietly, please—"

Then she stopped.
Mid-sentence.
Like someone hit pause.

Her eyes flicked up to the corner of the room, like she was listening to something we couldn't hear.

And then, in the same tone she uses for attendance or spelling lists, she said:

> "Pencils are portals to other dimensions."

The room went silent.

Then a few kids laughed. One kid whispered, "What?"

Our teacher blinked hard and shook her head like she just woke up.

> "Line up, please," she said again.

And we did.

But I didn't laugh.
I just stood there, staring at my closed notebook.
At the pencil tucked inside.

This wasn't a joke anymore.

---

### **Scene 5 – The Substitute & the Drawing**

I sat alone at the end of the lunch table, barely touching my sandwich. Everyone else was talking about recess or Pokémon cards or who could eat the most grapes in one bite.

I couldn't stop thinking about what our teacher had said—*what I made her say.*

Pencils are portals to other dimensions.

She didn't laugh.
She didn't even seem to realize she said it.

I pulled out my notebook again, heart still racing, and flipped to a fresh page.

Just to mess with myself, I started sketching a goofy substitute teacher.
Big glasses. Hair in a wild bun. Striped scarf wrapped around her neck like ten times.
I labeled it in giant block letters:

> *THE SECRET SUB.*

I smirked. The drawing looked ridiculous.

Then I slammed the notebook shut and stuffed it deep in my backpack.
Enough.

---

When we got back to class after recess, the room was… different.

Our teacher was gone.
Standing in her place at the front of the room?

A substitute.

I froze in the doorway.

Glasses.
Scarf.
Messy bun.

It was her.

Someone whispered, "Family emergency."

But no one else seemed to think it was weird.
No one else had *just drawn her.*

I sat down slowly. The desk felt colder than usual.

During quiet work time, the sub walked around the room passing out worksheets.
When she reached me, she smiled a little too wide and set a paper on my desk. It had a second sheet paperclipped to the front.

I flipped it over.

It was a drawing.

**Of me.**
Sitting in this exact seat.
Holding the pencil.

My face was blank.
The pencil in the picture glowed.

I didn't draw this.

But someone—or something—did.

---

### **Scene 6 – The Loop Drawing**

I didn't touch the notebook again.

Not during science. Not for homework. Not even when I needed to finish the worksheet.

I left it buried in my backpack and didn't take the pencil out, either. I even thought about snapping the pencil in half.

But I didn't.
Didn't even *look* at it.

But all night, I felt it.
Like a hum under my skin. Like the pencil knew I was ignoring it.

I tried to eat dinner. Pretended to watch TV.
But my brain wouldn't stop circling back.

> *What if it wasn't done?*

I told myself to let it go.

I didn't.

When the house was quiet, I pulled the notebook out.
I didn't even sit down—just flipped it open while standing beside my bed.

There was a new drawing.

A hand.
Holding the pencil.

And on the page beneath that hand…
**another** hand, holding the same pencil.
And another.
Each one smaller than the last.
Each one drawing the next.

A loop.
A mirror.
Endless.

The lines looked like mine, but sharper. More exact.

I hadn't drawn anything since lunch.
But here it was.
Perfect lines. Impossible detail.
The pencil hadn't just copied me—it had watched me.

I set it down on my desk and stepped back, rubbing the chill from my arms.
Enough was enough.

I turned off the light. Started to walk away.

But behind me, in the quiet of my room,
I heard it.

The soft, scratchy whisper of something drawing.

---

**THE END**`,
  gradeRange: "3-5",
  subjects: ["English Language Arts", "Creative Writing", "Critical Thinking"],
  themes: [
    "Unintended Consequences",
    "Cause and Effect",
    "Power and Responsibility",
    "Be Careful What You Wish For",
  ],
  readingTime: "10-15 minutes",
  published: true,
  publishDate: "2024-09-16",

  worksheetTemplates: {
    grade3: [
      "story-elements-3",
      "sequencing-3",
      "vocabulary-context-3",
      "draw-describe-3",
    ],
    grade4: [
      "cause-effect-4",
      "theme-detective-4",
      "character-analysis-4",
      "creative-writing-4",
    ],
    grade5: [
      "inference-5",
      "plot-mountain-5",
      "figurative-language-5",
      "alternate-ending-5",
    ],
  },

  funActivityTemplates: [
    "word-search",
    "story-bingo",
    "cryptogram",
    "word-scramble",
    "crossword",
    "hidden-message",
  ],

  worksheetData: {
    storyElements: {
      characters: [
        "The narrator (5th grader)",
        "Teacher",
        "Substitute teacher",
        "Classmates",
      ],
      setting: "Elementary school classroom",
      problem: "The pencil brings drawings to life in unexpected ways",
      solution: "Unresolved - pencil continues drawing on its own",
    },

    sequencingEvents: [
      {
        id: "1",
        text: "Narrator finds a strange pencil in the Lost & Found",
        correctOrder: 1,
      },
      {
        id: "2",
        text: "Narrator draws a cat in their notebook",
        correctOrder: 2,
      },
      {
        id: "3",
        text: "A black cat appears at the classroom window",
        correctOrder: 3,
      },
      {
        id: "4",
        text: "A water bottle spills just like in the drawing",
        correctOrder: 4,
      },
      {
        id: "5",
        text: "The teacher says something strange about pencils",
        correctOrder: 5,
      },
      {
        id: "6",
        text: "The pencil makes drawing sounds by itself",
        correctOrder: 6,
      },
    ],

    vocabularyWords: [
      {
        word: "shimmer",
        sentence: "The pencil had a silvery shimmer in the wood grain.",
        definition: "a soft, shining light",
      },
      {
        word: "curious",
        sentence: "The cat was curious and tapped on the glass.",
        definition: "wanting to know more",
      },
      {
        word: "coincidence",
        sentence:
          "It must be a coincidence that the cat appeared after I drew it.",
        definition: "things happening by chance at the same time",
      },
    ],

    causeEffectPairs: [
      {
        id: "1",
        cause: "The narrator draws a black cat on the windowsill",
        effect: "A real black cat appears at the window",
      },
      {
        id: "2",
        cause: "The narrator sketches a water bottle spilling",
        effect: "A real water bottle spills in the exact same way",
      },
      {
        id: "3",
        cause: "The narrator ignores the pencil all night",
        effect: "The pencil draws by itself/makes scratching sounds",
      },
    ],

    plotPoints: [
      {
        id: "exposition",
        stage: "exposition",
        label: "Exposition",
        content: "Narrator needs a pencil, finds one in Lost & Found",
      },
      {
        id: "rising-action",
        stage: "rising-action",
        label: "Rising Action",
        content: "Cat appears, water spills, teacher speaks strangely",
      },
      {
        id: "climax",
        stage: "climax",
        label: "Climax",
        content:
          "Substitute appears exactly as drawn / Finding the mysterious drawing",
      },
      {
        id: "falling-action",
        stage: "falling-action",
        label: "Falling Action",
        content: "Narrator tries to ignore the pencil",
      },
      {
        id: "resolution",
        stage: "resolution",
        label: "Resolution",
        content: "Pencil draws by itself - problem continues",
      },
    ],
  },

  funActivityData: {
    wordSearchWords: [
      "PENCIL",
      "DRAWING",
      "CAT",
      "MAGIC",
      "TEACHER",
      "BOTTLE",
      "LOOP",
      "PORTAL",
      "SHIMMER",
      "SKETCH",
      "SUBSTITUTE",
      "WATER",
      "SCHOOL",
      "NOTEBOOK",
      "DIMENSION",
    ],
    bingoItems: [
      "Strange pencil",
      "Lost & Found",
      "Silvery shimmer",
      "Black cat",
      "Yellow eyes",
      "Water spill",
      "Substitute teacher",
      "Drawing sounds",
      "Scratching noise",
      "Graphite marks",
      "Window cat",
      "Notebook drawing",
      "Curious expression",
      "Coincidence",
      "Art class",
      "Teacher's phrase",
      "Hungry eyes",
      "Night sounds",
      "Paper texture",
      "Pencil lead",
      "Mysterious origins",
      "Drawing magic",
      "Creative power",
      "Unexpected results",
    ],
    scrambledWords: [
      { word: "PENCIL", hint: "The mysterious writing tool" },
      { word: "SHIMMER", hint: "How the pencil looks" },
      { word: "DRAWING", hint: "What the pencil does" },
      { word: "CURIOUS", hint: "How the cat looks" },
      { word: "COINCIDENCE", hint: "What the narrator thinks it is" },
      { word: "SUBSTITUTE", hint: "The teacher that day" },
      { word: "WINDOW", hint: "Where the cat appears" },
      { word: "GRAPHITE", hint: "What pencils are made of" },
    ],
    cryptogramMessages: [
      { message: "THE PENCIL WAS WAITING", cipher: "caesar-3" },
      { message: "SOME THINGS DRAW THEMSELVES", cipher: "reverse" },
      { message: "BE CAREFUL WHAT YOU CREATE", cipher: "atbash" },
    ],
    crosswordClues: [
      // ACROSS
      {
        number: 2,
        direction: "across",
        clue: "The magical writing tool that brings drawings to life (6)",
        answer: "PENCIL",
      },
      {
        number: 4,
        direction: "across",
        clue: "Where the narrator found the pencil: ___ (11)",
        answer: "LOSTANDFOUND",
      },
      {
        number: 5,
        direction: "across",
        clue: "What the narrator did in their notebook (6)",
        answer: "DOODLE",
      },
      {
        number: 7,
        direction: "across",
        clue: "Black animal that appeared at the window (3)",
        answer: "CAT",
      },
      {
        number: 9,
        direction: "across",
        clue: "What spilled from the bottle (5)",
        answer: "WATER",
      },
      {
        number: 10,
        direction: "across",
        clue: "Everything the pencil drew came ____ (4)",
        answer: "TRUE",
      },
      {
        number: 11,
        direction: "across",
        clue: "Where the story takes place (6)",
        answer: "SCHOOL",
      },
      {
        number: 12,
        direction: "across",
        clue: "Where the narrator made their drawings (8)",
        answer: "NOTEBOOK",
      },

      // DOWN
      {
        number: 1,
        direction: "down",
        clue: "The pencil made a ___ whisper sound (10)",
        answer: "SCRATCHING",
      },
      {
        number: 2,
        direction: "down",
        clue: "Pencils are ___ to other dimensions (7)",
        answer: "PORTALS",
      },
      {
        number: 3,
        direction: "down",
        clue: "The pencil had a silvery shimmer in the ___ grain (6)",
        answer: "WOODEN",
      },
      {
        number: 4,
        direction: "down",
        clue: "The pencil created an endless ___ of drawings (4)",
        answer: "LOOP",
      },
      {
        number: 6,
        direction: "down",
        clue: "What the pencil was considered to be (5)",
        answer: "MAGIC",
      },
      {
        number: 7,
        direction: "down",
        clue: "The narrator thought it was just a strange timing or ___ (11)",
        answer: "COINCIDENCE",
      },
      {
        number: 8,
        direction: "down",
        clue: "A replacement teacher who appeared exactly as drawn (10)",
        answer: "SUBSTITUTE",
      },
      {
        number: 9,
        direction: "down",
        clue: "The pencil felt ___ when first picked up (4)",
        answer: "WARM",
      },
    ],
    hiddenMessagePuzzle: {
      items: [
        {
          number: 1,
          question: "What writing tool has mysterious powers?",
          answer: "PENCIL",
          firstLetter: "P",
          hint: "Found in Lost & Found",
        },
        {
          number: 2,
          question: "Where did the black cat appear?",
          answer: "OUTSIDE",
          firstLetter: "O",
          hint: "At the classroom opening",
        },
        {
          number: 3,
          question: "What makes sounds at night?",
          answer: "SCRATCHING",
          firstLetter: "S",
          hint: "Drawing sounds",
        },
        {
          number: 4,
          question: "What appears in the grain of the pencil?",
          answer: "SHIMMER",
          firstLetter: "S",
          hint: "Silvery glow",
        },
        {
          number: 5,
          question: "What does the pencil do by itself?",
          answer: "ILLUSTRATES",
          firstLetter: "I",
          hint: "Creates pictures",
        },
        {
          number: 6,
          question: "What color are the cat's eyes?",
          answer: "BRIGHT",
          firstLetter: "B",
          hint: "Vivid and intense",
        },
        {
          number: 7,
          question: "What spilled like the drawing?",
          answer: "LIQUID",
          firstLetter: "L",
          hint: "Water from a bottle",
        },
        {
          number: 8,
          question: "What brings the drawings to life?",
          answer: "ENERGY",
          firstLetter: "E",
          hint: "Mysterious force",
        },
      ],
      message: "POSSIBLE",
    },
  },

  downloadableResources: [
    {
      id: "complete-educator-packet",
      title: "Complete Educator Packet",
      description:
        "Full PDF with story, all grade-level activities, implementation guide, and answer keys",
      fileType: "pdf",
      url: "/downloads/the-pencil-educator-packet.pdf",
      category: "educator-packet",
    },
  ],
};

// All stories
const ALL_STORIES = [FORGOTTEN_DOOR_STORY, THE_PENCIL_STORY];

// Helper functions
export const getStoryBySlug = (slug: string): StoryContent | undefined => {
  return ALL_STORIES.find((story) => story.slug === slug);
};

export const getAllStories = (): StoryContent[] => {
  return ALL_STORIES;
};

export const getPublishedStories = (): StoryContent[] => {
  return getAllStories().filter((story) => story.published);
};
