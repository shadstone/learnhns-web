#!/usr/bin/env node
/**
 * Build the LearnHNS logo kit (SVG + PNG + zip) and refresh the
 * site-facing icon/wordmark files in /public.
 *
 * Requires (dev-only, not saved to package.json):
 *   npm install --no-save @resvg/resvg-js opentype.js
 */
import { Resvg } from '@resvg/resvg-js';
import opentype from 'opentype.js';
import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  rmSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const BRAND = join(ROOT, 'scripts/brand');
const PUBLIC = join(ROOT, 'public');
const KIT = join(PUBLIC, 'brand');
const STAGING = join(KIT, '_kit');

const COLORS = {
  white: '#FFFFFF',
  black: '#111111',
  violet: '#693AFA',
};

const ICON_SIZES = [512, 1024, 2048, 4096];
const FAVICON_SIZES = [16, 32, 48, 180, 192, 512];

const master = readFileSync(join(BRAND, 'learnhns-icon.svg'), 'utf8');

function withFill(svg, color) {
  return svg.replaceAll('currentColor', color);
}

function extractInner(svg) {
  return svg.replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace('</svg>', '');
}

function renderPng(svg, size, { background } = {}) {
  const viewBox = '0 0 1024 1024';
  const bg = background
    ? `<rect width="1024" height="1024" fill="${background}"/>`
    : '';
  const wrapped = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${size}" height="${size}">${bg}${extractInner(svg)}</svg>`;
  return new Resvg(wrapped, {
    fitTo: { mode: 'width', value: size },
    background: background ? undefined : 'rgba(0,0,0,0)',
  }).render().asPng();
}

function write(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, data);
}

function iconSvg(color) {
  return withFill(master, color);
}

function buildWordmarkSvg(iconColor, textColor) {
  const fontBuf = readFileSync(join(BRAND, 'SpaceGrotesk-Bold.ttf'));
  const font = opentype.parse(
    fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength),
  );
  const fontSize = 152;
  const path = font.getPath('LearnHNS', 0, 0, fontSize);
  // Tighten tracking slightly to match the site lockup.
  const bbox = path.getBoundingBox();
  const textW = bbox.x2 - bbox.x1;
  const textH = bbox.y2 - bbox.y1;
  const iconSize = 280;
  const gap = 36;
  const padX = 24;
  const padY = 24;
  const width = padX + iconSize + gap + textW + padX;
  const height = padY * 2 + Math.max(iconSize, textH + 24);
  const iconY = (height - iconSize) / 2;
  const textX = padX + iconSize + gap - bbox.x1;
  const textY = height / 2 - (bbox.y1 + bbox.y2) / 2;
  const iconInner = extractInner(iconSvg(iconColor));
  const textD = path.toPathData(2);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(1)} ${height.toFixed(1)}" role="img" aria-label="LearnHNS">
  <title>LearnHNS</title>
  <g transform="translate(${padX} ${iconY.toFixed(1)}) scale(${(iconSize / 1024).toFixed(6)})">
    ${iconInner}
  </g>
  <path fill="${textColor}" transform="translate(${textX.toFixed(1)} ${textY.toFixed(1)})" d="${textD}"/>
</svg>
`;
}

function renderWordmarkPng(svg, width) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: 'rgba(0,0,0,0)',
  }).render().asPng();
}

rmSync(STAGING, { recursive: true, force: true });
mkdirSync(join(STAGING, 'svg'), { recursive: true });
mkdirSync(join(STAGING, 'png'), { recursive: true });

// --- SVG ---
write(join(STAGING, 'svg/learnhns-icon.svg'), master);
write(join(STAGING, 'svg/learnhns-icon-white.svg'), iconSvg(COLORS.white));
write(join(STAGING, 'svg/learnhns-icon-black.svg'), iconSvg(COLORS.black));
write(join(STAGING, 'svg/learnhns-icon-violet.svg'), iconSvg(COLORS.violet));

const wordmarkWhite = buildWordmarkSvg(COLORS.white, COLORS.white);
const wordmarkBlack = buildWordmarkSvg(COLORS.black, COLORS.black);
write(join(STAGING, 'svg/learnhns-wordmark-white.svg'), wordmarkWhite);
write(join(STAGING, 'svg/learnhns-wordmark-black.svg'), wordmarkBlack);

// --- PNG icon ---
for (const [name, color] of [
  ['white', COLORS.white],
  ['black', COLORS.black],
  ['violet', COLORS.violet],
]) {
  const svg = iconSvg(color);
  for (const size of ICON_SIZES) {
    write(join(STAGING, `png/learnhns-icon-${name}-${size}.png`), renderPng(svg, size));
  }
}
write(
  join(STAGING, 'png/learnhns-icon-white-on-black-2048.png'),
  renderPng(iconSvg(COLORS.white), 2048, { background: '#000000' }),
);
write(
  join(STAGING, 'png/learnhns-icon-black-on-white-2048.png'),
  renderPng(iconSvg(COLORS.black), 2048, { background: '#FFFFFF' }),
);

// --- PNG wordmark ---
write(join(STAGING, 'png/learnhns-wordmark-white-2400.png'), renderWordmarkPng(wordmarkWhite, 2400));
write(join(STAGING, 'png/learnhns-wordmark-black-2400.png'), renderWordmarkPng(wordmarkBlack, 2400));

write(
  join(STAGING, 'README.txt'),
  `LearnHNS logo kit
=================

