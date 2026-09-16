export type Tier = "senior" | "non-senior";
export type DuesWindow = "prime" | "standard";

type Pricing = {
  base: number;
  onlineTotal: number;
};

// online totals are base * 1.03, taken directly from the real published
// numbers rather than recomputed, to avoid floating-point rounding drift.
const PRICING: Record<Tier, Record<DuesWindow, Pricing>> = {
  senior: {
    prime: { base: 187.0, onlineTotal: 192.61 },
    standard: { base: 212.0, onlineTotal: 218.36 },
  },
  "non-senior": {
    prime: { base: 375.0, onlineTotal: 386.25 },
    standard: { base: 425.0, onlineTotal: 437.75 },
  },
};

export function getDuesWindow(date: Date = new Date()): DuesWindow {
  const cutoff = new Date(date.getFullYear(), 10, 1); // Nov 1, local time
  return date >= cutoff ? "standard" : "prime";
}

export function getDuesAmount(
  tier: Tier,
  date: Date = new Date()
): { base: number; onlineTotal: number; window: DuesWindow } {
  const window = getDuesWindow(date);
  const { base, onlineTotal } = PRICING[tier][window];
  return { base, onlineTotal, window };
}

export const tierLabels: Record<Tier, string> = {
  senior: "Senior Brother",
  "non-senior": "Non-Senior Brother",
};
