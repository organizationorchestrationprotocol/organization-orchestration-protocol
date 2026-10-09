# OOP - Organization Orchestration Protocol

Let your project adopt OOP by copying this instruction into your AI tool:

```text
Clone https://github.com/organizationorchestrationprotocol/organization-orchestration-protocol.git into your main working folder and follow dist/README.md.
```

## What OOP is

**The AI is replaceable. Your organization is not.** OOP supports long-lived work with AI without making your company, project or professional activity depend on one chat, one model, one vendor or one AI's memory.

**OOP keeps your project from living only inside one AI's memory. It preserves the information needed to continue the work in a <ins>standardized, programmatic and formally verifiable way</ins>, reduces unnecessary rework, and lets another compatible AI pick up where the previous one stopped.**

It becomes useful when AI work stops being only a conversation and starts becoming ongoing organizational work.

OOP is a vendor-neutral operating protocol telling capable AI tools how to work on a long-lived project in a durable, verifiable and resumable way. It applies to companies, non-profits, independent professionals and autonomous projects.

**The 60-second explanation:** You tell the AI what you want. OOP provides rules and reference artifacts that help it determine which project it is in, which rules matter, what it may change, what must be verified and what must be preserved so another AI can continue later.

**Where time and money may be saved:** OOP reduces organizational friction and avoidable AI-work cost. It can reduce time spent re-explaining a project, duplicated work across sessions or tools, mistakes from lost or stale context, avoidable rollback and rework, and human time spent reconstructing decisions, responsibilities and current state. Keeping work portable reduces dependence on one AI vendor. Free-First / Zero-Cost Convergence can also avoid unnecessary SaaS and cloud spending; OOP does not directly generate profit or guarantee savings.

OOP prefers capabilities you already have, local tools and free/open infrastructure before introducing paid services. It asks only for unavoidable meaningful decisions, remembers valid approvals for their exact scope and resumes authorized work after checking your answer. You do not need to choose cryptographic algorithms or automation internals; required identity and safety checks still apply. Real-world time and cost savings require observation.

**For example:** After three months with AI Tool A, you hit usage limits, change your subscription, prefer another tool or find Tool A unavailable. Without durable project state, you may have to rebuild the context, decisions, architecture, open work and constraints by hand. With OOP, AI Tool B reconstructs what it needs from durable project sources, verifies its own access and compatibility, and continues without depending on Tool A's chat memory. This can avoid hours of manual reconstruction and duplicated work; any benefit depends on the actual project and runtime.

### When OOP is useful

OOP helps when one or more of these describe your work:

- Work continues beyond one conversation, over days, weeks or months.
- Several AI tools contribute, or you want to change tool or vendor without rebuilding the project context manually.
- Decisions and approvals need to survive chat history and remain reconstructible for another human or AI.
- AI can make real changes to repositories, infrastructure or external systems, and verified progress needs to be distinguishable from plans and attempts.
- Session or context limits may interrupt active work, leaving a later session to continue.

### When you probably don't need OOP

One-off factual questions, translation, disposable brainstorming or a single draft or email with no durable state normally need little of this machinery. The same applies to tasks with no meaningful continuation or external consequence. OOP becomes relevant when the work itself needs to survive the conversation.

### Without OOP / With OOP

This compares chat-only work with work applying OOP; other workflows can also provide durable state and controls.

| Without OOP | With OOP |
| --- | --- |
| The chat may be the working memory | The project has durable state outside the chat |
| Decisions may live only in conversation history | Decisions and accountable state remain reconstructible |
| "Done" may blur plans, attempts and results | Desired, attempted, applied and verified remain distinguishable |
| Changing AI can require rebuilding context | Another capable, authorized and compatible AI can resume from durable state |
| Each AI may reconstruct the project differently | AI tools use the same protocol and canonical project state |
| Context exhaustion can break continuity | Continuation is prepared before the session becomes unusable |

### The core concepts

```text
OOP        = how AI is expected to operate
operations = what the organization knows, has decided and is doing
.priv      = private technical/runtime state for this project
AI runtime = a replaceable worker, with its own capabilities and authority
```

