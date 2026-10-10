import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

// Explicit transitive inputs of acceptance, its suites and the reviewed generator.
// Historical acceptance outputs are read from Git, bound by their recorded commit/hash.
export const inputs = [
  'PROMPT.md', 'build_tools/release-plan.mjs', 'build_tools/release-review.json', 'build_tools/generate-release.mjs',
  'build_tools/release-engine.mjs', 'build_tools/release.test.mjs', 'build_tools/accept-release.mjs',
  'build_tools/reference-engine.mjs', 'build_tools/reference-engine.test.mjs', 'build_tools/schema-profile.mjs',
  'build_tools/schemas/contract.schema.json', 'build_tools/evidence/release-traceability.json',
  'README.md', 'examples.md', 'CHANGELOG.md', 'build_tools/README.md',
  '.gitignore', 'maintenance/PROMPT.md', 'maintenance/LIFECYCLE.md',
  'build_tools/prune-artifacts.mjs', 'build_tools/prune-artifacts.test.mjs',
  'build_tools/fixtures/catalog.json', 'build_tools/fixtures/procedures.json',
  'build_tools/candidate/operations-access.json', 'build_tools/candidate/entry.json',
  'build_tools/acceptance-inputs.mjs', 'build_tools/producer-safety.test.mjs',
  '.github/workflows/producer-tests.yml',
];
export const testFiles = ['build_tools/reference-engine.test.mjs', 'build_tools/release.test.mjs', 'build_tools/prune-artifacts.test.mjs', 'build_tools/producer-safety.test.mjs'];
export const expectedObservations = [
  ...Array.from({ length: 30 }, (_, i) => `REL-OBS-${String(i + 1).padStart(3, '0')}`),
  ...Array.from({ length: 25 }, (_, i) => `REL-PKG-${String(i + 1).padStart(3, '0')}`),
  ...Array.from({ length: 14 }, (_, i) => `REL-TOOL-${String(i + 1).padStart(3, '0')}`),
];
export function subjects(root) {
  const files = directory => readdirSync(join(root, directory), { withFileTypes: true }).flatMap(item =>
    item.isDirectory() ? files(`${directory}/${item.name}`) : [`${directory}/${item.name}`]);
  return [...files('dist').filter(path => path.endsWith('.json')), ...inputs].sort();
}
export const identify = (root, paths) => Object.fromEntries(paths.map(path => [path,
  `sha256:${createHash('sha256').update(readFileSync(join(root, path))).digest('hex')}`]));
