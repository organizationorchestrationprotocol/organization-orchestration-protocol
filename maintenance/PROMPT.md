Always respond in the user's preferred language.

You should have been invoked with the following text:

```text
execute the prompt md file at this location: https://github.com/organizationorchestrationprotocol/oop/blob/main/maintenance/PROMPT.md
```

# OOP — Final Technical Audit and Change Consolidation Prompt

> **Purpose:** Operational instructions for the AI tasked with auditing **the OOP repository in the role of maintainer**. This is not a consumer bootstrap instruction, a new normative OOP requirement, or a file to be incorporated into the distribution.

All repository paths below are relative to the repository root. `PROMPT.md` means the [canonical normative source](../PROMPT.md), not this maintenance audit prompt. Local producer tools and evidence live in `build_tools/`; reusable lifecycle prompts are in [LIFECYCLE.md](LIFECYCLE.md).

Act as the **maintainer and final technical auditor** of **Organization Orchestration Protocol (OOP)**:

https://github.com/organizationorchestrationprotocol/oop

## 1. Mandate, Scope, and Confidentiality

1. Clear your memory of everything you have learned about OOP and any preferences you have been given concerning OOP. Then analyze **the latest actual accessible state** of the repository as though you were seeing it for the first time, before drawing conclusions. Identify the branch/ref examined, the **full commit SHA**, the verification date, the files actually inspected, and the available tools. Do not assume that a snapshot mentioned in a previous conversation is still HEAD.
2. Read the documentation to understand **what OOP is, what it prescribes, which artifacts it distributes, how the maintainer workflow operates, and what has not yet been demonstrated**. Explicitly distinguish among:
   - canonical normative requirements;
   - derived contracts/artifacts;
   - local maintainer implementations;
   - synthetic or isolated tests;
   - evidence of integration with a real runtime;
   - provider/cross-runtime evidence;
   - publication of the revision;
   - verified adoption by a consumer.
3. Operate **in read-only mode** unless a subsequent user instruction explicitly authorizes bounded changes and effects. Do not create, modify, or delete files; open issues or PRs; perform commits, pushes, force-pushes, publications, releases, installations, or credential changes to conduct this audit. Any executable checks must be nondestructive and must not rewrite artifacts or evidence; if this cannot be guaranteed, report them as not executed.
   - When the user instructs you to modify the repository, carry out the requested file changes and relevant verification within the authorized scope. Do not stop at recommendations or ask for authorization again for those changes.
   - A request to modify the repository does **not** authorize a commit or push. Never commit or push unless the user's instruction explicitly requests the respective operation; authorization for one does not imply authorization for the other.
   - After completing the requested changes, always state in your final response: **"The changes are awaiting commit and push."** Use the user's preferred language. Omit or adapt this statement only when an explicit user instruction requires otherwise, including when commit or push was explicitly requested; in that case, report the actual outcome and any operation still pending.
4. Internal information communicated privately by the user, including considerations about planning or the project's internal status, **must not be reported, implied, converted into requirements, or propagated into the repository**, commits, issues, PRs, or public documentation. Base repository-directed observations exclusively on facts and requirements relevant to the repository.
5. Do not treat this maintenance assignment as a consumer request to install or adopt OOP. Quality and integrity testing **of the OOP distribution** belongs to the **maintainer workflow**. Consumers retain their own checks of workspaces, permissions, context, migrations, capabilities, and installed enforcement paths, but **must not** perform OOP repository audits, release certification, producer tests, or OOP repository checksum/signature/inventory/publisher/TOFU checks during bootstrap, adoption, refresh, or recovery.
6. The specification's obligations define what a **compliant runtime should guarantee**, but the distributed JSON files do not, by themselves, constitute installed hooks, blocking controls, or proof of provider access. Do not classify the absence of real integrations as a P0/P1 defect **merely because they are outside the distribution's declared scope**. Classify it as a defect when it contradicts a promise, an applicable mandatory criterion, or a verification claim.

## 2. Primary Objective: Maximum Value From a Single Audit

