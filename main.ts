// StatAtlas hand-in program (Node 22, standard library only).
//
// The site is plain static files in app/ beside this file, with its
// screenshots in screenshots/. This program hands them in: it copies both
// folders to the output directory and writes dossier.json there, using the
// make.fun library vendored at vendor/makefun-frontend.ts. The library is
// the kit's copy, unchanged — the scorer rebuilds the dossier with its own
// copy and compares the two byte for byte.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The repository root is the directory holding this file.
const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The site must exist and have its front door, or there is nothing to hand in.
const appDir = join(repoRoot, 'app');
if (!existsSync(join(appDir, 'index.html')) || !statSync(join(appDir, 'index.html')).isFile()) {
  throw new Error('app/index.html is missing: the site cannot be handed in');
}

mkdirSync(outputDir, { recursive: true });
cpSync(appDir, join(outputDir, 'app'), { recursive: true });

const shotsDir = join(repoRoot, 'screenshots');
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outputDir, 'screenshots'), { recursive: true });
}

// The scorer's own caps, from the kit's gate: at most 4 screenshots, each
// at most 256 KiB; app/ at most 993 files and directories and 16 MiB;
// the dossier text at most 160 KiB.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
console.log(`StatAtlas handed in to ${outputDir}`);
