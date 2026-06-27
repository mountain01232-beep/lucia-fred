// =====================================================================
//  Lucia's Like Meter — settings file
//  ★ Edit only here to swap photos, names, and lines ★
// =====================================================================

export const CONFIG = {
  // --- Characters ---
  dogName: "Lucia",     // the dog's name
  ownerName: "Fred",    // the owner (the birthday friend)

  // --- Like Meter ---
  startLove: 100,       // starting value (%)
  goalLove: 200,        // goal (%). Reaching this lets Lucia speak
  midEventLove: 150,    // value that triggers the mid-game event (%)

  // --- Lucia's expression photos (real photos in assets/photos/) ---
  //   normal / happy / love / play / shy / proud
  //   ※ Just swap the file names below to use different photos
  photos: {
    normal: "assets/photos/lucia-1.jpg", // front portrait
    happy:  "assets/photos/lucia-2.jpg", // looking up before a meal
    love:   "assets/photos/lucia-3.jpg", // being petted
    play:   "assets/photos/lucia-4.jpg", // by the window
    shy:    "assets/photos/lucia-5.jpg", // sleepy face
    proud:  "assets/photos/lucia-1.jpg", // best face for the talking moment
  },

  // --- Ending memory gallery (add / reorder as you like) ---
  gallery: [
    "assets/photos/lucia-1.jpg",
    "assets/photos/lucia-3.jpg",
    "assets/photos/lucia-6.jpg",
    "assets/photos/lucia-2.jpg",
    "assets/photos/lucia-7.jpg",
    "assets/photos/lucia-5.jpg",
  ],

  // --- Title screen text ---
  title: {
    heading: "Lucia's Feelings",
    subheading: "~ Happy Birthday, Fred ~",
    intro: "Lucia's Like Meter for Fred is at 100% right now.\nPlay with her lots and raise it all the way to 200%!",
    startButton: "▶ Start playing",
  },

  // --- Mid-game event (fires once when midEventLove is reached) ---
  midEvent: {
    expression: "shy",
    lines: [
      "(Lucia's tail is wagging faster than usual...!)",
      "Lucia: \"...Mrrf♪\"",
      "Lucia seems to have something she wants to tell Fred.",
      "Play more and get the Like Meter to 200%!",
    ],
  },

  // --- Reaching 200% → Lucia becomes able to speak ---
  reveal: {
    expression: "proud",
    lines: [
      "The Like Meter reached 200%!",
      "Lucia's body began to glow softly...✨",
      "Lucia: \"...Huh? I... I can speak...!\"",
      "Lucia: \"Fred, listen. There's something I've always wanted to tell you.\"",
    ],
  },

  // --- Ending: Lucia's message to Fred ---
  //   Each item = one page. Edit freely.
  ending: {
    expression: "love",
    video: "assets/videos/lucia-message2.mp4", // very short (near-still) clip of Lucia for the message
    message: [
      "Happy Birthday, Fred! 🎂",
      "Thank you for always being with me\nand playing with me so much.",
      "When Fred smiles, Lucia is the happiest of all.",
      "Let's always be together!",
      "I love you, Fred. 🐾💕",
    ],
    galleryHeading: "📸 Memories Album",
    replayButton: "Play again",
  },
};
