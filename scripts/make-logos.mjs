// Generates placeholder "MAATI" wordmark PNGs in the three brand colours.
// Pure Node (zlib only) — swap these for real brand assets when available.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

// 5x7 bitmap font
const F = {
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
};

const WORD = 'MAATI';
const SCALE = 10;
const GLYPH_W = 5;
const GLYPH_H = 7;
const GAP = 2; // columns between glyphs
const PAD = 2; // columns/rows of transparent padding

function buildMask() {
  const cols = WORD.length * GLYPH_W + (WORD.length - 1) * GAP + PAD * 2;
  const rows = GLYPH_H + PAD * 2;
  const mask = Array.from({ length: rows }, () => new Array(cols).fill(0));
  let x = PAD;
  for (const ch of WORD) {
    const g = F[ch];
    for (let r = 0; r < GLYPH_H; r++) {
      for (let c = 0; c < GLYPH_W; c++) {
        if (g[r][c] === '1') mask[r + PAD][x + c] = 1;
      }
    }
    x += GLYPH_W + GAP;
  }
  return mask;
}

// CRC32
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function makePng(path, [r, g, b]) {
  const mask = buildMask();
  const W = mask[0].length * SCALE;
  const H = mask.length * SCALE;

  // RGBA raw with per-row filter byte 0
  const raw = Buffer.alloc(H * (1 + W * 4));
  let p = 0;
  for (let y = 0; y < H; y++) {
    raw[p++] = 0; // filter: none
    const my = Math.floor(y / SCALE);
    for (let x = 0; x < W; x++) {
      const on = mask[my][Math.floor(x / SCALE)] === 1;
      raw[p++] = r;
      raw[p++] = g;
      raw[p++] = b;
      raw[p++] = on ? 255 : 0;
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const idat = deflateSync(raw, { level: 9 });

  const png = Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  writeFileSync(path, png);
  console.log(`wrote ${path}  (${W}x${H})`);
}

makePng(join(outDir, 'Maati_Logo_Maati_Black.png'), [0x1a, 0x12, 0x08]); // Soil
makePng(join(outDir, 'Maati_Logo_Bone.png'), [0xed, 0xe5, 0xd5]); // Bone
makePng(join(outDir, 'Maati_Logo_Earth.png'), [0xb8, 0x73, 0x33]); // Copper
