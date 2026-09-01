import { PrismaClient, Role, ContentStatus, ExerciseSource } from "@prisma/client";
import exerciseData from "../data/curriculum_exercises.json";

const db = new PrismaClient();

const curriculum = [
 {part:"الترم الأول", chapters:[
  {number:1,title:"تكنولوجيا المعلومات والمجتمع", lessons:[
   ["1-1","تطور تكنولوجيا المعلومات والتحول الاجتماعي"],
   ["1-2","كيف يعمل الذكاء الاصطناعي"],
   ["1-3","الذكاء الاصطناعي في الحياة اليومية والصناعة"],
   ["1-4","القضايا الأخلاقية للذكاء الاصطناعي"]
  ]},
  {number:2,title:"الأمن السيبراني",lessons:[
   ["2-1","تقنيات التشفير والمصادقة"],["2-2","تصميم أمن الشبكات"],["2-3","الاستجابة للحوادث وإدارة المخاطر"]
  ]},
  {number:3,title:"تطبيقات الويب",lessons:[
   ["3-1","البنية العامة لتطبيقات الويب"],["3-2","طرق الاتصال في تطبيقات الويب"],["3-3","أساسيات تكنولوجيا الواجهة الأمامية"]
  ]},
  {number:4,title:"تصميم الويب والوسائط",lessons:[
   ["4-1","أنواع الوسائط وخصائصها"],["4-2","تصميم المعلومات وتجربة المستخدم للمواقع"],["4-3","أساليب تقييم المواقع الإلكترونية"],["4-4","عملية التحسين التكراري للمواقع"]
  ]}
 ]},
 {part:"الترم الثاني", chapters:[
  {number:5,title:"جمع البيانات وتنقيتها",lessons:[
   ["5-1","طرق جمع البيانات"],["5-2","تنظيف البيانات وتحويلها"],["5-3","البيانات المفتوحة وواجهات برمجة التطبيقات"]
  ]},
  {number:6,title:"التحليل والتواصل",lessons:[
   ["6-1","الاستدلال الإحصائي"],["6-2","استخدام تحليل الانحدار وتقييمه"],["6-3","تمثيل البيانات المرئي والتواصل"]
  ]},
  {number:7,title:"التعلم الآلي والذكاء الاصطناعي",lessons:[
   ["7-1","أساسيات التعلم الآلي"],["7-2","الشبكات العصبية والتعلم العميق"],["7-3","نماذج اللغة الكبيرة والذكاء الاصطناعي التوليدي"]
  ]}
 ]}
];

const exerciseMap = new Map((exerciseData as any[]).map(x => [x.lesson, x.exercise_text]));

async function main(){
  const program=await db.program.upsert({
    where:{id:"code-bac-program"},
    update:{title:"البرمجة والذكاء الاصطناعي — الصف الثاني بكالوريا"},
    create:{id:"code-bac-program",title:"البرمجة والذكاء الاصطناعي — الصف الثاني بكالوريا"}
  });

  for(const p of curriculum){
    const part=await db.part.upsert({
      where:{id:`part-${p.part}`},
      update:{title:p.part},
      create:{id:`part-${p.part}`,title:p.part,programId:program.id}
    });
    for(const c of p.chapters){
      const ch=await db.chapter.upsert({
        where:{id:`chapter-${c.number}`},
        update:{number:c.number,title:c.title},
        create:{id:`chapter-${c.number}`,number:c.number,title:c.title,partId:part.id}
      });
      for(const [code,title] of c.lessons){
        const sourceExerciseText = exerciseMap.get(code) || null;
        await db.lesson.upsert({
          where:{id:`lesson-${code}`},
          update:{code,title,sourceExerciseText},
          create:{
            id:`lesson-${code}`,code,title,chapterId:ch.id,
            status:ContentStatus.DRAFT,objectives:[],sourceExerciseText
          }
        });
      }
    }
  }

  console.log("Seeded 23 lessons and their source-book exercise blocks.");
}
main().finally(()=>db.$disconnect());
