import crypto from "node:crypto";
import { cookies } from "next/headers";
import { db } from "./db";
import { Role } from "@prisma/client";

const COOKIE = "codebac_session";
const TTL = 1000 * 60 * 60 * 24 * 30;

export function hashPassword(password:string){
  const salt=crypto.randomBytes(16).toString("hex");
  const hash=crypto.scryptSync(password,salt,64).toString("hex");
  return `${salt}:${hash}`;
}
export function verifyPassword(password:string,stored:string){
  const [salt,hash]=stored.split(":"); if(!salt||!hash) return false;
  const candidate=crypto.scryptSync(password,salt,64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(candidate,"hex"),Buffer.from(hash,"hex"));
}
export async function createSession(userId:string){
  const token=crypto.randomBytes(32).toString("hex");
  await db.session.create({data:{token,userId,expiresAt:new Date(Date.now()+TTL)}});
  const jar=await cookies();
  jar.set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:TTL/1000});
}
export async function destroySession(){
  const jar=await cookies(); const token=jar.get(COOKIE)?.value;
  if(token) await db.session.deleteMany({where:{token}});
  jar.delete(COOKIE);
}
export async function getCurrentUser(){
  const token=(await cookies()).get(COOKIE)?.value; if(!token) return null;
  const s=await db.session.findUnique({where:{token},include:{user:{include:{student:true,parent:true,teacher:true}}}});
  if(!s || s.expiresAt<new Date()){ if(s) await db.session.delete({where:{id:s.id}}); return null; }
  return s.user;
}
export async function requireUser(role?:Role){
  const user=await getCurrentUser();
  if(!user) throw new Error("UNAUTHENTICATED");
  if(role && user.role!==role) throw new Error("FORBIDDEN");
  return user;
}
