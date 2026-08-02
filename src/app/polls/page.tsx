"use client";

import { useState, useEffect } from "react";
import { BarChart3, CheckCircle } from "lucide-react";

interface PollOption {
  id: number;
  optionText: string;
  votes: number;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
}

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedPolls, setVotedPolls] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<Record<number, number>>({});

  useEffect(() => {
    fetchPolls();
  }, []);

  async function fetchPolls() {
    setLoading(true);
    const res = await fetch("/api/polls");
    const data = await res.json();
    setPolls(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function vote(pollId: number) {
    const optionId = selectedOption[pollId];
    if (!optionId) return;

    const res = await fetch(`/api/polls/${pollId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId }),
    });

    if (res.ok) {
      setVotedPolls([...votedPolls, pollId]);
      fetchPolls();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  }

  function getMaxVotes(options: PollOption[]) {
    return Math.max(...options.map((o) => o.votes), 1);
  }

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">نظرسنجی</span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">نظر شما مهم است</h1>
          <p className="mt-4 text-lg text-blue-100">در نظرسنجی‌های ما شرکت کنید و نتایج را ببینید</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        {loading ? (
          <div className="text-center py-12">در حال بارگذاری...</div>
        ) : polls.length === 0 ? (
          <div className="text-center py-12 text-slate-500">هیچ نظرسنجی فعالی وجود ندارد.</div>
        ) : (
          <div className="space-y-6">
            {polls.map((poll) => {
              const hasVoted = votedPolls.includes(poll.id);
              const maxVotes = getMaxVotes(poll.options);
              const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

              return (
                <div key={poll.id} className="rounded-2xl bg-white border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-bold text-slate-900">{poll.question}</h2>
                  </div>

                  <div className="space-y-3">
                    {poll.options.map((option) => {
                      const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                      const widthPercent = totalVotes > 0 ? Math.round((option.votes / maxVotes) * 100) : 0;

                      return (
                        <div key={option.id}>
                          {hasVoted ? (
                            <div className="relative">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-slate-700">{option.optionText}</span>
                                <span className="text-sm text-slate-500">{percentage}٪</span>
                              </div>
                              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                  style={{ width: `${widthPercent}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-400">{option.votes} رای</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedOption({ ...selectedOption, [poll.id]: option.id })}
                              className={`w-full rounded-xl border-2 p-3 text-right text-sm font-medium transition-colors ${
                                selectedOption[poll.id] === option.id
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-slate-200 hover:border-blue-300 text-slate-700"
                              }`}
                            >
                              {option.optionText}
                              {selectedOption[poll.id] === option.id && (
                                <CheckCircle className="inline-block mr-2 h-4 w-4 text-blue-500" />
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!hasVoted && (
                    <button
                      onClick={() => vote(poll.id)}
                      disabled={!selectedOption[poll.id]}
                      className="mt-4 w-full rounded-xl bg-blue-700 py-3 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ثبت رای
                    </button>
                  )}

                  {hasVoted && (
                    <p className="mt-4 text-center text-sm text-slate-400">
                      مجموع آرا: {totalVotes} - رای شما ثبت شد ✓
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}