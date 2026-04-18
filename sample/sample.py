"""Macaron Pink theme preview - Python sample."""
from __future__ import annotations

import asyncio
from dataclasses import dataclass, field
from typing import Optional


MAX_FLAVORS = 12
API_URL = "https://api.example.com/v1"


@dataclass
class Macaron:
    name: str
    color: str
    sweetness: int = 5
    is_limited: bool = False
    tags: list[str] = field(default_factory=list)

    def describe(self) -> str:
        star = "⭐" if self.is_limited else ""
        return f"{self.name} ({self.color}) - sweetness {self.sweetness}{star}"


class MacaronShop:
    """A cozy pastel bakery."""

    def __init__(self, name: str) -> None:
        self.name = name
        self._inventory: dict[str, Macaron] = {}

    async def restock(self, flavors: list[Macaron]) -> int:
        added = 0
        for flavor in flavors:
            if flavor.name not in self._inventory:
                self._inventory[flavor.name] = flavor
                added += 1
                await asyncio.sleep(0.01)
        return added

    def find(self, name: str) -> Optional[Macaron]:
        return self._inventory.get(name)


if __name__ == "__main__":
    shop = MacaronShop("Ella's Bakery")
    rose = Macaron("Rose", "#FFB6C1", sweetness=8, is_limited=True)
    print(rose.describe())
