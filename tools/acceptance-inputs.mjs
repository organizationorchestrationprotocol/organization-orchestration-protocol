import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

// Explicit transitive inputs of acceptance, its suites and the reviewed generator.
// Historical acceptance outputs are read from Git, bound by their recorded commit/hash.
export const inputs = [
  'PROTOCOL.md', 'tools/release-plan.mjs', 'tools/release-review.json', 'tools/generate-release.mjs',
  'tools/release-engine.mjs', 'tools/release.test.mjs', 'tools/accept-release.mjs',
  'tools/reference-engine.mjs', 'tools/reference-engine.test.mjs', 'tools/schema-profile.mjs',
  'tools/schemas/contract.schema.json', 'tools/evidence/release-traceability.json',
  'README.md', 'examples.md', 'CHANGELOG.md', 'tools/README.md',
  '.gitignore', 'MAINTENANCE.md',
  'tools/prune-artifacts.mjs', 'tools/prune-artifacts.test.mjs',
  'tools/fixtures/catalog.json', 'tools/fixtures/procedures.json',
  'tools/candidate/operations-access.json', 'tools/candidate/entry.json',
  'tools/acceptance-inputs.mjs', 'tools/producer-safety.test.mjs',
  '.github/workflows/producer-tests.yml',
];
export const testFiles = ['tools/reference-engine.test.mjs', 'tools/release.test.mjs', 'tools/prune-artifacts.test.mjs', 'tools/producer-safety.test.mjs'];
export const expectedObservations = [
  ...Array.from({ length: 30 }, (_, i) => `REL-OBS-${String(i + 1).padStart(3, '0')}`),
  ...Array.from({ length: 25 }, (_, i) => `REL-PKG-${String(i + 1).padStart(3, '0')}`),
  ...Array.from({ length: 14 }, (_, i) => `REL-TOOL-${String(i + 1).padStart(3, '0')}`),
];
export function subjects(root) {
  const files = directory => readdirSync(join(root, directory), { withFileTypes: true }).flatMap(item =>
    item.isDirectory() ? files(`${directory}/${item.name}`) : [`${directory}/${item.name}`]);
  return [...files('distribution').filter(path => path.endsWith('.json')), ...inputs].sort();
}
export const identify = (root, paths) => Object.fromEntries(paths.map(path => [path,
  `sha256:${createHash('sha256').update(readFileSync(join(root, path))).digest('hex')}`]));
