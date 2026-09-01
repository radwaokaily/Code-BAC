import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "كود باك | برمجة وذكاء اصطناعي",
  description: "منصة عربية تفاعلية للبرمجة والذكاء الاصطناعي للبكالوريا المصرية"
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <>
    <nav className="nav"><div className="navin">
      <Link className="brand" href="/">كود <span>باك</span></Link>
      <div style={{display:"flex",gap:8}}>
        <Link className="btn secondary" href="/login">دخول</Link>
        <Link className="btn" href="/dashboard">لوحة الطالب</Link>
      </div>
    </div></nav>
    {children}
    <footer className="footer">© {new Date().getFullYear()} كود باك — منصة تعليمية للبرمجة والذكاء الاصطناعي</footer>
  </>;
}