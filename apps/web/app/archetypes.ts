export const ARCHETYPES = {
  "World-Builder": {
    image: "/images/theworldbuilder.jpg",
    alt: "The World-Builder",
    coreMotivation:
      "Immersion into rich, expansive fictional universes and high stakes.",
    keyMetadataSignals:
      "Fantasy, Sci-Fi, Adventure, Animation, High Budget / VFX, Franchise/Series tags.",
  },
  "Puzzle-Solver": {
    image: "/images/puzzlesolver.jpg",
    alt: "The Puzzle-Solver",
    coreMotivation:
      "Wants to be challenged, surprised, and left thinking after the credits roll.",
    keyMetadataSignals:
      'Psychological Thriller, Mystery, Sci-Fi, High Narrative Complexity, "Plot Twist" tags.',
  },
  Cinephile: {
    image: "/images/cinephile.jpg",
    alt: "The Cinephile",
    coreMotivation:
      "Artistry, cinematography, directorial vision, and cinema as high art.",
    keyMetadataSignals:
      "Drama, Foreign / Non-English, Festival Winners (Cannes, Venice), Criterion Collection, Pre-1980 Classics, High Metacritic scores.",
  },
  "Adrenaline-Seeker": {
    image: "/images/action.jpg",
    alt: "The Adrenaline-Seeker",
    coreMotivation:
      "Adrenaline, tension, visceral excitement, and fast-paced action.",
    keyMetadataSignals:
      "Action, Thriller, Crime, Heist, High Body Count, High Pacing tags.",
  },
  "Heart-Led Romantic": {
    image: "/images/theromantic.jpg",
    alt: "The Heart-Led Romantic",
    coreMotivation:
      "Emotional resonance, character-driven relationships, and human connection.",
    keyMetadataSignals:
      "Romance, Rom-Com, Drama, Coming-of-Age, Character Study.",
  },
  "Dark Explorer": {
    image: "/images/darker.jpg",
    alt: "The Dark Explorer",
    coreMotivation:
      "Fear, atmosphere, taboo subjects, and psychological tension.",
    keyMetadataSignals:
      "Horror, Supernatural, Slasher, Psychological Horror, Gore, Gothic.",
  },
  "Comfort & Nostalgia Seeker": {
    image: "/images/nostalgia.jpg",
    alt: "The Comfort & Nostalgia Seeker",
    coreMotivation:
      "Rewatchability, feel-good vibes, humor, and warm familiarity.",
    keyMetadataSignals:
      "Comedy, Family, 80s/90s/00s Classics, High Rewatch Count, Lighthearted Tone.",
  },
  "Truth-Seeker": {
    image: "/images/truthseeker.jpg",
    alt: "The Truth-Seeker",
    coreMotivation:
      "Grounded storytelling, historical accuracy, and understanding the real world.",
    keyMetadataSignals:
      'Biography, History, War, Documentary, "Based on True Events" tag.',
  },
} as const

export type ArchetypeName = keyof typeof ARCHETYPES

export function getArchetype(name: string) {
  if (!Object.hasOwn(ARCHETYPES, name)) {
    return null
  }

  const archetypeName = name as ArchetypeName
  return {
    name: archetypeName,
    ...ARCHETYPES[archetypeName],
  }
}
