import crypto from "crypto";

import dotenv from "dotenv";

// Load the environment variables from the root directory
dotenv.config();

function generateSeed(): string {
  const seedBuffer = crypto.randomBytes(16);
  return seedBuffer.toString("hex");
}

class LCG {
  private state: number;

  // Parameters for the LCG
  private static readonly a = 1664525;
  private static readonly c = 1013904223;
  private static readonly m = 2 ** 32;

  constructor(seed: string) {
    // Convert the seed from hexadecimal string to a number
    const seedNumber = BigInt(`0x${seed}`);
    this.state = Number(seedNumber % BigInt(LCG.m));
  }

  // Generate a random number between 0 and 1
  next(): number {
    this.state = (LCG.a * this.state + LCG.c) % LCG.m;
    return this.state / LCG.m;
  }
}

function calculateOdd(winChance: number): number {
  // 0.01 - 0.99
  const a = Number.parseFloat(process.env.ODD_PARAM_A);

  return 1 / (a * winChance);
}

function calculateWinningAmount(betAmount: number, winChance: number): number {
  const odd = calculateOdd(winChance);
  return betAmount * odd;
}

export { generateSeed, LCG, calculateWinningAmount, calculateOdd };
