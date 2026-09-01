import Link from "next/link";
export default function Sidebar({role="student"}:{role?:string}){
 return <aside className="side">
  <strong>لوحة التحكم</strong>
  <Link href="/dashboard">الرئيسية</Link>
  <Link href="/dashboard/courses">المقررات</Link>
  <Link href="/dashboard/courses/1">التعلم</Link>
  <Link href="/dashboard">الاختبارات</Link>
  <Link href="/dashboard/checkout">الاشتراك والدفع</Link>
  <Link href="/dashboard/coding">Coding Lab</Link>
  <Link href="/dashboard">Data Lab</Link>
  <Link href="/dashboard">AI Lab</Link>
  {role==="teacher" && <Link href="/dashboard/teacher">إدارة المحتوى</Link>}
  {role==="admin" && <Link href="/dashboard/admin">الإدارة</Link>}
  {role==="parent" && <Link href="/dashboard/parent">متابعة الطالب</Link>}
 </aside>
}