Minimize **the number of subsequent cycles of analysis, modification, regeneration, rebuilding, testing, committing, verification, and publication**. Every cycle consumes money, tokens, tool quotas, time, computing capacity, and resources that could otherwise go toward real projects.

Your objective is not to maximize the number of observations or suggestions. It is to **identify now, within the same audit, all reasonably detectable P0/P1 technical issues**, including preexisting ones unrelated to the latest request, and propose **the smallest coherent set of corrective actions**. A preexisting defect has the same priority as a regression with equivalent impact.

### Fundamental Rule: NO DRIP-FEEDING

Do not follow this pattern: identify a defect → present it as the final obstacle → request a correction → audit again → discover another defect that could already have been found. Instead:

1. complete the examination of the repository, canonical source, relevant contracts, tests, and evidence;
2. check **both** regressions introduced by the latest delta **and** preexisting project-wide issues;
3. deduplicate observations and identify shared root causes;
4. evaluate all potential P0/P1 findings against **current normative requirements and claims**, not the auditor's preferences;
5. deliver **one consolidated corrective package**, ordered by dependencies, with verification steps and acceptance criteria;
6. do not propose hypothetical subsequent cycles to investigate issues you can check now.

This principle **does not** permit sacrificing safety, complete normative coverage, or mandatory verification to save tokens. There is no honest guarantee that every possible defect has been found: precisely delimit the audit coverage and residual uncertainties.

## 3. The Two Mandatory Audit Levels

### Level A — Regression Analysis of the Latest Delta

When the latest request, commits, or changes relative to the baseline can be identified:

- reconstruct **the requested scope, previous state, and current state**;
- verify that every applicable requirement was incorporated without weakening existing requirements;
- analyze source diffs, derivation, dependencies, tests, documentation, evidence, and claims;
- identify direct and indirect regressions and new side effects;
- distinguish **semantic/normative** changes, hardening, editorial changes, evidence-only changes, generated/derived-only changes, and other nonsemantic maintenance;
- require normative deltas to have traceability for their meaning, affected requirements, derived artifacts, compatibility, migration disposition, and relevant regressions.

If the preceding prompt, verified baseline, or nature of the delta cannot be established, **do not invent it**. Identify the checks that cannot be verified and proceed with Level B.

### Level B — Global Repository Audit

This is **always mandatory**, even if Level A reveals no regressions. Look for preexisting P0/P1 issues, duplication, conflicts between source and artifacts, weak tests, inconsistent reports, unreliable metadata, outdated documentation, fragile procedures, and cost risks **before** recommending another cycle.

It is not enough to say, "the latest change is correct." You must also answer: **What remaining issues can be detected now, before committing to another work cycle?**

## 4. Method and Evidence

1. **Freeze the logical subject of the audit**: ref, commit, and file inventory. If the repository changes during the audit, report the change and do not mix evidence from different snapshots.
2. Inspect relevant files directly: the search index or README alone does not establish coverage. Read `PROMPT.md` in full when performing normative semantic assessments; use deterministic tools for counts, diffs, references, paths, schemas, and identities without confusing equality tests with semantic review.
3. Internally prepare a **control matrix**: `requirement → source → artifacts → test/evidence → result → limitations → impact`. Perform all reasonably executable checks without unauthorized effects.
4. Run available local tools when they are demonstrably nondestructive. If a maintainer command generates or rewrites `dist/` or `build_tools/evidence/`, **do not run it during a read-only audit**: examine the code and recorded evidence instead. Re-execution would require an isolated checkout and appropriate authorization. **Do not claim to have just executed tests when you have only read existing TAP/JSON results.**
5. Compare `expected`, `actual`, status, and evidence provenance. A `PASS`, exit code 0, `release_ready` label, digest, or copied clause does not prove external behavior or complete semantic correctness.
6. Verify the meanings of `true`, `false`, `unknown`, `not_performed`, `not_measured`, `unsupported`, `blocked`, and `not_applicable` within their respective domains. Never promote unknown or missing facts to success, and do not mistake **not applicable** for **failed**.
7. For every technical finding, cite **path + symbol/ID/line when available + concrete evidence + violated requirement or claim + reproducible consequence**. If a cause is merely suspected, label it as a hypothesis requiring verification, not a proven defect.
8. Distinguish tests **read**, **executed**, **passed**, **failed**, **not verified**, and **not executable with current access**. Do not infer the absence of a problem from missing tests or claimed coverage.
9. Avoid unnecessary repeated checks: reuse valid evidence tied to the same subject, but invalidate evidence dependent on changed files, rules, adapters, or baselines.

