import Link from "next/link";
export default function Login(){
 return <main className="container" style={{maxWidth:520,paddingTop:70}}>
  <div className="card"><span className="pill">CODE BAC</span><h1>تسجيل الدخول</h1>
   <label>البريد الإلكتروني<input className="input" type="email" placeholder="name@example.com"/></label>
   <label>كلمة المرور<input className="input" type="password" placeholder="••••••••"/></label>
   <Link className="btn" href="/dashboard" style={{display:"block",textAlign:"center"}}>دخول تجريبي</Link>
   <p className="muted" style={{fontSize:13,marginTop:14}}>في النسخة الإنتاجية اربط النموذج بخدمة المصادقة وقاعدة البيانات.</p>
  </div>
 </main>
}