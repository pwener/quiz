# About

This is an API for scoring favorite movies based on IMDb data. From a list of 10 favorite movies, the system returns a primary and a secondary archetype.

Right now, these are the genres supported by imdb:

Action | Adult | Adventure | Animation | Biography | Comedy | Crime | Documentary | Drama | Family | Fantasy | Film Noir | Game Show | History | Horror | Musical | Music | Mystery | News | Reality-TV | Romance | Sci-Fi | Short | Sport | Talk-Show | Thriller | War | Western 

Based on this list, the system must return the following primary and secondary archetypes:

## 1. Puzzle-Solver

Core Motivation: Wants to be challenged, surprised, and left thinking after the credits roll.

Key Metadata Signals: Psychological Thriller, Mystery, Sci-Fi, High Narrative Complexity, "Plot Twist" tags.

Primary genres: Mystery, Sci-Fi, 
Secondary genres: Crime, Thriller

## 2. World-Builder

Core Motivation: Immersion into rich, expansive fictional universes and high stakes.

Key Metadata Signals: Fantasy, Sci-Fi, Adventure, Animation, High Budget / VFX, Franchise/Series tags.

Primary genres: Adventure, Animation, Fantasy
Secondary genres: Action, Family, Sci-Fi


## 3. Cinephile

Core Motivation: Artistry, cinematography, directorial vision, and cinema as high art.

Key Metadata Signals: Drama, Foreign / Non-English, Festival Winners (Cannes, Venice), Criterion Collection, Pre-1980 Classics, High Metacritic scores.

Primary genres: Drama, Film Noir
Secondary genres: Mystery, Crime, Thriller

## 4. Adrenaline-Seeker

Core Motivation: Adrenaline, tension, visceral excitement, and fast-paced action.

Key Metadata Signals: Action, Thriller, Crime, Heist, High Body Count, High Pacing tags.

Primary genres: Action, Crime, Thriller
Secondary genres: Adventure, War, Western

## 5. Heart-Led Romantic

Core Motivation: Emotional resonance, character-driven relationships, and human connection.

Key Metadata Signals: Romance, Rom-Com, Drama, Coming-of-Age, Character Study.

Primary genres: Musical, Romance
Secondary genres: Comedy, Drama

## 6. Comfort & Nostalgia Seeker

Core Motivation: Rewatchability, feel-good vibes, humor, and warm familiarity.

Key Metadata Signals: Comedy, Family, 80s/90s/00s Classics, High Rewatch Count, Lighthearted Tone.

Primary genres: Biography, Family
Secondary genres: Animation, Romance

## 7. Dark Explorer

Core Motivation: Fear, atmosphere, taboo subjects, and psychological tension.

Key Metadata Signals: Horror, Supernatural, Slasher, Psychological Horror, Gore, Gothic.

Primary genres: Horror
Secondary genres: Thriller, Film Noir, Mystery

## 8. Truth-Seeker

Core Motivation: Grounded storytelling, historical accuracy, and understanding the real world.

Key Metadata Signals: Biography, History, War, Documentary, "Based on True Events" tag.

Primary genres: Biography, Documentary, History, War
Secondary genres: Crime, Drama

## How the algoritm works

For each movie, we query the IMDb API to retrieve its genres, awarding two points for each primary genre and one point for each secondary genre. We then sum the scores across all categories and assign points to the corresponding archetypes based on key genre mappings. The primary and secondary archetypes are determined by these final scores.

In the event of a tie, we evaluate movies in reverse order—from last to first—removing entries until the tie is broken.

Unmapped genres are ignored.


