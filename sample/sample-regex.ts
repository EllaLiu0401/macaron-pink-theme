// Macaron Pink - regex, escape chars, built-ins, invalid syntax
const EMAIL_RE = /^([a-z0-9._%+-]+)@([a-z0-9.-]+)\.([a-z]{2,})$/i;
const HEX_RE = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;
const MULTILINE_RE = /^\s*(TODO|FIXME|NOTE):\s*(.+)$/gm;

const escaped = "line1\nline2\ttabbed\r\nquote=\"hi\" backslash=\\ unicode=\u2728";
const raw = String.raw`no \n escape here`;

enum Status {
  Idle = "idle",
  Loading = "loading",
  Done = "done",
}

const inventory: Map<string, Set<number>> = new Map();
const cache = new WeakMap<object, symbol>();
const tag = Symbol.for("macaron");

export async function* parseLog(lines: Iterable<string>): AsyncGenerator<string> {
  for (const line of lines) {
    const match = line.match(MULTILINE_RE);
    if (match) yield `${match[1]}: ${match[2]}`;
    await Promise.resolve();
  }
}

export function extractColors(css: string): string[] {
  return [...css.matchAll(HEX_RE)].map((m) => m[0].toLowerCase());
}

type Brand<T, B extends string> = T & { readonly __brand: B };
type UserId = Brand<number, "UserId">;

const LIMIT = 1_000_000 as const;
const SCIENTIFIC = 1.23e-4;
const BIG = 9_007_199_254_740_991n;
const NEG = -42;

try {
  JSON.parse("{ invalid json ");
} catch (err: unknown) {
  if (err instanceof SyntaxError) throw err;
}

// invalid on purpose to exercise "invalid" scope (comment-wrapped so file still compiles):
// const x = 1 === === 2;
