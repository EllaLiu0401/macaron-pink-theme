// Macaron Pink - theme preview sample
import { useState, useEffect } from "react";
import type { User } from "./types";

const API_URL = "https://api.example.com/v1";
const MAX_RETRIES = 3;

interface MacaronFlavor {
  name: string;
  color: `#${string}`;
  sweetness: number;
  isLimited?: boolean;
}

export class MacaronShop<T extends MacaronFlavor> {
  private inventory: Map<string, T> = new Map();

  constructor(private readonly shopName: string) {}

  async addFlavor(flavor: T): Promise<boolean> {
    if (this.inventory.has(flavor.name)) {
      console.warn(`Flavor "${flavor.name}" already exists!`);
      return false;
    }
    this.inventory.set(flavor.name, flavor);
    return true;
  }

  /** Return flavors sweeter than threshold */
  getSweetFlavors(threshold = 5): T[] {
    return [...this.inventory.values()]
      .filter((f) => f.sweetness >= threshold)
      .sort((a, b) => b.sweetness - a.sweetness);
  }
}

const flavors: MacaronFlavor[] = [
  { name: "Rose", color: "#FFB6C1", sweetness: 8, isLimited: true },
  { name: "Lavender", color: "#E6E6FA", sweetness: 6 },
  { name: "Mint", color: "#B5EAD7", sweetness: 4 },
  { name: "Lemon", color: "#FFF4A3", sweetness: 7 },
];

export function useMacaronPicker(shop: MacaronShop<MacaronFlavor>) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const flavor = flavors.find((f) => f.name === selected);
    if (flavor?.isLimited) {
      alert(`🍰 ${flavor.name} is limited edition!`);
    }
  }, [selected]);

  return { selected, setSelected } as const;
}

export default flavors;
