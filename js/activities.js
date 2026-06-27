// =====================================================================
//  Activity definitions
//   id:        identifier
//   label:     button text (with emoji)
//   gain:      kept for reference; the actual change is a flat +5%
//              (0 = no change, negative = decrease)
//   expression: Lucia's expression when played (key in config.photos)
//   lines:     Lucia's reaction lines (one shown at random each time)
//   special:   small effect type (optional)
// =====================================================================

export const ACTIVITIES = [
  {
    id: "pet",
    label: "🤚 Pet",
    gain: 9,
    expression: "love",
    lines: [
      "Lucia: \"Mmm♪ that feels so good...\"",
      "Lucia: \"Pet me more!\"",
      "Lucia closed her eyes in bliss.",
    ],
  },
  {
    id: "toy",
    label: "🧸 Play with a toy",
    gain: 11,
    expression: "play",
    special: "toy",
    video: "assets/videos/lucia-toy.mp4", // ← plays a video for this activity
    lines: [
      "Lucia: \"Give it to me, give it to me!\"",
      "Lucia is playing with her toy!",
      "Lucia: \"This is so much fun♪\"",
    ],
  },
  {
    id: "paw",
    label: "🤝 Shake paw",
    gain: 9,
    expression: "play",
    special: "paw",
    video: "assets/videos/lucia-paw.mp4", // ← paw video
    lines: [
      "Lucia: \"Paw! I can do it properly!\"",
      "Lucia gently placed her front paw down.",
      "Lucia: \"Ta-da! Praise me, praise me♪\"",
    ],
  },
  {
    id: "nap",
    label: "😴 Take a nap",
    gain: 8,
    expression: "shy",
    special: "nap",
    video: "assets/videos/lucia-nap.mp4", // ← nap video
    lines: [
      "Lucia: \"Yaaawn... so sleepy...\"",
      "Lucia started to doze off peacefully.",
      "Lucia: \"Mumble mumble... Fred...♪\"",
    ],
  },
  {
    id: "sleeptogether",
    label: "🛌 Sleep together",
    gain: 9,
    expression: "shy",
    special: "sleep",
    // Two photos flipping every 1 second (part1 / part2)
    flip: [
      "assets/photos/lucia-sleep.jpg",
      "assets/photos/lucia-sleep2.jpg",
    ],
    flipInterval: 1000,
    lines: [
      "Lucia curled up next to Fred.",
      "Lucia: \"I feel so safe when we're together...\"",
      "The two of them dozed off side by side...💤",
    ],
  },
  {
    id: "chair",
    label: "🪑 Sit on the chair",
    gain: 10,
    expression: "love",
    special: "chair",
    photo: "assets/photos/lucia-chair.jpg",
    lines: [
      "When Fred sat down tired... Lucia squeezed in between his legs! \"This is my cozy spot♪\"",
      "The moment Fred sat on the chair, Lucia slipped right between his legs. \"I'm not letting go!\"",
      "Taking a break on the chair... Lucia burrowed in between his legs! \"Big hug♪\"",
    ],
  },
  {
    id: "watch",
    label: "👀 Check on her",
    gain: 0, // Like Meter does not change
    expression: "play",
    // Flip through photos to animate Lucia watching curiously
    flip: [
      "assets/photos/lucia-watch1.jpg",
      "assets/photos/lucia-watch2.jpg",
      "assets/photos/lucia-play1.jpg",
      "assets/photos/lucia-play2.jpg",
      "assets/photos/lucia-play3.jpg",
      "assets/photos/lucia-play4.jpg",
      "assets/photos/lucia-play5.jpg",
      "assets/photos/lucia-play6.jpg",
      "assets/photos/lucia-play7.jpg",
    ],
    flipInterval: 500,
    lines: [
      "Lucia is staring intently this way...",
      "Lucia: \"(Will I get something...? Can we play...?)\"",
      "Restless. Lucia's eyes are sparkling.",
    ],
  },
  {
    id: "toilet",
    label: "🚽 Go to the bathroom",
    gain: 7,
    expression: "shy",
    photo: "assets/photos/lucia-toilet.jpg",
    lines: [
      "When Fred got up to go to the bathroom... Lucia pitter-pattered right after him! \"Where are you going~!?\"",
      "When Fred stood up, Lucia followed in a flash. \"Wait, wait for me~!\"",
      "To the bathroom or anywhere else, Lucia follows Fred everywhere. Always together♪",
    ],

  },
  {
    id: "treat",
    label: "🦴 Give a treat",
    gain: 10,
    expression: "happy",
    lines: [
      "Lucia: \"Thank you! Nom nom...\"",
      "Lucia: \"I love these!\"",
      "Lucia gobbled it right up.",
    ],
  },
  {
    id: "walk",
    label: "🐾 Go for a walk",
    gain: 12,
    expression: "play",
    special: "paw",
    video: "assets/videos/lucia-walk.mp4", // ← walk video
    lines: [
      "Lucia: \"I love walks! Let's goooo!\"",
      "Lucia dashed off!",
    ],
  },
  {
    id: "sitnext",
    label: "🛋️ Sit next to Lucia",
    gain: 8,
    expression: "shy",
    lines: [
      "Fred quietly sat down next to Lucia.",
      "Lucia: \"I'm so happy you're here...♪\"",
      "The two of them sat side by side, a peaceful moment.",
    ],
  },
  {
    id: "nothing",
    label: "😔 Do nothing",
    gain: -3, // negative: the Like Meter goes down
    expression: "shy",
    special: "sad",
    photo: "assets/photos/lucia-sad.jpg",
    lines: [
      "Lucia: \"...Whimper.\"",
      "Lucia sadly turned away...",
      "With no attention, the Like Meter went down...",
    ],
  },
];
