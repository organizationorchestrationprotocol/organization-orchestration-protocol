import { readdirSync, lstatSync, unlinkSync, realpathSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';

// Only module/detail JSON files belong to this cleanup boundary. Never recurse.
export function pruneArtifacts(root, expected) {
  const workspace = realpathSync(root);
  const removals = [];
  for (const directory of ['dist/modules', 'dist/details']) {
    const target = resolve(workspace, directory);
    if (lstatSync(target).isSymbolicLink() || realpathSync(target) !== target) {
      throw new Error(`Unsafe generated directory: ${directory}`);
    }
    for (const path of expected.filter(path => path.startsWith(`${directory}/`))) {
      const file = resolve(workspace, path);
      const boundary = relative(target, file);
      if (boundary.startsWith('..') || isAbsolute(boundary) || boundary.includes('/') || boundary.includes('\\') ||
          lstatSync(file).isSymbolicLink() || !lstatSync(file).isFile()) {
        throw new Error(`Invalid expected artifact: ${path}`);
      }
    }
    if (!expected.some(path => path.startsWith(`${directory}/`))) throw new Error(`Empty generated inventory: ${directory}`);
    for (const entry of readdirSync(target, { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (!entry.name.endsWith('.json') || expected.includes(path)) continue;
      if (!entry.isFile() || entry.isSymbolicLink()) throw new Error(`Unsafe orphan artifact: ${path}`);
      removals.push(path);
    }
  }
  // Validate the entire deletion plan before removing even the first file.
  for (const path of removals) unlinkSync(resolve(workspace, path));
  return removals;
}
