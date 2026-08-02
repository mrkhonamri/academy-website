import { prisma } from "@/lib/prisma";
import { GraduationCap, Star } from "lucide-react";

const colors = [
  "from-blue-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-indigo-500 to-blue-500",
];

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">اساتید</span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">با بهترین‌ها یاد بگیرید</h1>
          <p className="mt-4 text-lg text-blue-100">تیم آموزشی ما متشکل از اساتید مجرب و متخصص</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {teachers.length === 0 ? (
          <div className="text-center py-20 text-slate-500">هنوز استادی ثبت نشده است.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher, index) => (
              <div key={teacher.id} className="group rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                <div className={`h-32 bg-gradient-to-br ${colors[index % colors.length]}`} />
                <div className="p-6 -mt-12">
                  <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      {teacher.imageUrl ? (
                        <img src={teacher.imageUrl} alt={teacher.name} className="h-full w-full object-cover" />
                      ) : (
                        <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-slate-900">{teacher.name}</h3>
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-700">
                      <GraduationCap className="h-3 w-3" />
                      {teacher.specialization}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed text-center">{teacher.bio}</p>
                  <div className="mt-4 flex justify-center gap-6 border-t border-slate-100 pt-4">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        {teacher.experience}
                      </div>
                      <div className="text-xs text-slate-400">سابقه</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-slate-900">{teacher.students.toLocaleString("fa-IR")}+</div>
                      <div className="text-xs text-slate-400">دانشجو</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}