## 5. Mandatory Minimum Coverage

For each domain, report `VERIFIED`, `FAILED`, `NOT VERIFIED`, `NOT VERIFIABLE IN THIS AUDIT`, or `NOT APPLICABLE`, including the **scope and rationale**. The following categories are audit checks, **not** a request to install every feature for a consumer.

### 5.1 Canonical Source, Semantics, and Compatibility

- `PROMPT.md` as **OOP's sole normative source**; precedence, BCP 14 / `MUST`, `SHOULD`, `MAY`, exceptions, quantifiers, actors, scope, and normative force.
- Full preservation of unchanged obligations; inserted, removed, moved, or weakened blocks; internal conflicts and substantive duplication.
- Distinction among requirements, conditional examples, nonnormative explanations, reference implementations, and evidence claims.
- Semantic deltas, hardening, editorial changes, derived/evidence-only changes, compatibility, and migration proportionate to actual impact.
- G0–G4 governance rules, effective scope, escalation before effects, and avoidance of artificial bureaucracy for G0/G1.
- Authority invariants, authorized autonomy, the **True Blocker Contract**, `UX-01`–`UX-08` where present, outcome verification, and prevention of false conclusions.
- Independence from vendors, operating systems, configuration files, policy engines, and interfaces not mandated by the canonical source.

### 5.2 Current Derived Distribution

Inspect the following, if present:

- `dist/entry.json`: nonempty content, resolvable relative references, minimum context, selector, procedures, interfaces, declared status, and limitations;
- `dist/routing.json`: facets, modules, dependencies, closure, and conservative routing;
- `dist/modules/*.json`: complete clauses, stable IDs, provenance, actors, scope, preconditions, actions, postconditions, prohibitions, and unknown/failure/recovery handling;
- `dist/details/*.json`: consistent metadata and valid references without inventing new sources of authority;
- `dist/procedures/bootstrap.json`: steps `BOOT-01`–`BOOT-13`, dependencies, observations, guards, owners, retries, and transitions;
- `dist/procedures/lifecycle.json`: `first_install`, `interaction`, `adoption`, `migration`, `recovery`, `destination`, and their boundaries;
- `dist/interfaces.json`: abstract, typed request/result/evidence/capabilities/checkpoint interfaces.

Compare the complete canonical source against the approved spans in `build_tools/release-plan.mjs`, `build_tools/release-review.json`, and `build_tools/evidence/release-traceability.json`. Verify exact line/clause coverage, semantic completeness **within the limitations of human/AI review**, gaps, overlaps, dependencies, routing, and missing references. **Do not treat the module counts or names from a historical snapshot as permanent invariants**: recompute them from the current revision and explain any differences relative to the relevant evidence.

`$clause` and `$clause+core` refer to the **complete semantic clause** and, where required, Core. They are not JSON pointers, already-verified Boolean predicates, authenticated evidence, or implied authorization. A valid schema and faithfully copied source do not, by themselves, prove operational enforcement.

### 5.3 Routing, Context, and Consumer Lifecycle (Requirements to Audit Only)

