import { NextResponse } from "next/server";
import { verifyPaymobHmac } from "@/lib/paymob";

export async function POST(req:Request){
  try{
    const body=await req.json();
    const hmac=req.headers.get("x-paymob-hmac") || body.hmac || "";
    // IMPORTANT: Replace/complete the exact canonical HMAC field ordering from your
    // Paymob dashboard/docs before production. Never trust an unsigned callback.
    if(!verifyPaymobHmac(body,hmac)) return NextResponse.json({error:"Invalid signature"},{status:401});

    // TODO: Lookup order by special_reference / Paymob reference.
    // TODO: In a DB transaction, mark payment paid/failed and grant enrollment.
    return NextResponse.json({ok:true});
  }catch{
    return NextResponse.json({error:"Invalid webhook"},{status:400});
  }
}