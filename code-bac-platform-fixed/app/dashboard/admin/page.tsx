export default function Admin(){
 return <div><h1>الإدارة</h1><div className="grid grid3">
 {["المستخدمون","المناهج والدروس","التمارين وبنك الأسئلة","المدفوعات","الاشتراكات","الفيديوهات","الشهادات","الإشعارات","التحليلات"].map(x=><div className="card" key={x}><h3>{x}</h3><p className="muted">إدارة {x} من لوحة التحكم.</p><button className="btn secondary">فتح</button></div>)}
 </div>
 <div className="card" style={{marginTop:18}}><h2>إضافة فيديو لدرس</h2><input className="input" placeholder="YouTube Video ID"/><button className="btn">حفظ</button><p className="muted">نخزن Video ID فقط؛ الفيديو يبقى على YouTube Unlisted.</p></div>
 </div>
}