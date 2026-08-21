"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ChevronDown, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function AdminProgramsPage() {
  const router = useRouter();
  const [groups, setGroups] = useState<AgeGroup[]>([]);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [groupForm, setGroupForm] = useState({
    title: "",
    minAge: 0,
    maxAge: 0,
    sortOrder: 0,
    isActive: true,
  });

  const [showLevelForm, setShowLevelForm] = useState(false);
  const [editingLevelId, setEditingLevelId] = useState<number | null>(null);
  const [levelForm, setLevelForm] = useState({
    ageGroupId: 0,
    code: "",
    title: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => { fetchGroups(); }, []);

  async function fetchGroups() {
    const res = await fetch("/api/age-groups");
    const data = await res.json();
    setGroups(Array.isArray(data) ? data : []);
  }

  function resetGroupForm() {
    setGroupForm({ title: "", minAge: 0, maxAge: 0, sortOrder: 0, isActive: true });
    setEditingGroupId(null);
    setShowGroupForm(false);
  }

  function resetLevelForm() {
    setLevelForm({ ageGroupId: 0, code: "", title: "", sortOrder: 0, isActive: true });
    setEditingLevelId(null);
    setShowLevelForm(false);
  }

  async function handleGroupSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!groupForm.title.trim()) { alert("عنوان گروه سنی الزامی است"); return; }

    if (editingGroupId) {
      await fetch(`/api/age-groups/${editingGroupId}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(groupForm),
      });
    } else {
      await fetch("/api/age-groups", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(groupForm),
      });
    }
    resetGroupForm();
    await fetchGroups();
    router.refresh();
  }

  async function deleteGroup(id: number) {
    if (!confirm("حذف این گروه و تمام سطح‌های آن؟")) return;
    await fetch(`/api/age-groups/${id}`, { method: "DELETE" });
    await fetchGroups();
    router.refresh();
  }

  async function handleLevelSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!levelForm.code.trim() || !levelForm.ageGroupId) { alert("کد سطح و گروه سنی الزامی است"); return; }

    if (editingLevelId) {
      await fetch(`/api/levels/${editingLevelId}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(levelForm),
      });
    } else {
      await fetch("/api/levels", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(levelForm),
      });
    }
    resetLevelForm();
    await fetchGroups();
    router.refresh();
  }

  async function deleteLevel(id: number) {
    if (!confirm("حذف این سطح؟")) return;
    await fetch(`/api/levels/${id}`, { method: "DELETE" });
    await fetchGroups();
    router.refresh();
  }

  function editGroup(group: AgeGroup) {
    setGroupForm({
      title: group.title, minAge: group.minAge, maxAge: group.maxAge,
      sortOrder: group.sortOrder, isActive: group.isActive,
    });
    setEditingGroupId(group.id);
    setShowGroupForm(true);
  }

  function editLevel(level: Level, groupId: number) {
    setLevelForm({
      ageGroupId: groupId, code: level.code, title: level.title,
      sortOrder: level.sortOrder, isActive: level.isActive,
    });
    setEditingLevelId(level.id);
    setShowLevelForm(true);
  }

  function startNewLevel(groupId: number) {
    resetLevelForm();
    setLevelForm({ ...levelForm, ageGroupId: groupId });
    setShowLevelForm(true);
  }
  return (
    <div className="mx-auto max-w-4xl p-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-blue-700" />
          <h1 className="text-2xl font-bold">مدیریت برنامه‌های آموزشی</h1>
        </div>
        <button onClick={() => { resetGroupForm(); setShowGroupForm(true); }} className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
          <Plus className="h-5 w-5" /> گروه سنی جدید
        </button>
      </div>

      {showGroupForm && (
        <form onSubmit={handleGroupSubmit} className="mb-8 rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">{editingGroupId ? "ویرایش گروه" : "گروه جدید"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium">عنوان *</label><input type="text" value={groupForm.title} onChange={e => setGroupForm({...groupForm, title: e.target.value})} className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="مثلا: کودکان" /></div>
            <div><label className="mb-1 block text-sm font-medium">حداقل سن</label><input type="number" value={groupForm.minAge} onChange={e => setGroupForm({...groupForm, minAge: parseInt(e.target.value) || 0})} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">حداکثر سن</label><input type="number" value={groupForm.maxAge} onChange={e => setGroupForm({...groupForm, maxAge: parseInt(e.target.value) || 0})} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">ترتیب</label><input type="number" value={groupForm.sortOrder} onChange={e => setGroupForm({...groupForm, sortOrder: parseInt(e.target.value) || 0})} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" id="groupActive" checked={groupForm.isActive} onChange={e => setGroupForm({...groupForm, isActive: e.target.checked})} className="h-4 w-4" /><label htmlFor="groupActive" className="text-sm font-medium">فعال</label></div>
          </div>
          <div className="mt-6 flex gap-3"><button type="submit" className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white">ذخیره</button><button type="button" onClick={resetGroupForm} className="rounded-lg border px-6 py-2 text-sm">انصراف</button></div>
        </form>
      )}

      {showLevelForm && (
        <form onSubmit={handleLevelSubmit} className="mb-8 rounded-xl border bg-amber-50 p-6">
          <h2 className="mb-4 text-lg font-bold">{editingLevelId ? "ویرایش سطح" : "سطح جدید"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">گروه سنی *</label><select value={levelForm.ageGroupId} onChange={e => setLevelForm({...levelForm, ageGroupId: parseInt(e.target.value)})} className="w-full rounded-lg border px-3 py-2 text-sm">{groups.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}</select></div>
            <div><label className="mb-1 block text-sm font-medium">کد *</label><input type="text" value={levelForm.code} onChange={e => setLevelForm({...levelForm, code: e.target.value})} className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="P1.a" /></div>
            <div><label className="mb-1 block text-sm font-medium">عنوان سطح</label><input type="text" value={levelForm.title} onChange={e => setLevelForm({...levelForm, title: e.target.value})} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">ترتیب</label><input type="number" value={levelForm.sortOrder} onChange={e => setLevelForm({...levelForm, sortOrder: parseInt(e.target.value) || 0})} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          </div>
          <div className="mt-6 flex gap-3"><button type="submit" className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white">ذخیره</button><button type="button" onClick={resetLevelForm} className="rounded-lg border px-6 py-2 text-sm">انصراف</button></div>
        </form>
      )}

      <div className="space-y-3">
        {groups.map(group => {
          const isOpen = expandedGroup === group.id;
          return (
            <div key={group.id} className="rounded-xl border bg-white overflow-hidden">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50" onClick={() => setExpandedGroup(isOpen ? null : group.id)}>
                <div className="flex items-center gap-3">
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  <h3 className="font-bold">{group.title}</h3>
                  <span className="text-xs text-slate-400">{group.minAge}-{group.maxAge} سال</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={(e) => { e.stopPropagation(); editGroup(group); }} className="rounded-lg p-2 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
                  <button onClick={(e) => { e.stopPropagation(); deleteGroup(group.id); }} className="rounded-lg p-2 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>

              {isOpen && (
                <div className="border-t px-4 pb-4">
                  <div className="mt-3 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-600">سطح‌ها ({group.levels.length})</h4>
                    <button onClick={() => startNewLevel(group.id)} className="text-xs text-blue-600 hover:text-blue-700">+ افزودن سطح</button>
                  </div>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {group.levels.map(level => (
                      <div key={level.id} className="flex items-center justify-between rounded-lg border bg-slate-50 p-2">
                        <span className="text-xs font-bold text-slate-700">{level.code}</span>
                        <div className="flex gap-1">
                          <button onClick={() => editLevel(level, group.id)} className="rounded p-1 hover:bg-slate-200"><Pencil className="h-3 w-3" /></button>
                          <button onClick={() => deleteLevel(level.id)} className="rounded p-1 hover:bg-red-100 hover:text-red-600"><Trash2 className="h-3 w-3" /></button>
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
    </div>
  );
}