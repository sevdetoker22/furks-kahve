import type { Product } from "@/lib/supabase/products";

export type ImageRegion = {
  src: string;
  width: number;
  height: number;
  region: readonly [left: number, top: number, width: number, height: number];
};

const source = (filename: string, width = 1536, height = 1024) => ({
  src: `/images/coffees/${filename}.png`,
  width,
  height,
});

const moda = source("moda-blend-reference");
const ethiopia = source("etiyopya-yirgacheffe-reference", 698, 776);
const colombia = source("kolombiya-huila-source");
const kenya = source("kenya-nyeri-aa-source");
const guatemala = source("guatemala-antigua-source");
const lastThree = source("brezilya-espresso-kafeinsiz-source");

// Only visual metadata lives here. IDs are the existing public.products IDs;
// changing a product's name, notes, price or stock does not change its image.
// CSS viewports show the supplied circles without modifying the source art.
const coffeeImages: Record<string, ImageRegion> = {
  "1": { ...source("moda-blend", 1254, 1254), region: [0, 0, 1254, 1254] },
  "2": {
    ...source("etiyopya-yirgacheffe", 484, 718),
    region: [21, 117, 463, 463],
  },
  "3": { ...colombia, region: [920, 187, 606, 606] },
  "4": { ...kenya, region: [925, 196, 599, 599] },
  "5": { ...guatemala, region: [918, 181, 608, 608] },
  "6": { ...lastThree, region: [108, 715, 289, 289] },
  "7": { ...lastThree, region: [629, 715, 289, 289] },
  "8": { ...lastThree, region: [1146, 715, 289, 289] },
};

// Ingredient photos are small viewports into the supplied references. Their
// labels always come from the live tasting_notes field, never from the image.
const tastingImages: Record<string, ImageRegion> = {
  fındık: { ...moda, region: [891, 575, 143, 114] },
  "sütlü çikolata": { ...moda, region: [1090, 563, 155, 119] },
  karamel: { ...moda, region: [1301, 562, 157, 123] },
  yasemin: { ...ethiopia, region: [36, 460, 108, 65] },
  bergamot: { ...ethiopia, region: [187, 458, 99, 68] },
  şeftali: { ...ethiopia, region: [336, 453, 101, 79] },
  "kırmızı elma": { ...colombia, region: [68, 584, 154, 118] },
  "esmer şeker": { ...colombia, region: [294, 589, 159, 116] },
  portakal: { ...colombia, region: [568, 582, 155, 122] },
  "frenk üzümü": { ...kenya, region: [69, 600, 163, 113] },
  greyfurt: { ...kenya, region: [321, 589, 166, 122] },
  bal: { ...kenya, region: [583, 575, 157, 139] },
  kakao: { ...lastThree, region: [1066, 439, 121, 68] },
  badem: { ...guatemala, region: [314, 589, 170, 123] },
  "kuru erik": { ...guatemala, region: [567, 585, 186, 123] },
  "yer fıstığı": { ...lastThree, region: [53, 437, 116, 70] },
  "bitter çikolata": { ...lastThree, region: [558, 433, 127, 80] },
  "kavrulmuş fındık": { ...lastThree, region: [720, 434, 115, 77] },
  pekmez: { ...lastThree, region: [889, 432, 123, 77] },
  "kuru üzüm": { ...lastThree, region: [1220, 434, 116, 78] },
  vanilya: { ...lastThree, region: [1364, 425, 143, 85] },
};

export function getCoffeeImage(id: Product["id"]) {
  return coffeeImages[String(id)];
}

export function getTastingImage(note: string) {
  return tastingImages[note.trim().toLocaleLowerCase("tr-TR")];
}

export function getTastingNotes(notes: string): string[] {
  return notes
    .split(/[,;·]/)
    .map((note) => note.trim())
    .filter(Boolean);
}

export function getRoastIntensity(roast: string): number | null {
  const normalized = roast.trim().toLocaleLowerCase("tr-TR");
  if (normalized.startsWith("açık")) return 2;
  if (normalized.startsWith("orta")) return 3;
  if (normalized.startsWith("koyu")) return 5;
  return null;
}
