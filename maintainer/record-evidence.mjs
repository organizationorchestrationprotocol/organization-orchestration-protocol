// Producer-only local evidence collection. Never a consumer bootstrap command.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const hash = data => `sha256:${createHash('sha256').update(data).digest('hex')}`;
const source = readFileSync(new URL('../PROMPT.md', import.meta.url), 'utf8');
const revision = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
if (revision.status !== 0) throw new Error('Cannot identify local source baseline');
const baseline = spawnSync('git', ['show', 'HEAD:PROMPT.md'], { cwd: root, encoding: 'utf8', maxBuffer: 1024 * 1024 });
if (baseline.status !== 0) throw new Error('Cannot inspect baseline source');
// Only REL additions and the explicitly authorized index replacement may alter canonical source.
const start = source.indexOf('### AI-first distribution acceptance contract');
const end = source.indexOf('### Durable protocol validation evidence', start);
if (start < 0 || end < 0) throw new Error('Missing source contract');
const revisedIndex = source.split(/\r?\n/).find(x => x.startsWith('The distribution MUST expose a compact machine-readable Semantic Routing Index'));
const oldIndex = baseline.stdout.split(/\r?\n/).find(x => x.startsWith('The distribution MUST expose a compact machine-readable, human-inspectable Semantic Routing Index'));
if (!revisedIndex || !oldIndex) throw new Error('Missing index replacement');
const normalized = value => value.replace(/\r\n/g, '\n').trimEnd();
const retained = (source.slice(0, start) + source.slice(end)).replace(revisedIndex, oldIndex);
if (normalized(retained) !== normalized(baseline.stdout)) throw new Error('Unexpected retained source changes');
const run = spawnSync(process.execPath, ['--test', '--test-reporter=tap', 'maintainer/reference-engine.test.mjs'],
  { cwd: root, encoding: 'utf8', maxBuffer: 1024 * 1024 });
const observations = [...run.stdout.matchAll(/^ok \d+ - (REL-OBS-\d+): (.+)$/gm)]
  .map(match => ({ id: match[1], checked: match[2], expected: 'passes positive/negative/unknown isolated fixture assertions', actual: 'passed' }));
if (run.status !== 0 || observations.length !== 30 || !/^# fail 0$/m.test(run.stdout)) {
  process.stderr.write(run.stdout + run.stderr); throw new Error('Local reference checks incomplete or failed');
}
const evidenceDir = new URL('./evidence/', import.meta.url);
mkdirSync(evidenceDir, { recursive: true });
writeFileSync(new URL('local-tests.tap', evidenceDir), run.stdout);
const identities = Object.fromEntries(['../PROMPT.md', './reference-engine.mjs', './reference-engine.test.mjs',
  './schema-profile.mjs', './schemas/contract.schema.json', './candidate/entry.json', './candidate/operations-access.json']
  .map(path => [path, hash(readFileSync(new URL(path, import.meta.url)))]));
const deltas = [];
for (let n = 1; n <= 11; n++) {
  const id = `REL-${String(n).padStart(2, '0')}`;
  const clause = source.split(/\r?\n/).find(line => line.startsWith(`${id} —`));
  if (!clause) throw new Error(`Missing delta ${id}`);
  deltas.push({ id: `SD-${id}`, classification: 'normative_addition', requirements: [id],
    source_locator: `PROMPT.md:AI-first distribution acceptance contract:${id}`, content_identity: hash(clause),
    summary: clause.split(' — ')[1].split('. ')[0], derived_disposition: 'candidate references only; complete production export pending',
    evidence_ref: 'maintainer/evidence/local-validation.json', semantic_coverage: 'pending_complete_export' });
}
deltas.push({ id: 'SD-REL-INDEX', classification: 'owner_authorized_normative_replacement',
  requirements: ['Semantic Routing Index', 'REL-01', 'REL-04'],
  source_locator: 'PROMPT.md:Semantic Routing Index and deterministic closure', content_identity: hash(revisedIndex),
  minimally_superseded: 'human-inspectable distribution-index requirement and flat placement of all index fields',
  authority_ref: 'current owner request approving the AI-first release plan; no commit authorization',
  reason: 'Human presentation must not increase consumer costs; compact selection and exact detailed references retain field coverage.',
  preserved: 'canonical authority, conservative routing, required index fields, source binding, producer evidence and BOOT-04 exclusions',
  evidence_ref: 'maintainer/evidence/local-validation.json' });
writeFileSync(new URL('change-impact.json', evidenceDir), JSON.stringify({
  current_source_identity: hash(source), baseline_commit: revision.stdout.trim(),
  baseline_kind: 'identified local prior source; previously verified rolling release baseline not established',
  retained_source: 'preserved_verbatim_except_explicit_index_replacement',
  deltas, impact: {
    README: 'affected: maintainer guidance and explicit candidate limits', examples: 'affected: AI-first scenarios',
    maintainer_guidance: 'affected: reference procedures and producer-only commands',
    schemas: 'affected: new restricted contract profile', tests: 'affected: 30 isolated observations',
    generated_artifacts: 'affected: single non-installable candidate contract; complete distribution pending',
    release_evidence: 'affected: exact subject identities, test outcomes and isolated benchmark; readiness false',
  }, release_ready: false, unresolved: ['full_semantic_export', 'verified_rolling_regression_basis', 'applicable_live_integration']
}, null, 2) + '\n');
writeFileSync(new URL('local-validation.json', evidenceDir), JSON.stringify({
  observed_at: new Date().toISOString(), node_version: process.version,
  evidence_tier: 'local_executable_fixture_and_restricted_schema_profile', identities,
  observations, source_preservation_check: { expected: 'unrelated canonical text retained', actual: 'passed' },
  restricted_candidate_schema: 'passed', general_json_schema_conformance: 'not_claimed',
  complete_semantic_review_and_export: 'not_verified', provider_execution: 'not_performed',
  installed_runtime_paths: 'not_performed', cross_runtime_execution: 'not_performed', release_ready: false,
}, null, 2) + '\n');
process.stdout.write('30 isolated observations passed; canonical retained-text check passed; production release readiness remains false.\n');
