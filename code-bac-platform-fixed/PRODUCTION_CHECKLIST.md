# CODE BAC — Production Checklist

## Required before launch
- [ ] Connect a real PostgreSQL database from Vercel Marketplace.
- [ ] Set all environment variables from `.env.example`.
- [ ] Configure Paymob TEST credentials first.
- [ ] Configure Paymob Transaction Processed Callback to `/api/paymob/webhook`.
- [ ] Verify Paymob callback HMAC according to the exact callback fields configured for the merchant account.
- [ ] Test success, failure, pending, duplicate webhook and replay scenarios.
- [ ] Only grant enrollment/subscription after verified server-side payment.
- [ ] Replace demo authentication with production session/auth implementation.
- [ ] Replace demo UI actions with database mutations.
- [ ] Add rate limiting and audit logs to auth, exams, submissions and payment endpoints.
- [ ] Deploy Coding Lab executor as an isolated service; never run student code inside Next.js.
- [ ] Add private video strategy if stronger protection than YouTube Unlisted is required.
- [ ] Add backups and database monitoring.
- [ ] Run end-to-end QA on mobile and desktop.

## Curriculum
The repository includes the 23 lesson structure and extracted source-book exercise blocks from the two supplied PDFs. Keep a teacher/admin review step before publishing any item.

## Paymob
Paymob currently recommends Unified Checkout for new merchants and documents server callbacks as the source of truth for final payment status. Use TEST credentials during development and switch to LIVE credentials only after merchant approval.
