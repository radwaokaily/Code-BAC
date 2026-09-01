# CODE BAC — منصة كود باك

منصة تعليمية عربية RTL للبرمجة والذكاء الاصطناعي للبكالوريا المصرية.

## التقنية
- Next.js 16 + React + TypeScript
- PostgreSQL + Prisma
- Vercel-ready
- Paymob API integration scaffold
- YouTube Unlisted video IDs
- Curriculum CMS foundation
- Student / Teacher / Parent / Admin roles

## التشغيل
1. `cp .env.example .env.local`
2. ضع DATABASE_URL وبيانات Paymob.
3. `npm install`
4. `npx prisma db push`
5. `npm run db:seed`
6. `npm run dev`

## Vercel
اربط المشروع بـ GitHub ثم Vercel. استخدم PostgreSQL من Vercel Marketplace مثل Neon، ثم أضف متغيرات البيئة.

## Paymob
المشروع يستخدم Intention API من جهة الخادم، ولا يضع أي Secret Key في المتصفح.
قبل الإنتاج:
- ضع بيانات Paymob الحقيقية في Vercel Environment Variables.
- فعّل webhook على `/api/paymob/webhook`.
- لا تمنح الاشتراك اعتمادًا على redirect فقط؛ الـwebhook هو مصدر الحقيقة.
- اضبط HMAC secret حسب إعدادات حساب Paymob.

## الفيديو
لا يتم رفع الفيديوهات إلى المنصة. لكل درس `youtubeVideoId`.
استخدم فيديوهات YouTube Unlisted. هذا ليس DRM؛ الرابط يمكن مشاركته إذا حصل عليه شخص.

## حقوق المحتوى
تم إدخال هيكل الفصول والدروس من الكتب المرفوعة، مع مراجع للتمارين بدل نسخ نصوص الكتاب حرفيًا. لا تنشر النصوص أو التمارين الأصلية إلا إذا كانت لديكم صلاحية إعادة نشرها.

## ملاحظة
هذه نسخة أولى عملية قابلة للتطوير وليست ادعاءً بأنها متصلة بحساب Vercel أو Paymob الخاص بك. الربط الحقيقي يحتاج مفاتيح الحساب وإعدادات webhook من لوحة Paymob.

## Curriculum source content
The project now includes `data/curriculum_exercises.json`, containing the extracted exercise blocks for all 23 lessons from the two supplied curriculum PDFs, plus a Prisma field for lesson-level source exercise content.
