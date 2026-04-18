/**
 * Чистит фон гравюр: светлые пиксели → белый, обрезка вертикальной полосы справа, trim полей.
 * Запуск: node scripts/cleanAnimalPngs.mjs
 */
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "assets", "animals");

function lightenBackground(data, width, height, channels) {
  const out = Buffer.from(data);
  const lightThreshold = 198;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * channels;
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];
      const lum = (r + g + b) / 3;

      if (lum >= lightThreshold) {
        out[i] = 255;
        out[i + 1] = 255;
        out[i + 2] = 255;
        if (channels === 4) out[i + 3] = 255;
      }
    }
  }
  return out;
}

function findContentWidth(processed, w, h, ch) {
  const barDarkLum = 55;
  const minDarkRatio = 0.45;

  for (let x = w - 1; x >= Math.floor(w * 0.5); x -= 1) {
    let dark = 0;
    for (let y = 0; y < h; y += 1) {
      const i = (y * w + x) * ch;
      const lum = (processed[i] + processed[i + 1] + processed[i + 2]) / 3;
      if (lum < barDarkLum) dark += 1;
    }
    if (dark / h < minDarkRatio) {
      return x + 1;
    }
  }
  return w;
}

async function processFile(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const ch = info.channels;

  const processed = lightenBackground(data, w, h, ch);
  const newW = findContentWidth(processed, w, h, ch);

  let pipeline = sharp(processed, { raw: { width: w, height: h, channels: ch } });
  if (newW < w) {
    pipeline = pipeline.extract({ left: 0, top: 0, width: newW, height: h });
  }

  const tmp = `${filePath}.tmp.png`;
  await pipeline.png({ compressionLevel: 9 }).toFile(tmp);
  const trimmed = await sharp(tmp).trim({ threshold: 12 }).png().toBuffer();
  await fs.unlink(tmp);

  const { data: rgba, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const d = Buffer.from(rgba);
  for (let i = 0; i < d.length; i += 4) {
    if (d[i] >= 246 && d[i + 1] >= 246 && d[i + 2] >= 246) {
      d[i + 3] = 0;
    }
  }
  await sharp(d, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(filePath);
}

const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".png"));
for (const f of files) {
  const fp = path.join(dir, f);
  try {
    await processFile(fp);
    console.log("OK", f);
  } catch (e) {
    console.error("FAIL", f, e.message);
  }
}
