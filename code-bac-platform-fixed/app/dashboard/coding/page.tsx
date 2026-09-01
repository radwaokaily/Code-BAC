 "use client";
import {useState} from "react";
export default function Coding(){
 const [code,setCode]=useState("function isEven(n) {\\n  // اكتب الحل هنا\\n}");
 const [out,setOut]=useState("");
 return <div><span className="pill">Coding Lab</span><h1>هل الرقم زوجي؟</h1>
  <div className="grid grid2">
   <div className="card"><h2>المطلوب</h2><p>اكتب دالة JavaScript تعيد true إذا كان الرقم زوجيًا وfalse إذا كان فرديًا.</p><p className="muted">لن يتم عرض كل حالات الاختبار.</p><button className="btn secondary" onClick={()=>setOut("تلميح: جرّب استخدام معامل %")}>تلميح</button></div>
   <div className="card"><textarea value={code} onChange={e=>setCode(e.target.value)} style={{width:"100%",minHeight:260,background:"#111827",color:"#fff",borderRadius:12,padding:16,fontFamily:"monospace",direction:"ltr"}}/><button className="btn" style={{marginTop:10}} onClick={()=>setOut("تم إرسال الحل إلى الـsandbox. اربط executor الحقيقي قبل الإنتاج.")}>Run / Submit</button>{out&&<p className="notice">{out}</p>}</div>
  </div>
 </div>
}