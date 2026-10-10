import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pruneArtifacts } from './prune-artifacts.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'oop-prune-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const directory of ['modules', 'details']) mkdirSync(join(root, 'distribution', directory), { recursive: true });
  const write = path => writeFileSync(join(root, path), '{}\n');
  const expected = ['distribution/modules/new.json', 'distribution/details/new.json'];
  expected.forEach(write);
  return { root, write, expected };
}

test('REL-TOOL-001: removed or renamed modules lose both old generated artifacts', t => {
  const { root, write, expected } = fixture(t);
  for (const directory of ['modules', 'details']) write(`distribution/${directory}/old.json`);
  assert.deepEqual(pruneArtifacts(root, expected).sort(), ['distribution/details/old.json', 'distribution/modules/old.json']);
  for (const path of expected) assert.ok(existsSync(join(root, path)));
  assert.deepEqual(pruneArtifacts(root, expected), []);
});
test('REL-TOOL-002: cleanup preserves files outside the generated JSON boundary', t => {
  const { root, write, expected } = fixture(t);
  for (const path of ['distribution/modules/notes.md', 'distribution/details/notes.txt', 'distribution/entry.json']) write(path);
  mkdirSync(join(root, 'distribution/modules/archive'));
  assert.deepEqual(pruneArtifacts(root, expected), []);
  assert.ok(existsSync(join(root, 'distribution/modules/notes.md')));
  assert.ok(existsSync(join(root, 'distribution/entry.json')));
});
test('REL-TOOL-003: incomplete generation prevents all orphan deletion', t => {
  const { root, write, expected } = fixture(t);
  write('distribution/modules/old.json');
  assert.throws(() => pruneArtifacts(root, [...expected, 'distribution/details/missing.json']));
  assert.ok(existsSync(join(root, 'distribution/modules/old.json')));
});
test('REL-TOOL-004: unsafe inventory and empty allocation fail before deletion', t => {
  const { root, write, expected } = fixture(t);
  write('distribution/modules/old.json');
  assert.throws(() => pruneArtifacts(root, [...expected, 'distribution/details/../entry.json']));
  assert.throws(() => pruneArtifacts(root, ['distribution/modules/new.json']));
  assert.ok(existsSync(join(root, 'distribution/modules/old.json')));
});