The detailed [Where truth lives](#where-truth-lives) table below distinguishes these sources and their authority.

### See OOP in action

**Company:** "Launch a commercial offering." OOP helps a capable AI account for relevant work, dependencies, approvals, authorized execution and verification instead of treating the request as one isolated task.

**Independent professional:** "Deliver this client engagement." Decisions, deliverables, blockers and verified progress remain reconstructible across sessions.

**Independent project:** "Turn this idea into a usable product." Process and infrastructure stay proportionate while the project preserves durable work state.

**[Explore practical examples →](examples.md)** for concrete prompts and fuller workflows, including hybrid organizations.

### The problem OOP solves

**AI sessions are temporary. Organizations are not.** Decisions, state, evidence, repository identity, authorization context, verification, next actions and handoff/recovery context need to survive outside the chat. Another human or AI should be able to understand what happened and continue without the original conversation.

### What changes after adopting OOP

A capable AI can recover durable project state, understand work already in progress, identify relevant scope and dependencies, and determine what it is allowed to do. It preserves material decisions and accountable work, distinguishes attempted actions from verified outcomes, and leaves a continuation point for a later session or another compatible AI without rebuilding the project from scratch.

### Context-independent governance

**The AI must not behave correctly only because it happens to remember the right rules from earlier in the chat.**

Under OOP, semantic judgment may depend on AI reasoning, but neither governance execution nor the availability and freshness of the normative context required for that judgment may depend on the AI remembering it.

Governance correctness must not depend on accidental conversation-context retention.

Conversation context is an execution cache, not a source of normative authority. Reopening an old chat, replacing a model or compacting context does not automatically preserve the right rules. The AI verifies current OOP and reloads only the missing or stale rules and facts it needs before continuing.

### What using OOP looks like

Where supported, a verified runtime can assemble small, up-to-date instructions for the current action from OOP and authoritative project state, while independently checking what effects the AI is actually permitted to perform. This reduces reliance on remembered chat context without pretending AI reasoning becomes deterministic. The runtime can reject unauthorized effects and verify outcomes through its real controls; unsupported paths and remaining semantic uncertainty must be disclosed. Unchanged verified rules and evidence are reused rather than rebuilt for every step.

You describe the outcome you want. A sufficiently capable, authorized AI checks the project and current rules, recovers relevant decisions and open work, performs and verifies the work, and preserves what another compatible AI needs to continue.

A reopened chat follows the same checks. The project's saved state carries continuity; remembering an earlier conversation does not establish that its rules are current.

### Governance follows the real effect

OOP does not apply the same process to every task. Asking a question should stay simple. Changing production infrastructure calls for stronger controls.

**Maximum rigor with minimum ceremony.** Governance follows effective scope, risk and material consequences. A domain change may also require DNS, TLS, OAuth, email and monitoring work. G0–G4 define minimum controls; a level never grants authority. Small authorized reversible remote branch writes may stay G1: network transport alone does not make them controlled publication. Release publication, deployments and critical operations need their applicable stronger gates. Load required governance before effects; splitting a risky operation into subtasks cannot remove its safeguards.

### Evidence

```text
desired ≠ approved ≠ attempted ≠ observed ≠ applied ≠ verified
```

For example, an AI running a deployment command does not prove that production is healthy. OOP keeps the attempted action, observed result and verified outcome distinct.

A successful command does not automatically prove the desired outcome. Evidence Compression reuses one durable authoritative object for the facts it actually proves. A PR can establish approval, CI and merge; production deployment still needs its own verification. Keep a minimal identified projection when portability, volatility, history or recovery requires it. Fresh material and verified claims need attributable observation time, checked identity, expected/actual result and a usable verification basis; lightweight work keeps lightweight references.

### Where truth lives

| Location | Contents and authority |
| --- | --- |
| `PROMPT.md` | Sole normative OOP authority |
| README and examples | Non-normative explanations and illustrations |
| Derived artifacts | Distribution generated from canonical authority |
| Release evidence | Verified observations and provenance, never new semantics |
| Consumer `operations` | Canonical organizational knowledge, policies, decisions, accountable work state and history |
| Project consumer `.priv` | Private technical coordination for one project/workspace; authorized runtimes share only within that verified scope |
| Runtime-specific `.priv` | Tool-specific execution data and independent adoption checkpoints |

`operations` is the organization's documentary and operational brain. It contains tool-independent knowledge and state, or references to authoritative sources of record. It supports analysis, decisions and authorized execution with verified outcomes. Tool integrations, secrets and runtime configuration stay private. Free, open, local and portable solutions are preferred when adequate.

### Project isolation and every-interaction governance

```text
Project A: operations + .priv + project-local OOP/runtime state
Project B: operations + .priv + project-local OOP/runtime state
Project-local private/runtime state never crosses the boundary.
```

Each consumer project/workspace has its own logical private root, canonical operations state and OOP checkout. Runtimes can share project-private resources only within the same verified workspace. A project-agnostic global sentinel discovers current-workspace governance without carrying project state; supported runtimes apply the lightweight current-OOP gate on every interaction, reusing valid same-day context. Old chats receive no exemption.

Durable Git-backed ticket openings and state transitions are signed, signature-verified, pushed immediately and read back from the canonical remote before they are reported as canonical success. Users are notified when a ticket opens, at each state transition and when publication is blocked.

As a human, you do not need to learn the full protocol before using it. Start with the CTA above and describe the outcome you want. OOP is designed primarily for the AI runtime to read and apply. Use the [practical examples](examples.md) to understand the workflow in concrete terms.

## For AI tools using OOP

### First-time Setup Notice

The first time OOP is used with a new AI tool or environment, the AI may need to set up and verify local automatic controls. This initial setup can require more work than normal project use. When those generic capabilities remain valid, later OOP projects in the same compatible environment should reuse them instead of rebuilding them. You normally do not need to understand or configure hooks, callbacks or validators; the AI should ask only when a genuinely human-only action is required. Incomplete setup alone is not a blocker: actionable work continues automatically.

For example, Project A can establish the generic controls once. Project B checks that they still work, then establishes its own isolated binding, adoption and project checks. B never inherits A's operations, private state or authority. A second workspace alone does not repeat the first-time notice.

OOP is a research and development protocol/specification, provided **AS IS** under its license. Third-party AI runtimes and models are outside OOP's control: they can misinterpret instructions, stop prematurely, misclassify states or implement an integration incorrectly. Deterministic controls where available, evidence and verification reduce risk; they cannot eliminate all errors or guarantee third-party behavior, absolute protection, profit or savings.

**What happens after adoption:** A sufficiently capable AI identifies the current project/workspace, verifies current OOP, reconstructs relevant durable state and determines which rules apply. It materializes and validates its applicable controls, checks whether it can provide full OOP governance, performs and verifies authorized work, and leaves the project resumable by another compatible authorized AI. This is explanatory orientation, not a second bootstrap specification.

Use exact context-integrity evidence and the Semantic Routing Index; reroute at interaction, pre-effect, state changes, recovery and completion. Establish suitability before claiming full governance. Establish your own verified adoption and applicable context before governed work.

### Context and applicable controls

A control is verified only through its real installed invocation path, with observed allowed and denied actions. A passing isolated script is insufficient if the runtime launches it differently. Missing mandatory coverage stops dependent actions; the AI can continue independent safe work and must explain the gap. OOP specifies these outcomes without requiring a particular key type, shell or AI product.

OOP is a self-materializing governance protocol: it defines what must be true, while the active environment discovers capabilities, derives and installs its strongest applicable controls, validates them and refreshes them when OOP or the environment changes. Native deterministic, external deterministic, persistent semantic and transient semantic enforcement describe actual guarantees; residual gaps remain explicit. Actual access and authority still determine executable actions.

The compact **Semantic Routing Index** is derived metadata bound to the adopted OOP repository commit. Requests, planned and actual actions, state, risk, authority and recovery contribute a conservative union of facets; module selection and dependency closure then follow deterministically. A local edit that becomes a push loads repository rules before the push. If it becomes a deployment, execution and verification rules join before deployment. Completion repeats routing against what actually happened.

Full OOP Runtime Suitability requires verified interception at applicable project/session/resume/interaction, pre-effect, post-effect, completion and context-recovery paths, durable private state, local validation and any required operations/delegate controls. Native or external deterministic mechanisms can qualify. A tool without necessary per-interaction or completion blocking is not sufficiently capable to implement OOP in full. It reports missing capabilities, practical consequences and usable limited scope; semantic fallback is not full enforcement. A previously verified control that disappears invalidates dependent readiness: repair and revalidate, or block and disclose it. No silent governance degradation is allowed.

### Entry, refresh and continuation

The first authorized successful bootstrap can establish a persistent non-secret workspace binding in the discovered shared private area. A supported runtime installs/verifies a minimal activation pointer to that binding and the current verified bootstrap. OOP is bound to the workspace, not to the lifespan of a chat; binding does not establish any runtime's adoption.

New chats, reopened old chats, recovery and runtime re-entry resolve the binding, reuse or obtain due freshness, establish their own verified adoption/context, reconcile relevant private and canonical facts, and show a compact localized alignment attestation before substantive work. Old conversation memory cannot prove current alignment. Future rules flow through verified adoption and realignment, rather than copied static instructions. The attestation distinguishes remote freshness, adoption/content identity, shared private state, owned runtime state, activation health, canonical operations, migration disposition and request route—even when no update exists.

Persistent project instructions, workspace memory and startup interception are possible integration capabilities. OOP requires no particular instruction file or event API. Unsupported entry paths require explicit limitations and usable recovery instructions; this specification does not claim every product automatically activates every historical chat.

```text
user request → AI bootstrap → discover organization/runtime/protocol/work
→ load relevant rules → work → persist state/evidence when needed
→ verify material outcomes → continue or hand off
```

Full first environment bootstrap covers private workspace protection, authentication, project and operations access, current OOP instructions, capabilities, materialization and a scoped PASS/FAIL attestation. Later refresh compares identities and repairs only changed components. Current canonical OOP prevails over conversation history; copied configurations are disposable derived state.

Minimum Safe Bootstrap identifies enough trustworthy context to begin. Progressive Bootstrap expands that context when work needs additional rules, capabilities or authority. An analysis can finish with a useful response; a small reversible correction can use an inspected diff and existing Git evidence. Meaningful features account for dependencies; production or critical effects require stronger controls.

Continuity is proactive rather than reactive. When a runtime can reliably measure remaining usable active-session capacity, OOP preserves room to persist state and prepare continuation before the session becomes unusable. A reliable comparable remaining usable budget of **15% or less** triggers the Hard Continuity Reserve: stop new non-essential work, warn the user and prepare verified continuation. Without a reliable comparable metric, use explicit exhaustion signals without inventing percentages. The source packages work for an unknown future AI without raw secrets; the destination independently bootstraps, filters resources, resolves credentials and verifies the next permitted action before resuming.

### Organization and private topology

On first adoption, the AI discovers organizational facts before asking only material unresolved questions. An empty operations repository undergoes Foundational Organization Intake, with domain coverage recorded as verified, partial, unknown or deferred and supported by canonical references rather than an invented percentage. Identity, mission, roles, processes, assets and operational status are modeled when relevant.

Each project keeps separate operations, private state and identity even on the same computer/account. Same-project runtimes can share purpose-named credentials and topology references; adapters and adoption remain runtime-owned. Legacy vendor-named shared resources are classified and preserved without blind renaming. Product/source repositories, operations and OOP are distinct references; if the required source reference is missing, the AI asks once for its address.

### Repository bootstrap

The official full install requires operations readiness. For other work, when durable repository persistence or integration becomes necessary, resolve provider/instance and namespace, then discover the intended canonical repository. Distinguish `found`, `confirmed_absent`, `inaccessible` and `unknown`: failed discovery is not absence. Reuse existing operations; create private operations only when required, confirmed absent and authorized. Verify identity, private visibility, control, access and canonical local/remote binding before writes. A missing checkout never justifies another remote repository. The contract supports APIs, connectors, CLIs and equivalents without a mandatory host or transport.

### Repository access and credentials

Use an identity explicitly authorized for this project, destination and operation. A personal login that happens to work is not project permission. The AI isolates inherited settings, verifies the effective actor and keeps authentication, write permission, attribution and required signing separate. If enrollment genuinely needs you, it first completes safe preparation, shows only public enrollment information and explains the exact next step. It never substitutes another project's credential after denial.

Discover and reuse the authorized canonical private credential source before acquisition. A new runtime, vendor-named key or unconfigured adapter does not justify credential duplication or rotation. Configure the active adapter and verify its own required access. Authentication, read, write, commit signing and tag signing remain separate facts and purposes. Optional credential-reference and repository-access profiles contain non-secret metadata and secure references, never raw secrets.

### Continuity across AI tools

`prepared ≠ delivered ≠ accepted ≠ resumed`. A ready package proves preparation; observed destination acknowledgment and verified first action prove later facts.

```text
AI A starts → state and evidence persist → AI B resumes → AI C can verify
```

A formal handoff preserves effective scope, decisions, governance, authorization, blockers and the next permitted action. Preparation, delivery, destination validation, acceptance and verified resumption remain distinct; a generated package proves no destination action. Recovery inspects actual effects before retrying and keeps previous verified checkpoints separate from partial or uncertain work.

### Repository-dependent handoff

Use the same optional repository-access profile or equivalent authoritative references to preserve canonical identity/endpoint, required capabilities/permissions and credential purposes. Shared-root destinations reuse secrets by reference; separate roots/machines use path remapping and a separate authorized secure transfer only when necessary. Normal handoff/recovery excludes raw keys, tokens, passwords, cookies and decryption secrets.

The destination verifies its own binding, required access and signing. Reconcile remote/credential mismatches before writes. Historical/lightweight strings remain readable; new material `destination_validated`, `accepted` or `resumed` continuation needs verified structured access or an authoritative structured pointer with resolved facts and attributable destination resolution checks. Schema validity cannot prove those facts.

### Independent runtime adoption

`available ≠ downloaded ≠ compatible ≠ target ≠ applied ≠ verified`. A downloaded release is not active; a selected target grants no execution authority.

Each runtime owns its verified adoption checkpoint and distinguishes available, downloaded, compatible, target, applied and verified versions. A shared checkout, shared credentials or another runtime's adoption does not establish that runtime's own adoption. Only successful applicable verification advances the checkpoint; failed attempts preserve prior verified knowledge and record actual partial effects separately.

### Organizational migration

Canonical organizational migration is separate from runtime adoption. Records belong in operations or its authoritative source of record; no global organizational version counter is required. Evaluate scoped read and write compatibility independently before version-sensitive access. A runtime may safely analyze while writes wait. Joining runtimes verify already-applied organizational effects and complete remaining local actions without blind replay. Partial failure blocks unsafe scope/dependencies while independent safe work continues. Preserve or grandfather historical facts under explicit policy; recovery and concurrent non-idempotent effects require their applicable authority and verification.

### Shared private coordination

Discover existing private layouts and shared references. Shared records are append-oriented, normally immutable, with explicit supersession and conflict-safe metadata/CAS updates. Preserve concurrent conflicts and active referenced chains; atomic rename alone does not prevent lost updates. Check scope, provenance and freshness. Hints cannot replace operations, explicit user instructions, approval or verified facts. Personal preferences remain in authorized global instructions outside repositories.

### Daily freshness

At the first user prompt of each day, use the user's timezone and shared same-day success/failure evidence to check configured OOP freshness with bounded synchronization. Preserve local work and failures; stop on quota/access/conflict instead of retrying. No scheduler or background polling is required. Re-enter bootstrap and selectively realign owned instructions, caches and loaded rules against the runtime's verified identity; synchronization alone is not adoption.

Each AI tool identifies OOP by the full Git commit hash of its configured repository revision. Comparing the observed remote commit with the local commit and checking for local protocol changes establishes synchronization; each tool separately records its verified adopted commit. Offline remote freshness remains unknown. No distribution manifest is needed, and commit equality alone does not prove verified adoption.

### Default first installation

The instruction above requests full setup: the AI prepares private local state, resolves your project source, reuses authorized access, connects or legitimately creates private operations, and installs/tests the controls its environment supports. It asks only at a genuine missing dependency, such as your source address or provider-only key enrollment. It resumes after checking the actual result.

## For AI tools maintaining this repository

[PROMPT.md](PROMPT.md) is the **Canonical Normative Prompt** and single source of organizational norms. Read it completely before normative changes, including tables, examples, exceptions and unnumbered material.

Normative edits start in the source. Derive Core and on-demand modules from complete semantic analysis, with no fixed parser, heading-to-module table or required programming runtime. Reassess module/schema sets, dependencies, routing, bidirectional traceability, migration, validation and permanent regression coverage.

Reuse valid freshness evidence during bounded upstream synchronization; preserve local work. Persist English content and localize interaction to the user's language. This README provides orientation; the canonical source defines the protocol.

### Publishing an OOP revision

OOP revisions are identified by their full Git commit IDs. Review and validate changes before publishing them to the configured repository. Assess compatibility and any migrations required for runtime adoption.

### Formats and license

Uppercase normative keywords follow canonical BCP 14 conventions. Licensed under [Apache-2.0](LICENSE), copyright 2026 Marco Vasapollo; see [NOTICE](NOTICE). The license covers the specification, documentation, schemas, machine-readable artifacts and examples.