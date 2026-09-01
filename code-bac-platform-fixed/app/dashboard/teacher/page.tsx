export default function Teacher(){
 return <div><h1>لوحة المدرس</h1><div className="grid grid3">{["الطلاب","الدروس","التمارين","الاختبارات","Coding Challenges","الحضور"].map(x=><div className="card" key={x}><h3>{x}</h3><p className="muted">إدارة ومتابعة {x}</p></div>)}</div></div>
}