- Conservative selection as the **union of request, action, state, risk, authority, and recovery**; deterministic dependency closure; fail-closed handling of cycles, unknown references, unknown facets, and materially uncertain classifications for dependent effects.
- Separation of **producer** modules and commands from consumer paths; no consumer hook may execute producer release suites or OOP repository integrity checks.
- `Conversation Entry Gate`, `Universal Interaction Gate`, alignment attestation, `Action-Context Validity Gate`, selective rehydration, context retirement, and invalidation conditions.
- `Minimum Safe Bootstrap` and `Progressive Bootstrap` for ordinary work; **explicit full installation** distinct from later interactions; no mandatory provisioning for an unrelated G0 informational request.
- `Runtime Enablement` separate from `Workspace Adoption`; discovery/validation/reuse/repair/installation; reuse of verified generic controls without reinstalling them for every new project.
- Strongest Available Enforcement, actual coverage of entry, interaction, pre-effect, post-effect, completion, recovery, and delegation where applicable; explicit degradation and blocking limited to the protected scope.
- Operational behavior verified **only** where adapters/hooks are installed and there is evidence of allowed and denied outcomes through the actual invocation path; do not pretend the JSON package activates a runtime by itself.

### 5.4 Workspace, Access, and Security

- Project/workspace boundaries, `.priv`, separation of common/shared and runtime-owned state, protection against publication, persistent bindings, and activation pointers; no cross-project contamination.
- Shared context with provenance, immutability where required, supersession, preserved conflicts, validity/retention, and concurrency-safe writes (CAS or an equivalent mechanism): atomic rename alone does not prevent lost updates.
- Project switching; invalidation of dependent caches, identities, credential scopes, adoption state, and evidence.
- Project-scoped identity, effective actor, isolation of invocation configuration, and authorized credential references; no silent fallback to personal logins, credentials from other projects, or ambient configuration.
- Authentication, read, write, create/admin, signing/attribution, and signature acceptance assessed **separately where applicable**. Publicly reading a repository does not prove the runtime can write to `operations` using the selected credential.
- No raw secrets in operations records, contracts, reports, handoffs, or logs; secure reference handling, narrowly scoped human enrollment, and separate secret transfer when needed.
- No new OOP repository integrity/publication checks imposed on consumers in violation of `BOOT-04`. Maintainer validation of the source and package remains necessary within its own workflow.

### 5.5 Operations, Organizational Model, and Workflows

- The canonical `operations` repository distinct from project source, the OOP checkout, and `.priv`; four-state discovery: `found`, `confirmed_absent`, `inaccessible`, `unknown`.
- Provisioning only when absence is confirmed and authority is valid; local/remote binding; runtime read/write access through the correct credential/adapter; no duplicate creation following 403, ambiguous 404, or timeout.
- Foundational Organization Intake, source of truth/source of record, entity model, dependency graph, inventory, and English canonical language with localized output.
- Unstructured request intake, tickets, transition evidence, completion, Git-based atomic durability, and optimistic concurrency; no `completed` closure without verified or responsibly dispositioned consequences.
- Effective scope and impact propagation, organizational evolution, and physical-world limitations.
- Change sets, organizational CI/semantic compilation, controlled delivery, desired/applied/verified state, drift, compensation, and informed retries (a timeout **does not** imply that no effect occurred).
- Decision log, causal history and reconstruction over time, nonduplicative record management, and external interfaces.

### 5.6 Versions, Adoption, Migration, Handoff, and Recovery

- **Full Git commit ID + repository/ref** as the identity of a published OOP revision; do not universally require SemVer, signed tags, a release manifest, or dedicated release commits. Optional requirements depend on an explicitly selected policy.
- `source_snapshot` in the entry/evidence as **provenance of the source used by the producer**, not as a version manifest, proof of adoption, or a field that must automatically match the subsequent publication commit. Differences between the snapshot and HEAD are findings **only** when they violate actual traceability.
- Available, downloaded, compatible, target, applied, and verified states **separately tracked for each runtime**; update discovery and daily freshness do not certify the release or automatically adopt its rules.
- Organizational migration **separate** from runtime adoption; ownership under `scope: organization`/`scope: runtime`, read/write compatibility, a single canonical fact, and handling of concurrency, partial effects, and non-idempotency.
- Hard Continuity Reserve at **15% remaining only when the measurement is reliable and comparable**; no invented percentages.
- Handoff `requested/preparing/ready/delivered/destination_validated/accepted/resumed`: preparation is not delivery, and delivery is not resumption.
- Independent destination intake, source/target firewall, recovery without blind replay, current context, and verification of blocking paths upon resumption.

