const base=(process.env.JUDGE0_URL||"https://ce.judge0.com").replace(/\/$/,"");
const token=process.env.JUDGE0_AUTH_TOKEN;

const langIds:{[k:string]:number}={javascript:Number(process.env.JUDGE0_JS_ID||63),python:Number(process.env.JUDGE0_PYTHON_ID||71),cpp:Number(process.env.JUDGE0_CPP_ID||54)};
function headers(){return {"Content-Type":"application/json",...(token?{"X-Auth-Token":token}:{})};}
export async function runCode(language:string,source:string,input:string,expected?:string){
  const language_id=langIds[language]; if(!language_id) throw new Error("Unsupported language");
  const create=await fetch(`${base}/submissions?base64_encoded=false&wait=false`,{method:"POST",headers:headers(),body:JSON.stringify({language_id,source_code:source,stdin:input,expected_output:expected??null,cpu_time_limit:2,wall_time_limit:5,memory_limit:128000,enable_network:false})});
  if(!create.ok) throw new Error(`Judge0 create failed (${create.status})`);
  const {token:submissionToken}=await create.json();
  for(let i=0;i<30;i++){
    await new Promise(r=>setTimeout(r,400));
    const r=await fetch(`${base}/submissions/${submissionToken}?base64_encoded=false`,{headers:headers(),cache:"no-store"});
    if(!r.ok) continue;
    const result=await r.json();
    if(result.status?.id>2) return result;
  }
  throw new Error("Execution timed out waiting for Judge0");
}
export function normalizeOutput(s:string|null|undefined){return (s??"").replace(/\r/g,"").trim();}
