import { NextResponse } from "next/server";
import { z } from "zod";
import { createPaymobIntention } from "@/lib/paymob";

const schema = z.object({
  amountCents:z.number().int().positive(),
  orderId:z.string().min(1),
  billing:z.object({
    first_name:z.string().min(1),
    last_name:z.string().min(1),
    email:z.string().email(),
    phone_number:z.string().min(8)
  })
});

export async function POST(req:Request){
 try{
  const data=schema.parse(await req.json());
  const result=await createPaymobIntention(data);
  return NextResponse.json(result);
 }catch(e:any){
  return NextResponse.json({error:e?.message||"Payment error"},{status:400});
 }
}