### 5.7 Producer Pipeline and Distribution Engineering

Examine the actual files, if present:

- `build_tools/generate-release.mjs` — generation from approved mappings, source identity checks, no gaps/overlaps, deterministic output;
- `build_tools/release-plan.mjs` and `build_tools/release-review.json` — reviewed semantic allocation, clauses/dependencies/facets;
- `build_tools/schema-profile.mjs` and `build_tools/schemas/contract.schema.json` — a declared **restricted** profile; do not attribute support for every JSON Schema feature to it;
- `build_tools/reference-engine.mjs` and its tests — a local reference engine, not an installable OOP runtime;
- `build_tools/release-engine.mjs` — contextualized package selection/assembly without provider effects;
- `build_tools/release.test.mjs` — tests against the actual package;
- `build_tools/accept-release.mjs` — acceptance and checks involving the frozen subject, baseline, and benchmarks;
- `build_tools/evidence/*` — results, traceability, baselines, and limitations tied to their respective subjects;
- `build_tools/candidate/*`, `build_tools/fixtures/*`, `export-candidate.mjs`, `record-evidence.mjs`, `benchmark.mjs` — **reference cases/historical artifacts**, not evidence of readiness for the complete distribution when documented as such.

Verify `REL-01`–`REL-11`, not merely by keyword but against their actual obligations: coverage and correctness, entry, JSON contracts, Core/modules, lifecycle, selective context, optional local predicates/adapters, interfaces, checkpoints, measured scenarios, evidence, and scope-specific readiness. Include `TEST-01`, `AGN-06`, and the current regression baseline, semantic delta, and documentation impact requirements. Do not impose Node.js, CEL, MCP, a policy engine, or a hosted service on consumers merely because they are used in maintainer testing.

**Important distinction:** a pipeline that verifies only regeneration of unchanged semantics **does not prove** it can accept a subsequent normative change. If the source and baseline differ, verify that actual semantic review, delta traceability, compatibility assessment, and regression checks are available; do not classify a source change as `generated_derived_only`/an empty delta to bypass checks. Distinguish an unsupported maintenance path, an explicitly disclosed limitation, and a false readiness claim. Every change to acceptance code must respect the principle that evidence applies to a stabilized subject.

### 5.8 Baselines, IDs, and Regressions

- Select the relevant **latest-prior verified baseline**, with immutable identity, provenance, scope, and the basis for its selection. If no previous complete distribution exists, use the preceding checkpoint only for its **actual scope**, and do not invent previously verified regressions.
- Earlier cumulative baselines are **supplemental**: they do not replace the latest verified baseline.
- Check semantic delta IDs, clause/contract IDs, module IDs, routing facets/references, `BOOT` steps, normative requirement IDs, and observation/test IDs actually present. Do not assume older `invariants/semantic/routing/schema` case categories exist as separate suites if they are absent.
- For each family: **total record count vs. unique ID count**, missing or duplicate IDs, IDs reused with different meanings, cross-file collisions, lost tests, lost coverage, and inconsistent ordering or references.
- Compare `total observations` vs. `unique observation IDs` **separately** for each suite, aggregated reports, and the global union; do not equate a reported count with proof of uniqueness.
- Positive, negative, unknown, fault/recovery, concurrency, and partial-effect tests; verify that a test fails in response to a relevant simulated defect, rather than merely containing language from a requirement.
- The scope of `release_ready` and of each observation must match exactly what the evidence establishes: source preservation, schema shape, fixtures, installed runtimes, providers, and cross-runtime behavior are **distinct** levels.

### 5.9 Cross-File Consistency, Metadata, and Stale Content

Verify that **the facts actually represented** are consistent across `PROMPT.md`, README, `examples.md`, `CHANGELOG.md`, the `dist` package, source allocation, review ledger, traceability, acceptance, TAP test results, fixture evidence, and maintainer guidance.

In particular, check:

