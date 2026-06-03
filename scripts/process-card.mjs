import sharp from "sharp";
import path from "node:path";

const SRC =
  "C:/Users/Gebruiker/Desktop/code/DSG Kids/Debit Card Design with Girl Photo (4).svg";
const OUT = path.resolve("public/Penny-card.png");

// 1) Rasterize the SVG to RGBA at high resolution so the card stays crisp on
//    large and retina screens.
const TARGET_W = 2600;
const { data, info } = await sharp(SRC, { density: 500 })
  .resize({ width: TARGET_W })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info; // channels === 4
const idx = (x, y) => (y * width + x) * channels;

const isPureWhite = (i) =>
  data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235 && data[i + 3] > 10;
const isLightish = (i) =>
  data[i] > 205 && data[i + 1] > 205 && data[i + 2] > 205 && data[i + 3] > 10;

// 2) Flood-fill the outer white background from every border pixel.
const visited = new Uint8Array(width * height);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const p = y * width + x;
  if (visited[p]) return;
  visited[p] = 1;
  if (isPureWhite(idx(x, y))) {
    data[idx(x, y) + 3] = 0; // transparent
    stack.push(x, y);
  }
};
for (let x = 0; x < width; x++) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  push(0, y);
  push(width - 1, y);
}
while (stack.length) {
  const y = stack.pop();
  const x = stack.pop();
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

// 3) Erode the anti-aliased near-white ring left along the card edge.
//    Only clears lightish pixels that touch an already-transparent pixel, so
//    saturated hair/sweater pixels (low min-channel) are never touched.
for (let pass = 0; pass < 3; pass++) {
  const toClear = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = idx(x, y);
      if (data[i + 3] === 0) continue;
      if (!isLightish(i)) continue;
      const neighborTransparent =
        (x > 0 && data[idx(x - 1, y) + 3] === 0) ||
        (x < width - 1 && data[idx(x + 1, y) + 3] === 0) ||
        (y > 0 && data[idx(x, y - 1) + 3] === 0) ||
        (y < height - 1 && data[idx(x, y + 1) + 3] === 0);
      if (neighborTransparent) toClear.push(i);
    }
  }
  if (!toClear.length) break;
  for (const i of toClear) data[i + 3] = 0;
}

// 4) Re-encode, then trim transparent margins to a tight card crop.
const cleaned = await sharp(data, { raw: { width, height, channels } })
  .png()
  .toBuffer();

const out = await sharp(cleaned)
  .trim({ threshold: 0 })
  .toFile(OUT);

console.log("wrote", OUT, out.width, out.height);
