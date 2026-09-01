# CODE BAC — Production Launch Checklist

## Vercel + PostgreSQL
- Connect a real PostgreSQL database (Neon/Vercel Marketplace).
- Set DATABASE_URL in Vercel Production.
- Run `npx prisma db push` once against the production DB, then `npm run db:seed` once from a trusted local/CI environment.
- Set ADMIN_EMAIL / ADMIN_PASSWORD before the first seed. The initial admin is forced to change the password on first login.

## Authentication
- Real database-backed sessions using httpOnly secure cookies.
- Student/Parent/Teacher/Admin roles.
- Admin can create, activate and deactivate accounts and reset passwords.
- Never commit ADMIN_PASSWORD or Paymob/Judge0 secrets.

## Paymob
- Use Paymob Unified Checkout with Intention API.
- PAYMOB_SECRET_KEY stays server-side.
- Configure notification_url to `/api/paymob/webhook`.
- Webhook validates SHA-512 HMAC using Paymob's documented 20 transaction fields and reads `hmac` from the callback query string.
- Enrollment is granted only after a verified successful webhook.
- Test success/failure/duplicate callbacks before switching to Live.

## Coding Lab
- Vercel does NOT execute arbitrary student code.
- The platform calls an isolated Judge0 service over HTTPS.
- Set JUDGE0_URL and optional JUDGE0_AUTH_TOKEN.
- Use a private/self-hosted Judge0 or a trusted managed instance for production capacity; do not rely on a public demo endpoint for a paid school platform.
- Hidden test cases stay in PostgreSQL and are evaluated server-side.
- Runtime limits and network access are disabled for submissions.

## Content
- Admin controls YouTube Video IDs and lesson publishing.
- The source-book exercise bank is stored with the curriculum.
- Only publish content covered by your rights/license.
