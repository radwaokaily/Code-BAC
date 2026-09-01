const stats=[["التقدم","72%"],["متوسط الاختبارات","88%"],["XP","1,240"],["الترتيب","#14"]];
export default function Dashboard(){
 return <main>
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h1>أهلاً يا طالب 👋</h1><p className="muted">نكمل من آخر نقطة وصلت لها.</p></div><span className="pill">Coder Level 3</span></div>
  <div className="grid grid2" style={{marginTop:18}}>{stats.map(([a,b])=><div className="card" key={a}><div className="muted">{a}</div><div className="stat">{b}</div></div>)}</div>
  <div className="card" style={{marginTop:18}}><h2>كورس البرمجة والذكاء الاصطناعي</h2><div className="progress"><i style={{width:"72%"}}/></div><p className="muted">72% مكتمل</p><a className="btn" href="/dashboard/courses/1">استكمل التعلم</a></div>
  <div className="grid grid2" style={{marginTop:18}}>
   <div className="card"><h3>آخر اختبار</h3><p>الفصل 1 — 18 / 20</p><span className="pill">ممتاز</span></div>
   <div className="card"><h3>موضوع يحتاج مراجعة</h3><p>القضايا الأخلاقية للذكاء الاصطناعي</p><span className="pill">مراجعة</span></div>
  </div>
 </main>
}