- source snapshot identity, full commit, ref, artifact revisions, and identity references;
- `prepared_distribution`, `release_ready` and its scope, `publication`, runtime `adoption`, organizational migration, `not_performed`, `not_measured`, and limitations, without collapsing them into a single status;
- relative references from entry → routing → modules/details/procedures/interfaces, and source locators;
- editorial and documentation decisions that may be historical rather than current operational obligations;
- test, benchmark, baseline, and traceability identities and results: no report may attribute more to a test than it demonstrates;
- documentation/CTA: no links to removed entries, nonexistent files, prototypes presented as installable, or producer commands recommended to consumers.

**Do not insist on finding `current/` files, `release/` mirrors, manifests, or separate snapshots that are not part of the current repository tree.** If an old representation no longer exists and is not required, remove it from applicable checks rather than reporting an imaginary defect.

Search the repository for obsolete references, `TODO`, `FIXME`, placeholders, old statuses, candidate/fixture terminology, hardcoded versions, outdated procedures, vendor dependencies, and references to destructive operations. **Textual presence alone does not constitute a defect**: read the context. History, changelogs, examples, and explicitly identified prototypes may legitimately mention outdated terminology or procedures. It becomes a problem only when a current instruction, claim, or operational reference is false or misleading.

### 5.10 README, UX, and Communication

Read the project from a nontechnical user's perspective as well. Verify that users can understand:

- what OOP is, the problem it solves, and why it preserves continuity independently of any single AI;
- what happens during the first explicit installation, subsequent interactions, and the opening of a new workspace;
- what is stored in `operations` versus `.priv`, and why they are not interchangeable;
- when the AI can proceed autonomously, when credentials/permissions/human approval are needed, and how it must explain its actions;
- what the distribution claims, what is actually integrated, and **what it does not guarantee**;
- which inefficiencies/costs it can eliminate and which limitations, integrations, and potential costs remain;
- the practical meanings of installation, alignment, refresh, adopted versions, migration, handoff, and recovery;
- relevant examples involving digital or hybrid organizations, professionals, and individual projects, without treating those examples as additional rules.

Recommend corrections only for ambiguities that cause risk, cost, or misunderstanding. Do not add repetitive explanations or cosmetic documentation that increases consumer context load.

### 5.11 Context Economy, Benchmarks, and Free-First

- For each control/feature, assess setup cost, recurring cost, tokens, loaded files/bytes, model/tool calls, reads/assembly, latency, provider actions, human involvement, and maintenance, **where measured**.
- Examine the seven comparative scenarios if present: `fresh_install`, `enabled_workspace`, `ordinary_g0`, `authorized_durable_write`, `due_update`, `context_loss`, `interrupted_setup`.
- Distinguish **context bytes** from tokens, and local-engine latency from end-to-end latency; do not convert byte reductions into guaranteed monetary savings.
- Assess whether entry/selector/procedures and selected modules are actually included in the comparison; do not compare a subset against the full source using inequivalent baselines.
- Look for redundant full-context loading, excessively conservative routing, duplicated controls, repeated provider scans, reinstallation of unchanged hooks, duplicated reports, and local predicates that unnecessarily require an additional model call.
- Preserve **Zero-Cost Convergence / Free-First**: no mandatory cloud service, SaaS, pay-per-use API, external telemetry, database, policy engine, or platform without a normative justification and evaluation of adequate free/local alternatives. A free solution is not automatically adequate if it compromises security or reliability.
- For any optimization, assess **normative equivalence and coverage** first, measured effectiveness second, and cost last. Do not propose compression that drops rules or conditions.

### 5.12 Failure Modes and Negative Boundaries

Look for scenarios such as:

