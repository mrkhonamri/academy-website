"use client";

import { useState, useEffect } from "react";
import { ChevronDown, CheckCircle, Users } from "lucide-react";

interface Level {
  id: number;
  code: string;
  title: string;
  sortOrder: number;
  isActive: boolean;
}

interface AgeGroup {
  id: number;
  title: string;
  minAge: number;
  maxAge: number;
  sortOrder: number;
  isActive: boolean;
  levels: Level[];
}

export default function ProgramsPage() {
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  const [openGroup, setOpenGroup] = useState<number | null>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/age-groups")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAgeGroups(data);
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <div className="text-center py-12 text-slate-500">در حال بارگذاری...</div>
        ) : ageGroups.length === 0 ? (
          <div className="text-center py-12 text-slate-500">هنوز برنامه‌ای تعریف نشده است.</div>
        ) : (
          <div className="space-y-4">
            {ageGroups.map((group) => {
              const isOpen = openGroup === group.id;
              return (
                <div key={group.id} id={`group-${group.id}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <button onClick={() => setOpenGroup(isOpen ? null : group.id)} className="flex w-full items-center justify-between p-6 text-right hover:bg-slate-50 transition-colors">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{group.title}</h2>
                      <p className="text-sm text-slate-500">{group.minAge} تا {group.maxAge === 99 ? "+" : ""}{group.maxAge} سال • {group.levels.length} سطح</p>
                    </div>
                    <ChevronDown className={`h-6 w-6 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                        {group.levels.map((level) => (
                          <div key={level.id} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group">
                            <CheckCircle className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-blue-500 transition-colors" />
                            <span className="text-xs font-bold text-slate-700 truncate">{level.code}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

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