The mark is a head in profile with the Handshake H in mind — learning
the protocol. Same identity as the original LearnHNS icon, redrawn as
real vectors so it stays sharp at any size.

Use SVG whenever you can. PNG is included at 512 / 1024 / 2048 / 4096
for tools that want raster.

Files
-----
svg/
  learnhns-icon.svg              currentColor (inherits CSS color)
  learnhns-icon-white.svg
  learnhns-icon-black.svg
  learnhns-icon-violet.svg       Handshake violet #693AFA
  learnhns-wordmark-white.svg    icon + LearnHNS wordmark (outlined)
  learnhns-wordmark-black.svg

png/
  learnhns-icon-{white|black|violet}-{512,1024,2048,4096}.png
                                 transparent background
  learnhns-icon-white-on-black-2048.png
  learnhns-icon-black-on-white-2048.png
  learnhns-wordmark-white-2400.png
  learnhns-wordmark-black-2400.png

Color
-----
  Black     #111111
  White     #FFFFFF
  Violet    #693AFA    (Handshake / LearnHNS accent)
  Mint      #00F0C0    (accent only — not for the mark itself)

Usage
-----
  - Don't stretch, rotate, or add a drop shadow.
  - Keep clear space around the mark roughly equal to the neck width.
  - On dark backgrounds use the white mark. On light, use black.
  - Violet is optional for the whole mark. Don't recolor the H alone
    to a random palette.
  - The Handshake H inside the head is the Handshake protocol mark,
    used here as "HNS in mind." Don't replace it with another letter.

LearnHNS is independent and not affiliated with Handshake Foundation.
https://learnhns.com/about/
`,
);

// --- Zip ---
const zipPath = join(KIT, 'learnhns-logo-kit.zip');
rmSync(zipPath, { force: true });
execFileSync('zip', ['-r', '-q', zipPath, '.'], { cwd: STAGING });

// --- Site-facing copies ---
copyFileSync(join(STAGING, 'svg/learnhns-icon-white.svg'), join(PUBLIC, 'learnhnsicon.svg'));
copyFileSync(join(STAGING, 'svg/learnhns-icon-black.svg'), join(PUBLIC, 'learnhnsicon-dark.svg'));
copyFileSync(join(STAGING, 'svg/learnhns-icon-black.svg'), join(PUBLIC, 'learnhnsicon-dark-small.svg'));
copyFileSync(join(STAGING, 'png/learnhns-icon-white-512.png'), join(PUBLIC, 'learnhnsicon.png'));
copyFileSync(join(STAGING, 'png/learnhns-icon-black-1024.png'), join(PUBLIC, 'learnhnsicon-dark.png'));
copyFileSync(join(STAGING, 'png/learnhns-wordmark-white-2400.png'), join(PUBLIC, 'handshake-white.png'));
copyFileSync(join(STAGING, 'png/learnhns-wordmark-black-2400.png'), join(PUBLIC, 'handshake-dark.png'));

// Favicons from the black mark on transparent, plus a 512 white-on-violet app icon.
write(join(PUBLIC, 'favicon-16x16.png'), renderPng(iconSvg(COLORS.black), 16));
write(join(PUBLIC, 'favicon-32x32.png'), renderPng(iconSvg(COLORS.black), 32));
write(join(PUBLIC, 'favicon-48x48.png'), renderPng(iconSvg(COLORS.black), 48));
write(join(PUBLIC, 'apple-touch-icon.png'), renderPng(iconSvg(COLORS.white), 180, { background: COLORS.violet }));
write(join(PUBLIC, 'android-chrome-192x192.png'), renderPng(iconSvg(COLORS.white), 192, { background: COLORS.violet }));
write(join(PUBLIC, 'android-chrome-512x512.png'), renderPng(iconSvg(COLORS.white), 512, { background: COLORS.violet }));
execFileSync('magick', [
  join(PUBLIC, 'favicon-16x16.png'),
  join(PUBLIC, 'favicon-32x32.png'),
  join(PUBLIC, 'favicon-48x48.png'),
  join(PUBLIC, 'favicon.ico'),
]);

// Keep a preview copy at /brand for the About page (not inside the zip staging).
copyFileSync(join(STAGING, 'svg/learnhns-icon.svg'), join(KIT, 'learnhns-icon.svg'));
copyFileSync(join(STAGING, 'svg/learnhns-icon-white.svg'), join(KIT, 'learnhns-icon-white.svg'));
copyFileSync(join(STAGING, 'svg/learnhns-icon-black.svg'), join(KIT, 'learnhns-icon-black.svg'));
copyFileSync(join(STAGING, 'svg/learnhns-wordmark-black.svg'), join(KIT, 'learnhns-wordmark-black.svg'));
copyFileSync(join(STAGING, 'svg/learnhns-wordmark-white.svg'), join(KIT, 'learnhns-wordmark-white.svg'));
copyFileSync(join(STAGING, 'png/learnhns-icon-white-on-black-2048.png'), join(KIT, 'learnhns-icon-white-on-black-2048.png'));
copyFileSync(join(STAGING, 'png/learnhns-icon-black-on-white-2048.png'), join(KIT, 'learnhns-icon-black-on-white-2048.png'));
rmSync(STAGING, { recursive: true, force: true });

const zipStat = execFileSync('ls', ['-lh', zipPath]).toString().trim();
console.log('kit zip:', zipStat);
console.log('staging:', STAGING);
console.log(FAVICON_SIZES.join(','));
