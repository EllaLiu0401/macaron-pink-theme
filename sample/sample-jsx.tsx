// Macaron Pink - JSX rendering sample
import { useState, useMemo, type FC, type ReactNode } from "react";

type Flavor = "rose" | "lavender" | "mint" | "lemon";

interface CardProps {
  title: string;
  flavor: Flavor;
  price?: number;
  onSelect?: (f: Flavor) => void;
  children?: ReactNode;
}

const FLAVOR_EMOJI: Record<Flavor, string> = {
  rose: "🌹",
  lavender: "💜",
  mint: "🌿",
  lemon: "🍋",
};

export const MacaronCard: FC<CardProps> = ({
  title,
  flavor,
  price = 3.5,
  onSelect,
  children,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const label = useMemo(() => `${FLAVOR_EMOJI[flavor]} ${title}`, [flavor, title]);

  return (
    <article
      className={`macaron-card macaron-card--${flavor} ${hovered ? "is-hovered" : ""}`}
      data-flavor={flavor}
      data-limited={price > 5}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect?.(flavor)}
      style={{ opacity: hovered ? 1 : 0.9, padding: "1rem 1.5rem" }}
    >
      <h3 aria-label={title}>{label}</h3>
      <p>
        Price: <strong>${price.toFixed(2)}</strong>
      </p>
      {children ?? <em>No description</em>}
      <button type="button" disabled={price <= 0}>
        Add to cart
      </button>
      <img src="/macaron.png" alt={`${title} macaron`} loading="lazy" />
      <br />
      <input type="checkbox" defaultChecked={false} />
    </article>
  );
};

export default function Shop() {
  const [cart, setCart] = useState<Flavor[]>([]);
  return (
    <>
      <MacaronCard title="Rose" flavor="rose" price={4.2} onSelect={(f) => setCart([...cart, f])}>
        <span>Handmade with fresh petals.</span>
      </MacaronCard>
      <MacaronCard title="Lemon" flavor="lemon" />
    </>
  );
}
