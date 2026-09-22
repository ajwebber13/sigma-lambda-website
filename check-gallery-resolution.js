#!/usr/bin/env node
/**
 * Checks image resolution in the three gallery folders that had
 * Facebook-thumbnail-sized images. Run from the repo root:
 *
 *   node check-gallery-resolution.js
 *
 * No dependencies — reads JPEG headers directly.
 * Exits with code 1 if any image is under the threshold, so it can gate
 * a commit or a Claude Code step.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const MIN_LONG_EDGE = 1024; // matches the working Gala 2025 photos (1024x683)

const FOLDERS = [
  "public/images/gallery/cityofnola-honors-sigmalambda-centennial",
  "public/images/gallery/normanfrancis-omega",
  "public/images/gallery/founders-week25-brotherhoodsmoke",
];

function getJpegDimensions(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null; // not a JPEG
  let offset = 2;
  const sofMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
  ]);
  while (offset < buffer.length - 1) {
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = buffer[offset + 1];
    if (sofMarkers.has(marker)) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    const segmentLength = buffer.readUInt16BE(offset + 2);
    offset += 2 + segmentLength;
  }
  return null;
}

function checkFolder(folder) {
  const fullPath = path.resolve(process.cwd(), folder);
  if (!fs.existsSync(fullPath)) {
    console.log(`\n${folder}\n  MISSING — folder not found`);
    return { checked: 0, failed: 0 };
  }

  const files = fs
    .readdirSync(fullPath)
    .filter((f) => /\.(jpe?g)$/i.test(f));

  console.log(`\n${folder}  (${files.length} images)`);

  let failed = 0;
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const buffer = fs.readFileSync(filePath);
    const dims = getJpegDimensions(buffer);
    const sizeKb = (fs.statSync(filePath).size / 1024).toFixed(0);

    if (!dims) {
      console.log(`  ? ${file} — could not read dimensions`);
      failed++;
      continue;
    }

    const longEdge = Math.max(dims.width, dims.height);
    const pass = longEdge >= MIN_LONG_EDGE;
    if (!pass) failed++;

    console.log(
      `  ${pass ? "OK  " : "FAIL"} ${file} — ${dims.width}x${dims.height} (${sizeKb}KB)`
    );
  }

  return { checked: files.length, failed };
}

let totalChecked = 0;
let totalFailed = 0;

for (const folder of FOLDERS) {
  const { checked, failed } = checkFolder(folder);
  totalChecked += checked;
  totalFailed += failed;
}

console.log(`\n${"-".repeat(40)}`);
console.log(`Checked: ${totalChecked}   Failed: ${totalFailed}`);

if (totalFailed > 0) {
  console.log(`\n${totalFailed} image(s) are still under ${MIN_LONG_EDGE}px on the long edge.`);
  process.exit(1);
} else {
  console.log("\nAll images pass the resolution check.");
  process.exit(0);
}
