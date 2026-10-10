// Maintainer-only reference mechanisms. Never install or invoke as bootstrap tests.
// These functions operate on supplied facts; they perform no effects or authority discovery.
const STATES = new Set(['verified', 'reused_verified']);

export function closure(catalog, selected) {
  if (!Array.isArray(selected) || !selected.length) throw new Error('Missing selection');
  const byId = new Map();
  for (const item of catalog) {
    if (typeof item.id !== 'string' || !item.id || !Array.isArray(item.dependencies)
      || item.dependencies.some(x => typeof x !== 'string' || !x)) throw new Error('Malformed module');
    if (byId.has(item.id)) throw new Error(`Duplicate identity: ${item.id}`);
    byId.set(item.id, item);
  }
  const active = new Set(), done = new Set();
  function visit(id) {
    if (active.has(id)) throw new Error(`Dependency cycle: ${id}`);
    const item = byId.get(id);
    if (!item) throw new Error(`Unknown dependency: ${id}`);
    if (done.has(id)) return;
    active.add(id);
    for (const dependency of [...item.dependencies].sort()) visit(dependency);
    active.delete(id);
    done.add(id);
  }
  for (const id of [...new Set(selected)].sort()) visit(id);
  return [...done];
}

export function route(catalog, routes, facts) {
  if (!['known', 'unknown'].includes(facts.classification)) throw new Error('Unknown classification');
  for (const key of ['request', 'action', 'state', 'risk', 'authority', 'recovery']) {
    if (facts[key] !== undefined && (!Array.isArray(facts[key]) || facts[key].some(x => typeof x !== 'string' || !x))) {
      throw new Error(`Invalid facets: ${key}`);
    }
  }
  const facets = new Set([
    ...(facts.request ?? []), ...(facts.action ?? []),
    ...(facts.state ?? []), ...(facts.risk ?? []),
    ...(facts.authority ?? []), ...(facts.recovery ?? []),
  ]);
  const selected = new Set();
  for (const facet of [...facets].sort()) {
    if (!Object.hasOwn(routes.facets, facet)) throw new Error(`Unresolved facet: ${facet}`);
    for (const id of routes.facets[facet]) selected.add(id);
  }
  if (facts.classification === 'unknown') {
    for (const id of routes.conservative) selected.add(id);
  }
  const modules = closure(catalog, [...selected]);
  return { modules, classification_resolved: facts.classification === 'known',
    requires_independent_admission: true, authority_granted: false };
}

export function assemble(catalog, ids) {
  const ordered = closure(catalog, ids), byId = new Map(catalog.map(x => [x.id, x]));
  const contracts = new Map();
  for (const id of ordered) {
    for (const contract of byId.get(id).contracts) {
      const prior = contracts.get(contract.id);
      if (prior && JSON.stringify(prior) !== JSON.stringify(contract)) {
        throw new Error(`Conflicting contract: ${contract.id}`);
      }
      contracts.set(contract.id, contract);
    }
  }
  return [...contracts.values()].sort((a, b) => a.id.localeCompare(b.id, 'en'));
}

export function evaluateGuard(guard, facts) {
  // Explicit three-valued result; never use JS truthiness for evidence or authority.
  if (!guard || typeof guard !== 'object' || Array.isArray(guard) || Object.keys(guard).length !== 1) {
    throw new Error('Invalid guard');
  }
  if (Object.hasOwn(guard, 'fact')) {
    if (typeof guard.fact !== 'string' || !guard.fact) throw new Error('Invalid fact');
    const value = Object.hasOwn(facts, guard.fact) ? facts[guard.fact] : undefined;
    if (value === true) return 'true';
    if (value === false) return 'false';
    return 'unknown';
  }
  if (Object.hasOwn(guard, 'all')) {
    if (!Array.isArray(guard.all) || !guard.all.length) throw new Error('Empty guard');
    const values = guard.all.map(x => evaluateGuard(x, facts));
    if (values.includes('false')) return 'false';
    return values.includes('unknown') ? 'unknown' : 'true';
  }
  throw new Error('Unsupported guard');
}

export function transition(procedure, state, target, facts) {
  if (new Set(procedure.states).size !== procedure.states.length) throw new Error('Duplicate state');
  const edges = new Set();
  for (const item of procedure.transitions) {
    if (!procedure.states.includes(item.from) || !procedure.states.includes(item.to)) throw new Error('Undefined transition state');
    const key = JSON.stringify([item.from, item.to]);
    if (edges.has(key)) throw new Error('Ambiguous transition');
    edges.add(key);
  }
  if (!procedure.states.includes(state) || !procedure.states.includes(target)) throw new Error('Unknown state');
  const edge = procedure.transitions.find(x => x.from === state && x.to === target);
  if (!edge) return { state, status: 'denied', reason: 'transition_not_defined' };
  const result = evaluateGuard(edge.guard, facts);
  return result === 'true' ? { state: target, status: 'eligible_transition', authority_granted: false }
    : { state, status: result === 'unknown' ? 'pending' : 'denied', reason: result };
}

export function invalidated(items, changedDependencies) {
  const changed = new Set(changedDependencies), affected = new Set();
  let progress = true;
  while (progress) {
    progress = false;
    for (const item of items) {
      if (!affected.has(item.id) && item.validity_dependencies.some(id => changed.has(id) || affected.has(id))) {
        affected.add(item.id); progress = true;
      }
    }
  }
  return [...affected].sort();
}

export function reusable(item, current) {
  if (!STATES.has(item.status)) return false;
  if (item.workspace !== current.workspace || item.runtime !== current.runtime) return false;
  return item.validity_dependencies.every(id =>
    Object.hasOwn(item.observed, id) && Object.hasOwn(current.observed, id)
    && item.observed[id] === current.observed[id]);
}

export function operationsAccess(observation) {
  const required = ['expected_workspace', 'expected_repository', 'expected_credential', 'expected_adapter'];
  if (required.some(key => typeof observation[key] !== 'string' || !observation[key])) return 'unknown';
  for (const dimension of ['workspace', 'repository', 'credential', 'adapter']) {
    if (!observation[dimension]) return 'unknown';
    if (observation[dimension] !== observation[`expected_${dimension}`]) return 'false';
  }
  return evaluateGuard({ all: [{ fact: 'read_verified' }, { fact: 'write_verified' }] }, observation);
}

export function releaseVerdict(evidence) {
  const results = { ...evidence.required_results };
  if (evidence.coverage_complete !== true) results.coverage = 'pending';
  if (evidence.status !== 'prepared') results.subject = 'candidate';
  if (!Object.keys(evidence.required_results).length) results.required_checks = 'missing';
  if (evidence.efficiency_regression === true && evidence.regression_disposition !== 'authorized_justified') {
    results.efficiency = 'failed';
  }
  return { ready: Object.values(results).every(x => x === 'passed'), results };
}
