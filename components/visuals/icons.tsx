import {
  ListChecks,
  Coins,
  SquaresFour,
  CreditCard,
  PiggyBank,
  Wallet,
  ChartLineUp,
  HandHeart,
  type Icon,
} from "@phosphor-icons/react";

// String -> Phosphor component map so content data can reference icons by name
// while keeping one icon family across the page (taste-skill icon rule).
export const ICONS: Record<string, Icon> = {
  ListChecks,
  Coins,
  SquaresFour,
  CreditCard,
  PiggyBank,
  Wallet,
  ChartLineUp,
  HandHeart,
};
