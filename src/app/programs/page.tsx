"use client";

import { useState, useEffect } from "react";
import { ChevronDown, CheckCircle, Users } from "lucide-react";

const ageGroups = [
  {
    id: 1, title: "کودکان", minAge: 4, maxAge: 6, icon: "🧒",
    levels: [
      "L.P", "P1.a", "P1.b", "P2.a", "P2.b", "P3.a", "P3.b",
      "MT 1a", "MT 1b", "MT 2a", "MT 2b",
      "Big 1a", "Big 1b", "Big 1c", "Big 2a", "Big 2b", "Big 2c",
      "Big 3a", "Big 3b", "Big 3c", "Big 4a", "Big 4b", "Big 4c",
      "Big 5a", "Big 5b", "Big 5c", "Big 6a", "Big 6b", "Big 6c",
      "TN 1a", "TN 1b", "TN 1c", "TN 2a", "TN 2b", "TN 2c", "TN 3a", "TN 3b", "TN 3c",
      "Sum 1a", "Sum 1b", "Sum 1c", "Sum 2a", "Sum 2b", "Sum 2c",
    ],
  },
  {
    id: 2, title: "کودکان و نوجوانان", minAge: 7, maxAge: 9, icon: "👦",
    levels: [
      "F1.a", "F1.b", "F2.a", "F2.b", "F3.a", "F3.b",
      "Fam 1a", "Fam 1b", "Fam 1c", "Fam 2a", "Fam 2b", "Fam 2c",
      "Fam 3a", "Fam 3b", "Fam 3c", "Fam 4a", "Fam 4b", "Fam 4c",
      "Fam 5a", "Fam 5b", "Fam 5c", "Fam 6a", "Fam 6b", "Fam 6c",
      "TN 1a", "TN 1b", "TN 1c", "TN 2a", "TN 2b", "TN 2c", "TN 3a", "TN 3b", "TN 3c",
      "Sum 1a", "Sum 1b", "Sum 1c", "Sum 2a", "Sum 2b", "Sum 2c",
    ],
  },
  {
    id: 3, title: "نوجوانان", minAge: 10, maxAge: 12, icon: "🧑",
    levels: [
      "ET 1a", "ET 1b", "ET 2a", "ET 2b", "ET 3a", "ET 3b",
      "ET 4a", "ET 4b", "ET 5a", "ET 5b", "ET 6a", "ET 6b",
      "TN 1a", "TN 1b", "TN 1c", "TN 2a", "TN 2b", "TN 2c", "TN 3a", "TN 3b", "TN 3c",
      "Sum 1a", "Sum 1b", "Sum 1c", "Sum 2a", "Sum 2b", "Sum 2c",
    ],
  },
  {
    id: 4, title: "نوجوانان پیشرفته", minAge: 13, maxAge: 15, icon: "👨",
    levels: [
      "Fund 1a", "Fund 1b", "Fund 1c",
      "TN 1a", "TN 1b", "TN 1c", "TN 2a", "TN 2b", "TN 2c", "TN 3a", "TN 3b", "TN 3c",
      "Sum 1a", "Sum 1b", "Sum 1c", "Sum 2a", "Sum 2b", "Sum 2c",
    ],
  },
  {
    id: 5, title: "بزرگسالان", minAge: 16, maxAge: 99, icon: "👨‍💼",
    levels: [
      "FC 1", "FC 2", "FC 3", "FC 4",
      "Pass 1", "Pass 2",
      "IELTS",
    ],
  },
];

export default function ProgramsPage() {
  const [openGroup, setOpenGroup] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const groupParam = params.get("group");
    if (groupParam) {
      const groupId = parseInt(groupParam);
      if (!isNaN(groupId)) {
        setOpenGroup(groupId);
        setTimeout(() => {
          document.getElementById(`group-${groupId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">📚 برنامه‌های آموزشی</span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">مسیر یادگیری خود را انتخاب کنید</h1>
          <p className="mt-4 text-lg text-blue-100">هر گروه سنی شامل ده‌ها سطح آموزشی برای یادگیری گام‌به‌گام است</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="space-y-4">
          {ageGroups.map((group) => {
            const isOpen = openGroup === group.id;
            return (
              <div key={group.id} id={`group-${group.id}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button onClick={() => setOpenGroup(isOpen ? null : group.id)} className="flex w-full items-center justify-between p-6 text-right hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{group.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{group.title}</h2>
                      <p className="text-sm text-slate-500">{group.minAge} تا {group.maxAge === 99 ? "+" : ""}{group.maxAge} سال • {group.levels.length} سطح</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                      {group.levels.map((code) => (
                        <div key={code} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group">
                          <CheckCircle className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-blue-500 transition-colors" />
                          <span className="text-xs font-bold text-slate-700 truncate">{code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-blue-50 p-6 border border-blue-200">
          <Users className="h-6 w-6 shrink-0 text-blue-600" />
          <div>
            <h3 className="font-bold text-blue-900">نمی‌دانید از کجا شروع کنید؟</h3>
            <p className="text-sm text-blue-700">تست تعیین سطح رایگان ما به شما کمک می‌کند سطح مناسب خود را پیدا کنید.</p>
          </div>
          <a href="/register" className="mr-auto shrink-0 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors">تعیین سطح</a>
        </div>
      </section>
    </div>
  );
}