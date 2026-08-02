"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPollsPage() {
  const router = useRouter();
  const [polls, setPolls] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  useEffect(() => {
    fetchPolls();
  }, []);

  async function fetchPolls() {
    const res = await fetch("/api/polls");
    const data = await res.json();
    setPolls(Array.isArray(data) ? data : []);
  }

  function addOption() {
    setOptions([...options, ""]);
  }

  function updateOption(index: number, value: string) {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }

  function removeOption(index: number) {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validOptions = options.filter((o) => o.trim());
    if (!question.trim() || validOptions.length < 2) {
      alert("سوال و حداقل ۲ گزینه الزامی است");
      return;
    }

    await fetch("/api/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, options: validOptions }),
    });

    setQuestion("");
    setOptions(["", ""]);
    setShowForm(false);
    router.refresh();
    fetchPolls();
  }

  async function deletePoll(id: number) {
    if (!confirm("حذف شود؟")) return;
    await fetch(`/api/polls/${id}`, { method: "DELETE" });
    router.refresh();
    fetchPolls();
  }

  return (
    <div className="mx-auto max-w-4xl p-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-blue-700" />
          <h1 className="text-2xl font-bold">مدیریت نظرسنجی</h1>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
          <Plus className="h-5 w-5" />نظرسنجی جدید
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">نظرسنجی جدید</h2>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">سوال *</label>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="سوال نظرسنجی" />
          </div>
          <label className="mb-2 block text-sm font-medium">گزینه‌ها</label>
          {options.map((opt, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" value={opt} onChange={(e) => updateOption(i, e.target.value)} className="flex-1 rounded-lg border px-3 py-2 text-sm" placeholder={`گزینه ${i + 1}`} />
              {options.length > 2 && <button type="button" onClick={() => removeOption(i)} className="text-red-500 text-sm">حذف</button>}
            </div>
          ))}
          <button type="button" onClick={addOption} className="text-sm text-blue-600">+ افزودن گزینه</button>
          <div className="mt-6 flex gap-3">
            <button type="submit" className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white">ذخیره</button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-6 py-2 text-sm">انصراف</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {polls.map((poll) => (
          <div key={poll.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{poll.question}</h3>
              <button onClick={() => deletePoll(poll.id)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="mt-2 space-y-1">
              {poll.options.map((opt: any) => (
                <div key={opt.id} className="flex justify-between text-sm">
                  <span>{opt.optionText}</span>
                  <span className="text-slate-500">{opt.votes} رای</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}