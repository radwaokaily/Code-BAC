 "use client";
import {useState} from "react";
export default function Checkout(){
 const [loading,setLoading]=useState(false),[msg,setMsg]=useState("");
 async function pay(){
  setLoading(true); setMsg("");
  try{
   const r=await fetch("/api/paymob/intention",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({amountCents:100000,orderId:"CODEBAC-DEMO-"+Date.now(),billing:{first_name:"Student",last_name:"Demo",email:"student@example.com",phone_number:"+201000000000"}})
   });
   const d=await r.json();
   if(!r.ok) throw new Error(d.error||"Payment error");
   setMsg("تم إنشاء عملية الدفع. اربط واجهة Unified Checkout/Hosted Checkout الخاصة بحساب Paymob بالـclient secret الذي عاد من الخادم.");
  }catch(e:any){setMsg(e.message)}
  finally{setLoading(false)}
 }
 return <div style={{maxWidth:650,margin:"40px auto"}}><div className="card"><span className="pill">Paymob</span><h1>اشتراك كود باك</h1><p className="muted">باقة تجريبية — 1,000 جنيه. السعر النهائي يُدار من قاعدة البيانات في النسخة الإنتاجية.</p><button className="btn" onClick={pay} disabled={loading}>{loading?"جاري التحضير...":"الدفع عبر Paymob"}</button>{msg&&<p className="notice" style={{marginTop:15}}>{msg}</p>}</div></div>
}