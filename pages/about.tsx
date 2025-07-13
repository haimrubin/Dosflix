import { NextPage } from "next";
import { Navbar } from "@/components";
import Meta from "@/lib/meta";
import { HiOutlineMail, HiOutlineSupport, HiOutlineCode } from "react-icons/hi";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const About: NextPage = () => {
  return (
    <Meta title="אודות - דוספליקס">
      <>
        <Navbar />
        <div className="pt-20 pb-10 bg-zinc-900 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                אודות דוספליקס
              </h1>
              <p className="text-lg text-gray-300">
                פלטפורמת סטרימינג דתית לתכנים יהודיים איכותיים ובטוחים
              </p>
            </div>

            {/* About the Site */}
            <div className="bg-zinc-800 rounded-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-right">
                על האתר
              </h2>
              <div className="text-gray-300 leading-relaxed text-right space-y-4">
                <p>
                  בעידן שבו פלטפורמות דיגיטליות לשליחת תוכן שולטות בנוף התקשורתי, הציבור הדתי ניצב בפני אתגרים משמעותיים במציאת תוכן המותאם לערכים הרוחניים והדתיים שלו. בעוד שפלטפורמות כמו YouTube ו-Netflix מציעות גישה למגוון רחב של תכנים, רבות מהן אינן מתאימות לצרכים של הציבור שומר המצוות. קיימת דרישה ברורה לפלטפורמה דיגיטלית ייחודית המוקדשת כולה לתכנים יהודיים-דתיים המעניקים חוויה בטוחה, מרוממת ומשמעותית, בלי חשש מתכנים שאינם הולמים. DOSFLIX נועדה לספק את המענה המושלם לצורך הזה.
                </p>
                <p>
                  DOSFLIX היא פלטפורמת סטרימינג חדשנית המוקדשת לתוכן יהודי-דתי בלבד. האפליקציה כוללת מגוון רחב של שיעורי תורה, דרשות, הרצאות וסרטונים של רבנים ומרצים מוכרים. כל התכנים נבחרים בקפידה, תוך שמירה על סטנדרטים מחמירים של צניעות, איכות ורלוונטיות לקהל הדתי. המשתמשים יכולים לגשת למגוון תכנים רוחניים, החל משיעורים הלכתיים ועד לסרטונים מעוררי השראה בנושאי מוסר, אמונה וחיי יום-יום, כשהכול מוגש בסביבה בטוחה וללא הסחות דעת.
                </p>
                <p>
                  אחד מהחידושים המשמעותיים ביותר של DOSFLIX הוא האפשרות למשתמשים להיות לא רק צופים אלא גם יוצרים. האפליקציה מאפשרת לכל אחד להעלות סרטוני שיעורים ודברי תורה, ובכך לעודד שיתוף ידע והעשרת הקהילה. כל תוכן שמועלה עובר תהליך אישור קפדני על ידי צוות מנהלים מוסמכים, המוודאים שהשיעורים עומדים בסטנדרטים המחמירים של האפליקציה, הן מבחינת תוכן והן מבחינת התאמה לערכים הדתיים. כך נוצרת תחושת שותפות בין המשתמשים, שהופכים לחלק פעיל בתהליך היצירה והלמידה.
                </p>
                <p>
                  מעבר לכך, DOSFLIX נותנת מענה גם לאתגר נוסף הקיים כיום: החשש של רבנים ומשתפים אחרים לפרסם תכנים בפלטפורמות כלליות. רבנים רבים חוששים לפרסם שיעור תורה בפלטפורמות קיימות מחשש שאנשים שיבואו לצפות בתכנים שלהם ייתקלו גם בחומרים שאינם ראויים, מה שעלול לגרום לנזק רוחני או לייחוס שגוי של אחריות לרב המפרסם. DOSFLIX פותרת את הבעיה הזו באמצעות יצירת סביבה שבה כל התוכן נבדק מראש ומובטח שהוא מתאים לקהל הדתי.
                </p>
                <p>
                  בנוסף, פלטפורמת DOSFLIX מציעה כלי מהפכני עבור משפחות, מחנכים, ובני נוער דתיים המחפשים דרכים להתחבר לתורה ולמסורת בסביבה דיגיטלית. היא משלבת בין הקדמה הטכנולוגית לבין השמירה על ערכי המסורת, ומאפשרת למשתמשים ללמוד ולהתפתח באופן אישי ורוחני מבלי לוותר על עקרונותיהם.
                </p>
                <p>
                  DOSFLIX היא לא רק פלטפורמת סטרימינג, אלא כלי ייחודי ללימוד תורה, השראה ושיתוף קהילתי. היא ממלאת תפקיד מרכזי בחיזוק הקשר בין משתמשיה לבין עולם התורה, תוך התאמה לעולם הדיגיטלי המודרני. האפליקציה מייצגת חזון חדש לעתיד שבו תוכן יהודי-דתי נגיש, בטוח ומועיל לכלל הציבור, ומעניקה מענה לצרכים הרוחניים של העולם היהודי הדתי בעידן הטכנולוגיה.
                </p>
              </div>
            </div>

            {/* About the Developer */}
            <div className="bg-zinc-800 rounded-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-right">
                על המפתח
              </h2>
              <div className="text-gray-300 leading-relaxed text-right space-y-4">
                <p>
                  שלום! אני מפתח Full Stack יהודי-דתי עם התמחות בטכנולוגיות מודרניות ותשוקה לחיבור בין עולם התורה לטכנולוגיה. כאדם שומר מצוות, אני מבין מקרב את האתגרים שהציבור הדתי נתקל בהם בעולם הדיגיטלי, ואני פועל ליצירת פתרונות טכנולוגיים המתאימים לערכים הדתיים ולצרכים הרוחניים שלנו.
                </p>
                <p>
                  בעל ניסיון רב בפיתוח אפליקציות אינטרנט מתקדמות עם דגש על חוויית משתמש מעולה, תוך שמירה על סטנדרטים גבוהים של צניעות ותכנים הולמים. אני מתמחה בעבודה עם React, Next.js, Node.js, MongoDB ועוד טכנולוגיות חדשניות, תוך שמירה על עקרונות הפיתוח הנקי והמתוחזק.
                </p>
                <p>
                  פרוקט DOSFLIX נוצר מתוך הכרה בצורך הדחוף לספק לציבור הדתי פלטפורמה בטוחה ומותאמת לתכנים יהודיים-דתיים. המטרה היא לאפשר למשפחות דתיות, רבנים, ומחנכים לגשת לתכנים רוחניים איכותיים בסביבה דיגיטלית מוגנת, תוך עידוד שיתוף הידע והעשרה הקהילתית.
                </p>
                <p>
                  אני מאמין שהטכנולוגיה יכולה לשמש ככלי רב-עוצמה לחיזוק החיבור לתורה ולמסורת, והיא יכולה לסייע בהפצת תכנים רוחניים באופן נגיש ובטוח. החזון שלי הוא ליצור פלטפורמות דיגיטליות שמשלבות בין החדשנות הטכנולוגית לבין שמירת הערכים הדתיים, ומאפשרות לקהילה הדתית להתפתח ולהתחזק בעידן המודרני.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-zinc-800 rounded-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-right">
                צור קשר ותמיכה
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Links */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4 text-right">
                    דרכי יצירת קשר
                  </h3>
                  
                  <a
                    href="mailto:haimrubin1@gmail.com"
                    className="flex items-center justify-end space-x-3 space-x-reverse p-3 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      haimrubin1@gmail.com
                    </span>
                    <HiOutlineMail className="text-red-500 text-xl" />
                  </a>

                  <a
                    href="https://github.com/haimrubin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-end space-x-3 space-x-reverse p-3 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      GitHub Profile
                    </span>
                    <BsGithub className="text-white text-xl" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/haim-rubin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-end space-x-3 space-x-reverse p-3 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      LinkedIn Profile
                    </span>
                    <BsLinkedin className="text-blue-500 text-xl" />
                  </a>
                </div>

                {/* Support Links */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4 text-right">
                    תמיכה טכנית
                  </h3>
                  
                  <a
                    href="mailto:support@dosflix.com"
                    className="flex items-center justify-end space-x-3 space-x-reverse p-3 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      support@dosflix.com
                    </span>
                    <HiOutlineSupport className="text-green-500 text-xl" />
                  </a>

                  <a
                    href="https://github.com/haimrubin/Dosflix/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-end space-x-3 space-x-reverse p-3 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      דיווח על באג
                    </span>
                    <HiOutlineCode className="text-yellow-500 text-xl" />
                  </a>

                  <div className="p-3 bg-zinc-700 rounded-lg">
                    <p className="text-gray-300 text-sm text-right">
                      זמן תגובה: 24-48 שעות בימי עבודה
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-zinc-800 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-right">
                טכנולוגיות
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "MongoDB",
                  "Prisma",
                  "NextAuth",
                  "Vercel"
                ].map((tech) => (
                  <div
                    key={tech}
                    className="bg-zinc-700 rounded-lg p-3 text-center hover:bg-zinc-600 transition-colors"
                  >
                    <span className="text-white font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </Meta>
  );
};

export default About; 