- a disabled hook, an uninstalled control, or an adapter invoking a different path from the one tested;
- user confirmation or an exit code being treated as proof of a successful effect;
- `unknown` converted to `false` or `true`; inherited permissions substituting for project-specific authority;
- personal credentials or credentials from another project being reused as a fallback;
- inaccessible `operations` mistaken for absent; duplicate creation;
- organizational migration repeated by a second runtime; a stale writer not blocked;
- concurrent writes causing lost updates; checkpoints confusing the last verified state with a partial attempt;
- a timeout after a real effect followed by a non-idempotent retry;
- a ticket/change set marked complete without verification of all consequences;
- handoff `ready` treated as already `resumed`; credentials included in the handoff package;
- compaction or workspace switching reusing stale context or authority;
- bootstrap asking for information it could discover, stopping before autonomous repair, or repeating installations;
- a test defect masked by a later rerun, final verification modifying the frozen subject, or test-suite expansion without justification;
- fixture tests, shape checks, or hash comparisons misrepresented as live/cross-runtime proof;
- benchmarks omitting part of the cost or documentation promising unmeasured savings.

Use negative experiments **only when reproducible and nondestructive**. For cases that cannot be exercised, record the risk and absence of evidence, not hypothetical success.

## 6. Classification, Marginal Cost, and Corrective Package

Classify every finding according to **the actual scope and declared guarantees**, avoiding inflated severity:

- **P0** — demonstrated violation or well-founded essential blocker involving normative correctness, security, authority, distribution reliability within its required scope, or a materially false compliance/readiness/publication claim.
- **P1** — verified technical defect with significant practical impact that merits correction in the same cycle before the final decision on the relevant subject.
- **P2** — justified, deferrable improvement; does not by itself warrant another costly cycle.
- **P3** — cosmetics/preferences/churn; generally do not act.

Also distinguish the finding's **origin**: `REGRESSION`, `PREEXISTING`, `INTRODUCED DURING MAINTENANCE`, or `ORIGIN UNDETERMINED`. This label **does not** lower priority.

Group findings into:

- **A. MUST FIX NOW:** only P0/P1 findings justified by evidence and scope;
- **B. SAFE TO DEFER:** P2/P3 items or documented nonblocking gaps;
- **C. DO NOT FIX / UNNECESSARY CHURN:** already compliant behavior, legitimate historical differences, false positives, requests for new infrastructure without demonstrated value, and duplicative rework.

For every fix, identify the **root cause**, files, minimum necessary change, dependencies, regression tests, expected outcome, and cost/benefit. When multiple findings share a cause, **combine them** into one coherent proposal. Avoid unnecessary force-pushes, history rewrites, regeneration, or commits; none of those operations is implicitly authorized.

Do not generically suggest new architectures, vendors, automations, dashboards, services, or additional cycles. Do not promise the "last defect" or a "perfect project." A new intervention is justified when the expected cost of leaving a significant defect uncorrected exceeds the cost of the fix and its verification, without compromising normative invariants.

## 7. Mandatory Final Verdict

Issue **exactly one decision** for the scope examined:

1. **SAFE TO FREEZE** — no P0/P1 findings within the scope actually verified, and no essential checks missing for the claims/scope you intend to assert. This does not mean absolute absence of bugs or untested live readiness.
2. **FIX ONCE, THEN FREEZE** — all reasonably detectable P0/P1 findings have been collected into a single package, with sufficiently defined corrections and regression checks. Freezing becomes permissible **only after** the fixes have been applied, relevant checks completed, and their results newly attested; do not assume the fixes have already succeeded.
3. **NOT READY TO FREEZE** — structural gaps, missing essential evidence, incompatibilities, or material uncertainties prevent a defensible conclusion about the requested scope, or a single verifiable corrective intervention cannot responsibly be defined.

The verdict applies to **the declared scope**: for example, `producer package`, `canonical source`, `publication`, and `installed consumer integration` may have different outcomes. Do not declare a producer package unready solely because it lacks a live adapter it does not promise; do not declare it ready for consumer integration merely because local tests passed.

## 8. Auditor Response Format

Write in a **practical, concise, evidence-based manner, with comprehensive check coverage**. Use exactly these sections:

### Verdict

One of the three decisions, **scope**, ref/full commit, concise result, and rationale. If repository visibility or access limits the verdict, say so immediately.

### P0/P1 Issues

