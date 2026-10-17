import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
// Vinext and Next generate different route type declarations in the same paths.
// Preserve Next's local declarations while building the optional hosting adapter.
const paths=['next-env.d.ts','.next/types/routes.d.ts'];
const originals=new Map(paths.filter(existsSync).map(path=>[path,readFileSync(path)]));
let status=1;
try {const result=spawnSync(process.execPath,['scripts/run-framework.mjs','build'],{stdio:'inherit'});if(result.error)throw result.error;status=result.status??1;}
finally {for(const [path,source] of originals)writeFileSync(path,source);}
process.exitCode=status;
