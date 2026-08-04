import { prisma } from "@/lib/prisma";

async function getStats() {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s) => (map[s.key] = s.value));
  return map;
}

export default async function StatsCounter() {
  const s = await getStats();

  const stats = [
    { number: s.stat_students || "۵۰۰۰", label: "دانشجوی موفق", suffix: "+" },
    { number: s.stat_teachers || "۵۰", label: "استاد مجرب", suffix: "+" },
    { number: s.stat_years || "۱۵", label: "سال تجربه", suffix: "+" },
    { number: s.stat_satisfaction || "۹۸", label: "رضایت دانشجویان", suffix: "٪" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black text-white sm:text-5xl">
                {stat.number}<span className="text-amber-400">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-sm text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}