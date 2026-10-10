// Producer acceptance of this derived package only. Never a consumer command.
import { readFileSync,writeFileSync,readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { contextSession,select,readJSON } from './release-engine.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const hash=x=>`sha256:${createHash('sha256').update(x).digest('hex')}`;
const text=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const json=path=>JSON.parse(text(path));
const source=text('PROMPT.md').replace(/\r\n/g,'\n');
const trace=json('build_tools/evidence/release-traceability.json');
function subjects(){return files('dist').filter(x=>x.endsWith('.json')).concat([
  'PROMPT.md','build_tools/release-plan.mjs','build_tools/release-review.json','build_tools/generate-release.mjs',
  'build_tools/release-engine.mjs','build_tools/release.test.mjs','build_tools/accept-release.mjs',
  'build_tools/reference-engine.mjs','build_tools/reference-engine.test.mjs','build_tools/schema-profile.mjs',
  'build_tools/schemas/contract.schema.json','build_tools/evidence/release-traceability.json',
  'README.md','examples.md','CHANGELOG.md','build_tools/README.md',
]).sort();}
const identify=paths=>Object.fromEntries(paths.map(path=>[path,hash(readFileSync(new URL(`../${path}`,import.meta.url)))]));
const frozenIdentities=identify(subjects());
const git = args => spawnSync('git',args,{cwd:root,encoding:'utf8',maxBuffer:2*1024*1024});
// Find the latest committed accepted package, never silently choose an older one.
const acceptancePaths=['build_tools/evidence/release-acceptance.json','maintainer/evidence/release-acceptance.json'];
const history=git(['log','--format=%H','--',...acceptancePaths]);
if(history.status!==0)throw new Error('Cannot establish latest-prior regression basis');
let packageBaseline;
for(const recordCommit of history.stdout.trim().split('\n').filter(Boolean)){
  for(const path of acceptancePaths){
    const result=git(['show',`${recordCommit}:${path}`]);
    if(result.status!==0)continue;
    const report=JSON.parse(result.stdout);
    if(report.release_ready===true){packageBaseline={recordCommit,report,identity:hash(result.stdout)};break;}
  }
  if(packageBaseline)break;
}
const initialBaseline='8de5d1fb6efb865710c7750b65cff2a744a4c239';
const baselineCommit=packageBaseline?.report.source_snapshot_commit??initialBaseline;
const run=spawnSync(process.execPath,['--test','--test-reporter=tap','build_tools/reference-engine.test.mjs','build_tools/release.test.mjs'],
  {cwd:root,encoding:'utf8',maxBuffer:2*1024*1024});
const observations=[...run.stdout.matchAll(/^ok \d+ - ((?:REL-OBS|REL-PKG)-\d+): (.+)$/gm)].map(match=>({
  id:match[1],checked:match[2],expected:'isolated local assertion passes, including applicable designed negative controls',actual:'passed',
  tier:match[1].startsWith('REL-PKG')?'real_package_local_read_and_supplied_fact_model':'isolated_reference_fixture',
}));
const testPassed=run.status===0 && observations.length===55 && /^# fail 0$/m.test(run.stdout);
const previous=git(['show',`${baselineCommit}:PROMPT.md`]);
const priorSourceEqual=previous.status===0&&previous.stdout.replace(/\r\n/g,'\n')===source;
// This fixed checkpoint predates the directory rename.
const priorProof=git(['show',`${initialBaseline}:maintainer/evidence/local-validation.json`]);
if(priorProof.status!==0)throw new Error('No attributable preceding source validation checkpoint; establish a reviewed regression basis first');
const baselineProof=JSON.parse(priorProof.stdout);
const baselineIdentified=baselineProof.observations.length===30 && baselineProof.source_preservation_check.actual==='passed';
// This generation is derived-only. A changed canonical source needs explicit semantic
// delta/regression work; it must not be auto-approved as an empty-delta generation.
// Baseline coverage is explicitly source/fixture only, never a previously complete distribution/live release.
const overhead=Buffer.byteLength(text('dist/entry.json'))+Buffer.byteLength(text('dist/routing.json'));
const scenarios=[
  ['fresh_install','full_install',false,false],['enabled_workspace','interaction',true,false],
  ['ordinary_g0','information',false,false],['authorized_durable_write','durable_write',false,false],
  ['due_update','due_update',true,false],['context_loss','context_loss',true,true],
  ['interrupted_setup','interrupted_setup',true,true],
];
const measurements=scenarios.map(([id,facet,warm,loss])=>{
  const session=contextSession('benchmark-workspace','benchmark-runtime',trace.source_snapshot_commit);
  if(warm)session.load(select({classification:'known',request:['information']}));
  if(loss)session.loseContext();
  const before=session.metrics();
  return {id,facet,warm,loss,before,session};
});
// Measure only actual local selection/reads/assembly; no simulated remote/model counts.
for(const item of measurements){
  const start=performance.now();const result=item.session.load(select({classification:'known',request:[item.facet]}));
  const elapsed=performance.now()-start;
  const baseline=readFileSync(new URL('../PROMPT.md',import.meta.url),'utf8').replace(/\r\n/g,'\n');
  const procedureBytes=item.facet==='full_install'||item.facet==='interrupted_setup'
    ?Buffer.byteLength(text('dist/procedures/bootstrap.json'))+Buffer.byteLength(text('dist/procedures/lifecycle.json'))
    :['due_update','context_loss'].includes(item.facet)?Buffer.byteLength(text('dist/procedures/lifecycle.json')):0;
  Object.assign(item,{modules:result.modules,baseline_governing_bytes:Buffer.byteLength(baseline),
    selected_governing_bytes:overhead+procedureBytes+result.modules.reduce((sum,id)=>sum+Buffer.byteLength(text(`dist/modules/${id}.json`)),0),
    newly_read_module_bytes:result.loaded_bytes-item.before.loaded_bytes,module_file_reads:result.reads-item.before.reads,
    entry_selector_bytes:overhead,procedure_bytes:procedureBytes,local_selection_read_assembly_ms:elapsed,
    tokenizer_tokens:'not_measured',actual_model_calls:'not_measured',provider_actions:'not_performed',
    end_to_end_runtime_duration:'not_measured',monetary_cost:'not_measured',user_interventions:'not_measured'});
  delete item.session;delete item.before;
}
function files(path){return readdirSync(new URL(`../${path}`,import.meta.url),{withFileTypes:true}).flatMap(item=>
  item.isDirectory()?files(`${path}/${item.name}`):[`${path}/${item.name}`]);}
const identities=identify(subjects());
const subjectUnchanged=JSON.stringify(identities)===JSON.stringify(frozenIdentities);
const noByteRegression=measurements.every(x=>x.selected_governing_bytes<=x.baseline_governing_bytes);
const checks={source_preservation:priorSourceEqual?'passed':'failed',preceding_source_checkpoint:baselineIdentified?'passed':'failed',
  local_package_and_reference_tests:testPassed?'passed':'failed',measured_context_bytes:noByteRegression?'passed':'failed',
  frozen_subject:subjectUnchanged?'passed':'failed'};
const accepted=Object.values(checks).every(x=>x==='passed');
const report={
  observed_at:new Date().toISOString(),node_version:process.version,
  source_identity:hash(source),source_snapshot_commit:trace.source_snapshot_commit,
  scope:'producer-prepared technology-neutral derived distribution; no installed-runtime/provider/cross-runtime readiness claim',
  release_ready:accepted,publication:'not_performed_for_generated_package',runtime_adoption:'not_performed',checks,identities,
  semantic_review:{result:'reasoned_complete_allocation_with_verbatim_source_preservation',reference:'build_tools/release-review.json',
    evidence_strength:'source reasoning plus exact reconstruction; independent reviewer and live prevention not claimed'},
  rolling_baseline:{commit:baselineCommit,source_identity:hash(previous.stdout.replace(/\r\n/g,'\n')),
    package_checkpoint:packageBaseline?{commit:packageBaseline.recordCommit,content_identity:packageBaseline.identity}:null,
    provenance:packageBaseline?'Latest committed accepted producer-package report':'Committed local-validation.json and local-tests.tap: 30 prior reference observations and retained-source check; current push remote identity separately observed.',
    verified_scope:packageBaseline?packageBaseline.report.scope:'preceding committed canonical source retention and reference mechanisms only; not a complete previous distribution or installed integration',
    selection_basis:'Latest committed accepted package when available; otherwise initial preceding source checkpoint. This derived-only acceptance requires identical canonical source.',
    normative_deltas:[],classification:'generated_derived_only',full_previous_distribution:packageBaseline?'identified_checkpoint':'none_available_first_complete_export',
    limits:'No historical full release/integration verification is invented. These results establish current export preservation and local mechanisms only.'},
  observations,measurements,
  comparison_basis:'Same canonical source fully loaded versus selected real package closure including entry/selector and applicable procedure bytes. Cold/warm/recovery local harness; not a product end-to-end benchmark.',
  retained_requirements:trace.clauses.map(x=>({id:x.contract,disposition:'preserved_verbatim',source_identity:x.content_identity,artifact:x.artifact})),
  impact:{README:'affected: official structured entry after local package acceptance',examples:'affected: actual package and limits',
    maintainer_guidance:'affected: reusable reviewed generation and producer acceptance',schemas:'existing contract profile applied to all source contracts',
    tests:'25 new package checks retain 30 historical observations',generated_artifacts:'complete current-source export with explicit semantic bindings',
    release_evidence:'current exact subjects, scope-bound verdict and seven measured local scenarios'},
  limitations:{installed_runtime:'not_performed: no native adapter is shipped or claimed installed',provider_execution:'not_performed: no credentials or provider effects used',
    cross_runtime:'not_performed: technology neutrality reviewed, real product interoperability not claimed',
    general_json_schema:'not_claimed: only declared restricted profile validated',token_or_money_savings:'not_claimed',
    formal_semantic_judgment:'not_claimed: source-qualified semantic conditions remain complete clauses'},
};
writeFileSync(new URL('./evidence/release-tests.tap',import.meta.url),run.stdout);
writeFileSync(new URL('./evidence/release-acceptance.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
if(!accepted){process.stderr.write(JSON.stringify(checks)+'\n'+run.stderr);process.exitCode=1;}
else process.stdout.write(`Producer package accepted: ${observations.length} local observations, seven real-package scenarios; consumer integration and publication not claimed.\n`);
