/**
 * CLI: print Telegram pin text.
 *
 * Usage:
 *   npm run community:telegram
 *   npm run community:telegram:copy
 *   npm run community:telegram:html
 *   npm run community:telegram -- --full
 *   npm run community:telegram -- --out pin.txt
 *
 * Loads TypeScript via npx tsx (no permanent dep).
 */

import { writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const args = process.argv.slice(2);

const html = args.includes('--html');
const full = args.includes('--full');
const copy = args.includes('--copy');
const outIdx = args.indexOf('--out');
const outFile = outIdx >= 0 ? args[outIdx + 1] : null;

const mode = html ? 'html' : full ? 'full' : 'compact';

const loader = `
import {
  formatTelegramPlain,
  formatTelegramHtml,
  telegramExportStats,
} from ${JSON.stringify(resolve(root, 'src/lib/telegram-community-export.ts'))};

const mode = process.env.TG_EXPORT_MODE || 'compact';
const text = mode === 'html' ? formatTelegramHtml() : formatTelegramPlain(mode === 'full' ? 'full' : 'compact');
process.stdout.write(text);
const s = telegramExportStats(text);
console.error('[telegram export] mode=' + mode + ' ' + s.length + '/' + s.limit + (s.overLimit ? ' OVER LIMIT' : ' OK'));
if (s.overLimit) process.exitCode = 2;
`;

const result = spawnSync(
  'npx',
  ['--yes', 'tsx', '--eval', loader],
  {
    cwd: root,
    env: { ...process.env, TG_EXPORT_MODE: mode },
    encoding: 'utf8',
    maxBuffer: 4 * 1024 * 1024,
  },
);

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

const text = result.stdout || '';
const err = result.stderr || '';
if (err) process.stderr.write(err);

if (result.status && result.status !== 0 && result.status !== 2) {
  console.error('Export failed. Is network available for npx tsx?');
  process.exit(result.status);
}

if (outFile) {
  writeFileSync(outFile, text, 'utf8');
  console.error(`Wrote ${outFile}`);
} else if (copy) {
  const pb = spawnSync('pbcopy', [], { input: text, encoding: 'utf8' });
  if (pb.error || pb.status !== 0) {
    console.error('pbcopy failed — printing to stdout instead.');
    process.stdout.write(text);
  } else {
    console.error('Copied to clipboard (macOS pbcopy).');
  }
} else {
  process.stdout.write(text);
}

process.exit(result.status === 2 ? 2 : 0);
