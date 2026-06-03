// Single source of truth for page copy and data.
// Stats, quotes, and trust names are taken from the live DSG Kids site so the
// waitlist stays factually aligned with the brand. No em-dashes anywhere.

export const HERO = {
  eyebrow: "Early access",
  // Two lines max at desktop, per taste-skill hero discipline.
  headline: "The money app made for kids to",
  rotatingWords: ["Earn", "Learn", "Bank", "save", "invest", "spend", "grow"],
  // Hero sub kept under 20 words.
  sub: "Kids earn allowance from chores, split it across save, spend, invest, and give, then earn a real debit card.",
  primaryCta: "Join the waitlist",
  secondaryCta: "See how it works",
};

// Static logo row (no marquee). Kept to the most credible financial names so
// the trust strip reads clean, not like a scrolling blur.
export const TRUST_LOGOS = [
  {
    name: "Morgan Stanley",
    src: "/brand-logos/morgan-stanley.svg",
    width: 190,
    height: 28,
  },
  {
    name: "Edward Jones",
    src: "/brand-logos/edward-jones.svg",
    width: 174,
    height: 28,
  },
  {
    name: "The Magnolia Group",
    src: "/brand-logos/the-magnolia-group.svg",
    width: 224,
    height: 46,
  },
  {
    name: "Replit",
    src: "/brand-logos/replit.svg",
    width: 52,
    height: 52,
  },
  {
    name: "MetroWest Daily News",
    src: "/brand-logos/metrowest-daily-news.svg",
    width: 180,
    height: 51,
  },
] as const;

export const STATS = [
  { value: 5000, suffix: "+", label: "copies sold" },
  { value: 1000, suffix: "+", label: "families" },
  { value: 100, suffix: "+", label: "schools" },
  { value: 100, suffix: "+", label: "financial firms" },
];

export const WHY = {
  heading: "Banks were not built for kids. Schools do not teach money.",
  body: "Cash is disappearing, and most kids with money in a piggy bank have no real way to use it, grow it, or understand it. Penny fixes that.",
  facts: [
    {
      value: "73%",
      caption: "of teens say they were never taught about money in school.",
    },
    {
      value: "1 in 4",
      caption: "US adults cannot pass a basic financial literacy quiz.",
    },
    {
      value: "$0",
      caption: "usable balance most kids actually have saved up.",
    },
  ],
};

export const HOW_IT_WORKS = {
  heading: "The money loop that actually sticks.",
  sub: "Kids earn from chores, split it across four pockets, and save their way to a real debit card.",
} as const;

export const STEPS = [
  {
    icon: "ListChecks",
    title: "Parents set the chores",
    body: "Make beds, finish homework, help with dinner. Pick the tasks and the payout frequency, like every Friday when all five are done.",
    image: "/steps/step-1.png",
  },
  {
    icon: "Coins",
    title: "Kids earn the allowance",
    body: "Funds move automatically from the parent account into the kid's account the moment chores get checked off.",
    image: "/steps/step-2.png",
  },
  {
    icon: "SquaresFour",
    title: "Money splits into four pockets",
    body: "Every dollar lands in one of four named pockets automatically. The most popular split is 50% save, 30% spend, 15% invest, and 5% give.",
    image: "/steps/step-3.jpg",
  },
  {
    icon: "CreditCard",
    title: "They unlock a real debit card",
    body: "Once a kid hits their first savings milestone, a real Penny debit card ships to the door. They choose where it gets swiped.",
    image: "/steps/step-4.png",
  },
] as const;

export const POCKETS = [
  {
    icon: "PiggyBank",
    name: "Save",
    percent: 50,
    blurb:
      "Long-term savings that compound. Kids watch their balance grow week after week and learn what patience pays.",
  },
  {
    icon: "Wallet",
    name: "Spend",
    percent: 30,
    blurb:
      "Their own debit card with tap to pay, and full control of where and when they swipe.",
  },
  {
    icon: "ChartLineUp",
    name: "Invest",
    percent: 15,
    blurb: "Fractional stocks with a parent. Real markets, real ownership.",
  },
  {
    icon: "HandHeart",
    name: "Give",
    percent: 5,
    blurb: "Donate to a cause the kid picks themselves.",
  },
] as const;

export const CARD_SECTION = {
  heading: "A card they earn, not one they are handed.",
  body: "When a kid hits their savings goal, Penny ships their own real debit card. They worked for it, it's theirs. That's how financially responsible adults are built.",
  cta: "Join the waitlist",
};