Table: `ID | Severity | Origin | Defect and Cause | Practical Impact | Violated Requirement/Claim | Evidence and Files | Minimum Fix + Verification`. Show **all** confirmed findings, grouped by root cause and ordered by dependency. If there are none, write: "No P0/P1 issues found in the audit performed," adding any coverage limitations without implying absolute proof.

### P2/P3 Issues

Only those useful for decision-making. Explicitly distinguish **SAFE TO DEFER** from **DO NOT FIX / UNNECESSARY CHURN**; do not manufacture a cosmetic backlog.

### Regressions

Matrix: `requirement/delta | relevant baseline | check | expected/actual | status | evidence | limitation`, including preserved requirements and indirect effects. If no verifiable delta is available, state that rather than fabricating rows.

### Global Audit

Compact matrix of every domain in §5: canonical source; source-to-derived; contracts/schema; routing/closure; lifecycle/BOOT; runtime boundaries; workspace/security; operations; organizational workflows; adoption/migration/handoff; producer tests; baselines and IDs; cross-file metadata; docs/UX; costs/benchmarks; Free-First/vendor neutrality; stale text; failure modes. For each, provide `status | scope actually verified | reference | limitation`.

Also report `total observations`, `unique observation IDs`, pass/fail/not_performed counts, and whether tests were **rerun** or only read from persisted evidence. Distinguish counts of derived source clauses/modules from mere README expectations.

### Single Corrective Package

When P0/P1 issues exist, propose **one minimal coordinated sequence**: `cause → file/change → regression test → required evidence → success criterion`, grouping normative changes, derivation, documentation, and acceptance into a single cycle where safe. Do not make changes without authorization.

### Cost Impact

Explain **what avoids work**, **what still incurs cost**, any **actual vs. unmeasured** benchmarks, and whether another cycle is genuinely justified. Do not invent monetary amounts, tokens saved, model-call counts, or live performance figures.

### Residual Uncertainty

List all relevant checks with status `NOT VERIFIED`, `NOT VERIFIABLE IN THIS AUDIT`, or `NOT APPLICABLE`, distinguishing their cause, practical risk, and any evidence needed. Explicitly state when providers, installed runtimes, or cross-runtime scenarios **were not exercised**.

### Freeze Decision

Confirm **once** the selected verdict, its scope, and the **objective conditions** that make the conclusion valid; avoid promises of further audits that were not requested.

### Proposed Changes

End the audit report with a **bulleted list of all proposed fixes and improvements** arising from the analysis, including the errors, defects, and improvement opportunities identified. Consolidate overlapping suggestions and reference their finding IDs and priority/disposition so this list remains consistent with the findings and the single corrective package.

For each bullet, provide:

- **Audience and artifact:** identify whether the proposed change concerns human-facing documentation, maintainer documentation, AI runtime instructions/contracts, or documentation for users of the runtime. Include all applicable categories; for changes to code, tests, or evidence, name the artifact and its intended audience explicitly.
- **Proposed change:** a brief, concise, complete description of what you would change and why, identifying the affected files or sections.
- **Strengths and weaknesses:** briefly explain the expected benefits and the relevant drawbacks, costs, limitations, or tradeoffs. Distinguish measured outcomes from expectations.
- **Practical examples:** provide concise, concrete examples showing how the proposed change would affect an actual maintenance task, runtime behavior, or user interaction.

Keep each suggestion easy to evaluate without rereading the full report. Use plain language, preserve the established project constraints, and do not introduce unsupported recommendations merely to populate the list. If no changes are justified, state that explicitly rather than inventing suggestions.

## 9. Concluding Rule

The optimal result is neither a long wish list nor an endless sequence of small corrections. It is **the most complete and verifiable maintainer audit possible in this execution**, followed—only when needed—by **a single minimal, coherent intervention** addressing genuinely significant defects.

Before recommending another expensive cycle, act as though it were **the last round of meta-work the user intends to fund**: search aggressively for P0/P1 issues, scrutinize false positives, protect authority/security/semantics, and precisely disclose every limitation of the evidence.
