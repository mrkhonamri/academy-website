"use client";

import { useState } from "react";
import { ChevronDown, Users, BookOpen, CheckCircle } from "lucide-react";

const ageGroups = [
  {
    id: 1,
    title: "کودکان",
    minAge: 4,
    maxAge: 7,
    description: "شروع یادگیری با بازی، شعر و داستان",
    icon: "🧒",
    levels: Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      title: `سطح ${i + 1}`,
      code: `K${i + 1}`,
      description: "توضیحات مختصر این سطح آموزشی",
    })),
  },
  {
    id: 2,
    title: "نوجوانان",
    minAge: 8,
    maxAge: 16,
    description: "یادگیری ساختاریافته با تمرکز بر مکالمه",
    icon: "👦",
    levels: Array.from({ length: 35 }, (_, i) => ({
      id: i + 33,
      title: `سطح ${i + 1}`,
      code: `T${i + 1}`,
      description: "توضیحات مختصر این سطح آموزشی",
    })),
  },
  {
    id: 3,
    title: "بزرگسالان",
    minAge: 17,
    maxAge: 99,
    description: "آموزش حرفه‌ای با متدهای بین‌المللی",
    icon: "👨",
    levels: Array.from({ length: 30 }, (_, i) => ({
      id: i + 68,
      title: `سطح ${i + 1}`,
      code: `A${i + 1}`,
      description: "توضیحات مختصر این سطح آموزشی",
    })),
  },
];

export default function ProgramsPage() {
    console.log("NEW VERSION LOADED");

  const [openGroup, setOpenGroup] = useState<number | null>(1);

  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
            📚 برنامه‌های آموزشی
          </span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">
            مسیر یادگیری خود را انتخاب کنید
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            هر گروه سنی شامل ده‌ها سطح آموزشی برای یادگیری گام‌به‌گام است
          </p>
        </div>
      </section>

      {/* Age Groups Accordion */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="space-y-4">
          {ageGroups.map((group) => {
            const isOpen = openGroup === group.id;

            return (
              <div
                key={group.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Header - Clickable */}
                <button
                  onClick={() => setOpenGroup(isOpen ? null : group.id)}
                  className="flex w-full items-center justify-between p-6 text-right hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{group.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{group.title}</h2>
                      <p className="text-sm text-slate-500">
                        {group.minAge} تا {group.maxAge === 99 ? "+" : ""}{group.maxAge} سال • {group.levels.length} سطح آموزشی
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Description */}
                {isOpen && (
                  <div className="px-6 pb-2">
                    <p className="text-slate-600">{group.description}</p>
                  </div>
                )}

                {/* Levels Grid */}
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                      {group.levels.map((level, index) => (
                        <div
                          key={level.id}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group"
                          title={level.description}
                        >
                          <CheckCircle className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-blue-500 transition-colors" />
                          <div className="min-w-0">
                            <span className="block text-xs font-bold text-slate-700 truncate">
                              {level.code}
                            </span>
                            <span className="block text-xs text-slate-400 truncate">
                              {level.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Placement Test CTA */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-blue-50 p-6 border border-blue-200">
          <Users className="h-6 w-6 shrink-0 text-blue-600" />
          <div>
            <h3 className="font-bold text-blue-900">نمی‌دانید از کجا شروع کنید؟</h3>
            <p className="text-sm text-blue-700">
              تست تعیین سطح رایگان ما به شما کمک می‌کند سطح مناسب خود را پیدا کنید.
            </p>
          </div>
          <a
            href="/register"
            className="mr-auto shrink-0 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
          >
            تعیین سطح
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900 py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <BookOpen className="mx-auto h-10 w-10 text-amber-400" />
          <h2 className="mt-4 text-3xl font-black text-white">آماده شروع هستید؟</h2>
          <p className="mt-4 text-slate-400">همین امروز ثبت‌نام کنید و اولین گام را به سمت تسلط بر انگلیسی بردارید.</p>
          <button className="mt-8 rounded-2xl bg-amber-400 px-8 py-4 font-bold text-slate-900 hover:bg-amber-300 transition-all text-lg shadow-xl shadow-amber-400/20">
            🚀 شروع یادگیری
          </button>
        </div>
      </section>
    </div>
  );
}