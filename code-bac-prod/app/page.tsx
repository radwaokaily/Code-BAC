import Link from "next/link";

const features = [
  ["📚","المنهج منظم","الفصول والدروس والأنشطة مرتبطة بخريطة المنهج."],
  ["💻","Coding Lab","تدريب عملي على كتابة الكود مع اختبارات وحالات مخفية."],
  ["📊","Data Lab","تطبيقات على جمع وتنقية وتحليل وتمثيل البيانات."],
  ["🤖","AI Lab","أنشطة تعليمية حول ML وDeep Learning وLLMs."],
  ["🎯","اختبارات","بنك أسئلة واختبارات ومحاكاة وتحليل نقاط الضعف."],
  ["👨‍👩‍👦","ولي الأمر","متابعة تقدم الطالب والدرجات والموضوعات التي تحتاج مراجعة."]
];

export default function Home(){
 return <main>
  <section className="hero"><div className="container">
   <span className="pill">Programming & Artificial Intelligence</span>
   <h1>اتعلّم البرمجة بجد،<br/>مش بالحفظ.</h1>
   <p className="muted">منهج منظم، شرح مبسط، تدريب تفاعلي، اختبارات وتحليل أداء — في منصة واحدة مصممة لطلاب البكالوريا.</p>
   <div style={{display:"flex",gap:10,marginTop:20}}><Link className="btn" href="/dashboard">ابدأ التعلم</Link><Link className="btn secondary" href="/login">تسجيل الدخول</Link></div>
  </div></section>
  <section className="container grid grid3">
   {features.map(([i,t,d])=><div className="card" key={t}><div style={{fontSize:30}}>{i}</div><h3>{t}</h3><p className="muted">{d}</p></div>)}
  </section>
  <section className="container" style={{marginTop:28}}><div className="card">
   <h2>طريقة التعلم</h2><p className="muted">تعلّم → طبّق → حل → خُد Feedback → اختبر نفسك → اعرف نقاط ضعفك → حسّن مستواك.</p>
  </div></section>
 </main>
}