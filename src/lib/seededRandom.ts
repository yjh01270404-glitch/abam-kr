/**
 * Simple hash function to convert a string (like an ID) to a 32-bit integer seed.
 * Utilizes the MurmurHash3 algorithm principles for good distribution.
 */
export function xmur3(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  }
}

/**
 * Mulberry32 PRNG
 * Takes a 32-bit integer seed and returns a random number between 0 and 1.
 */
export function mulberry32(a: number): () => number {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

/**
 * Utility function to pick a random element from an array based on a seeded random number generator.
 */
export function pickRandom<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Utility function to pick a random index from an array based on a seeded random number generator.
 */
export function pickRandomIndex<T>(arr: T[], rng: () => number): number {
  return Math.floor(rng() * arr.length);
}
