import {NextResponse} from "next/server";
import {z} from "zod";
import {db} from "@/lib/db";
import {createSession,verifyPassword} from "@/lib/auth";
const schema=z.object({email:z.string().email(),password:z.string().min(6)});
export async function POST(req:Request){try{const d=schema.parse(await req.json());const u=await db.user.findUnique({where:{email:d.email.toLowerCase().trim()}});if(!u||!u.active||!verifyPassword(d.password,u.passwordHash))return NextResponse.json({error:"البريد الإلكتروني أو كلمة المرور غير صحيحة"},{status:401});await createSession(u.id);return NextResponse.json({ok:true,role:u.role,mustChangePassword:u.mustChangePassword});}catch(e:any){return NextResponse.json({error:e?.message||"Login failed"},{status:400});}}
