 "use client";
import {useMemo, useState} from "react";
import exerciseData from "@/data/curriculum_exercises.json";

const lessons = [
 ["1-1","تطور تكنولوجيا المعلومات والتحول الاجتماعي"],
 ["1-2","كيف يعمل الذكاء الاصطناعي"],
 ["1-3","الذكاء الاصطناعي في الحياة اليومية والصناعة"],
 ["1-4","القضايا الأخلاقية للذكاء الاصطناعي"],
 ["2-1","تقنيات التشفير والمصادقة"],
 ["2-2","تصميم أمن الشبكات"],
 ["2-3","الاستجابة للحوادث وإدارة المخاطر"],
 ["3-1","البنية العامة لتطبيقات الويب"],
 ["3-2","طرق الاتصال في تطبيقات الويب"],
 ["3-3","أساسيات تكنولوجيا الواجهة الأمامية"],
 ["4-1","أنواع الوسائط وخصائصها"],
 ["4-2","تصميم المعلومات وتجربة المستخدم للمواقع"],
 ["4-3","أساليب تقييم المواقع الإلكترونية"],
 ["4-4","عملية التحسين التكراري للمواقع"],
 ["5-1","طرق جمع البيانات"],
 ["5-2","تنظيف البيانات وتحويلها"],
 ["5-3","البيانات المفتوحة وواجهات برمجة التطبيقات"],
 ["6-1","الاستدلال الإحصائي"],
 ["6-2","استخدام تحليل الانحدار وتقييمه"],
 ["6-3","تمثيل البيانات المرئي والتواصل"],
 ["7-1","أساسيات التعلم الآلي"],
 ["7-2","الشبكات العصبية والتعلم العميق"],
 ["7-3","نماذج اللغة الكبيرة والذكاء الاصطناعي التوليدي"]
];

export default function CoursePage(){
 const [idx,setIdx]=useState(0);
 const [videoId,setVideoId]=useState("");
 const [answer,setAnswer]=useState("");
 const [showSource,setShowSource]=useState(true);
 const [code,title]=lessons[idx];
 const source=(exerciseData as any[]).find(x=>x.lesson===code)?.exercise_text || "لا توجد بيانات مستخرجة لهذا الدرس.";
 return <div>
   <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",flexWrap:"wrap"}}>
    <div><span className="pill">الدرس {code}</span><h1>{title}</h1></div>
    <div style={{display:"flex",gap:8}}>
      <button className="btn secondary" disabled={idx===0} onClick={()=>setIdx(i=>Math.max(0,i-1))}>السابق</button>
      <button className="btn" disabled={idx===lessons.length-1} onClick={()=>setIdx(i=>Math.min(lessons.length-1,i+1))}>التالي</button>
    </div>
   </div>

   <div className="grid grid2" style={{marginTop:18}}>
    <div className="card">
      {videoId ? <div className="video"><iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`} title="درس" allowFullScreen/></div>
      : <div className="video" style={{display:"grid",placeItems:"center",color:"#fff"}}><div style={{textAlign:"center"}}><div style={{fontSize:38}}>▶</div><p>أدخل YouTube Video ID من لوحة الإدارة</p></div></div>}
      <h2>أهداف الدرس</h2>
      <ul><li>فهم المفاهيم الأساسية للدرس.</li><li>القدرة على تطبيقها في موقف عملي.</li><li>التأكد من الفهم من خلال التمارين والاختبار.</li></ul>
    </div>

    <div className="card">
      <h2>تمارين الكتاب</h2>
      <p className="muted">تم استيراد كتلة تمارين هذا الدرس من ملف المنهج المرفوع إلى المشروع. في وضع الإنتاج تُدار من الـCMS مع صلاحيات النشر.</p>
      <button className="btn secondary" onClick={()=>setShowSource(v=>!v)}>{showSource?"إخفاء التمارين":"إظهار التمارين"}</button>
      {showSource && <pre style={{whiteSpace:"pre-wrap",lineHeight:1.8,fontFamily:"inherit",background:"#fafbfe",padding:14,borderRadius:12,maxHeight:520,overflow:"auto"}}>{source}</pre>}
    </div>
   </div>

   <div className="card" style={{marginTop:18}}>
     <h2>تدريب أصلي</h2>
     <p>هذا مكان الأسئلة التي ينشئها المدرس بنفسه، مع ربط كل سؤال بالمهارة والدرس ومستوى الصعوبة.</p>
     <div className="notice">السؤال: اشرح الفكرة الأساسية للدرس بكلماتك، ثم أعط مثالًا من واقعك.</div>
     <textarea className="input" value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="اكتب إجابتك..." style={{minHeight:120}}/>
     <button className="btn" onClick={()=>alert("تم حفظ المحاولة في نسخة الـMVP؛ في الإنتاج سيتم الحفظ في PostgreSQL.")}>حفظ الإجابة</button>
   </div>

   <div className="card" style={{marginTop:18}}>
    <h2>إعداد فيديو الدرس — للمدرس/الأدمن</h2>
    <input className="input" value={videoId} onChange={e=>setVideoId(e.target.value.trim())} placeholder="مثال: dQw4w9WgXcQ"/>
    <p className="muted">ضع Video ID فقط، وليس الرابط الكامل. الفيديو يظل على YouTube كـUnlisted.</p>
   </div>
 </div>
}