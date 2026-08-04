import { LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link href="/admin" className="text-lg font-bold text-slate-900 hover:text-blue-700 transition-colors">
            پنل مدیریت
          </Link>
          <a
            href="/api/admin-logout"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            خروج
          </a>
        </div>
      </header>
      {children}
    </div>
  );
}