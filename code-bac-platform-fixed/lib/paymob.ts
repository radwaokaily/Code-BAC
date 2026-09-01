import crypto from "crypto";

const base = process.env.PAYMOB_BASE_URL || "https://accept.paymob.com";

export async function createPaymobIntention(input:{
  amountCents:number;
  currency?:string;
  orderId:string;
  billing:{first_name:string;last_name:string;email:string;phone_number:string;country?:string;city?:string};
}) {
  const secret = process.env.PAYMOB_SECRET_KEY;
  if (!secret) throw new Error("PAYMOB_SECRET_KEY is not configured");

  const res = await fetch(`${base}/v1/intention/`, {
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${secret}`},
    body:JSON.stringify({
      amount: input.amountCents,
      currency: input.currency || "EGP",
      payment_methods: process.env.PAYMOB_INTEGRATION_ID ? [Number(process.env.PAYMOB_INTEGRATION_ID)] : [],
      special_reference: input.orderId,
      billing_data: {
        first_name: input.billing.first_name,
        last_name: input.billing.last_name,
        email: input.billing.email,
        phone_number: input.billing.phone_number,
        country: input.billing.country || "EG",
        city: input.billing.city || "Cairo",
        apartment:"NA", floor:"NA", building:"NA", street:"NA"
      },
      extras:{source:"code-bac"},
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paymob/webhook`,
      redirection_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payment-result`
    })
  });
  if(!res.ok) throw new Error(`Paymob intention failed: ${res.status}`);
  return res.json();
}

export function verifyPaymobHmac(payload:Record<string,any>, received:string){
  const secret = process.env.PAYMOB_HMAC_SECRET;
  if(!secret) return false;
  const raw = JSON.stringify(payload);
  const expected = crypto.createHmac("sha512", secret).update(raw).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));
}
