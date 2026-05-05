import fine from "@/assets/tee-fine.jpg";
import grass from "@/assets/tee-grass.jpg";
import ghost from "@/assets/tee-ghost.jpg";
import overthinker from "@/assets/tee-overthinker.jpg";
import banana from "@/assets/tee-banana.jpg";
import nottoday from "@/assets/tee-nottoday.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  tagline: string;
  badge?: string;
};

export const products: Product[] = [
  { id: "fine", name: "I'M FINE Tee", price: 32, image: fine, color: "Washed Black", tagline: "For when you're definitely not.", badge: "BESTSELLER" },
  { id: "grass", name: "Touch Grass Tee", price: 34, image: grass, color: "Hot Pink", tagline: "Friendly reminder, hostile color." },
  { id: "ghost", name: "Boo Hoo Ghost Tee", price: 36, image: ghost, color: "Bone Cream", tagline: "Sad but caffeinated.", badge: "NEW" },
  { id: "overthinker", name: "Pro Overthinker Tee", price: 32, image: overthinker, color: "Highlighter Yellow", tagline: "Anxiety, but make it loud." },
  { id: "banana", name: "Slippery Vibes Tee", price: 34, image: banana, color: "Onyx Black", tagline: "A banana with boundaries." },
  { id: "nottoday", name: "Not Today Tee", price: 32, image: nottoday, color: "Power Pink", tagline: "Plans? In this economy?" },
];