export const TESTIMONIALS = [
  {
    quote: "Truly a generational idea. Definitely going to read this to my kids.",
    name: "Sean Baker",
    role: "Parent of three",
    avatar: "/reviews/sean-baker.jpg",
  },
  {
    quote:
      "I hate how schools don't teach kids about personal finance. I'm glad I finally found a company that does.",
    name: "Stephanie Carter",
    role: "Mom of three",
    avatar: "/reviews/stephanie-carter.jpg",
  },
  {
    quote:
      "Doing something genuinely meaningful for one of our biggest problems: education.",
    name: "Amjad Masad",
    role: "CEO of Replit",
    avatar: "/reviews/amjad-masad.jpg",
  },
  {
    quote:
      "Such a sweet, smart story. It opened up real conversations about saving and giving in our house.",
    name: "Hannah Whitfield",
    role: "Mom of three",
  },
  {
    quote:
      "Just bought four copies. Promising idea, and I'm excited to see them in person.",
    name: "Emily Tarney, CFP, CIMA",
    role: "VP, Morgan Stanley",
    avatar: "/reviews/emily-tarney.jpg",
  },
  {
    quote:
      "I'd love to add this to the books I recommend to clients for their kids.",
    name: "Kim Hudson",
    role: "Edward Jones",
    avatar: "/reviews/kim-hudson.jpg",
  },
  {
    quote:
      "Worth every penny. My kids started a lemonade stand the weekend after we read it.",
    name: "David Kim",
    role: "Dad of two",
  },
  {
    quote:
      "My 6-year-old asks to read Penny every night. She's already saving in a jar labeled money tree.",
    name: "Jessica Rinaldi",
    role: "Mom of two",
    avatar: "/reviews/jessica-rinaldi.jpg",
  },
  {
    quote:
      "Finally a kids' book that makes money make sense. My boys get wants versus needs now.",
    name: "Marcus Bennett",
    role: "Dad of three",
    avatar: "/reviews/marcus-bennett.jpg",
  },
  {
    quote: "Really cool product!",
    name: "Ethan Zohn",
    role: "Winner of Survivor: Africa",
    avatar: "/reviews/ethan-zohn.webp",
  },
  {
    quote:
      "The illustrations are gorgeous and the lessons stick. We've read it cover to cover at least a dozen times.",
    name: "Priya Shah",
    role: "Mom of one",
    avatar: "/reviews/priya-shah.png",
  },
  {
    quote:
      "I bought it for my daughter and ended up reading it to my whole 2nd grade class. Every kid was hooked.",
    name: "Rachel O'Connor",
    role: "Parent & teacher",
    avatar: "/reviews/rachel-oconnor.jpg",
  },
  {
    quote:
      "My kids learned so much about personal finance! This looks awesome! I bought a copy for my kids and if they like it will probably place a bulk order. I would have loved this as a kid.",
    name: "Nathan Bost",
    role: "Edward Jones",
    avatar: "/reviews/nathan-bost.jpg",
  },
  {
    quote: "This is wonderful!",
    name: "Mijanou Spurdle",
    role: "Morgan Stanley",
    avatar: "/reviews/mijanou-spurdle.webp",
  },
  {
    quote: "WOW! Thank you so much!!!",
    name: "Veronica Visbal, CFP\u00ae",
    role: "Morgan Stanley, The Magnolia Group",
    avatar: "/reviews/veronica-visbal.webp",
  },
  {
    quote: "I love this idea. Definitely ordering for my neighbors as well!",
    name: "Amanda Henderson, QPFC",
    role: "Morgan Stanley",
    avatar: "/reviews/amanda-henderson.webp",
  },
  {
    quote:
      "Thank you so much for making me aware of your book. I have sent it to our marketing team and will consider this for future client gifts for their young children. Congratulations on your accomplishments at such a young age!",
    name: "Madison Anne Carter",
    role: "Morgan Stanley",
    avatar: "/reviews/madison-anne-carter.webp",
  },
] as const;

export const WAITLIST = {
  heading: "Be first in line for Penny.",
  body: "Join the waitlist and get 20 percent off the book today while the app gets ready.",
  placeholder: "parent@email.com",
  cta: "Join and save 20%",
  success: "You are on the list. Check your inbox for the discount code.",
  finePrint: "No spam. Unsubscribe anytime.",
};

export const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "The pockets", href: "#pockets" },
  { label: "The card", href: "#card" },
  { label: "Reviews", href: "#reviews" },
] as const;

export const PARENT_POWERS = [
  "Set chores. Set the pay. Set the split.",
  "Every move, live in your feed.",
  "Freeze, cap, or approve. One tap.",
] as const;

export const KIDS_LESSONS = [
  "Every chore earns real money.",
  "Four pockets. Save, Spend, Invest, Give.",
  "Hit the goal. Earn the card.",
] as const;

export const WHY_FEATURES = [
  {
    title: "Banks weren't built for kids",
    body: "Traditional banks have minimum ages, minimum balances, and zero financial education. Your child is an afterthought.",
    chipColor: "bg-gold/20",
    iconColor: "text-cream",
  },
  {
    title: "Schools don't teach this",
    body: "73% of teens graduate without a single personal finance class. Where exactly are they supposed to learn?",
    chipColor: "bg-sky/20",
    iconColor: "text-cream",
  },
  {
    title: "Cash doesn't work anymore",
    body: "When everything is digital, a piggy bank just becomes a jar of coins they can't use — and can't grow.",
    chipColor: "bg-teal/20",
    iconColor: "text-cream",
  },
] as const;
