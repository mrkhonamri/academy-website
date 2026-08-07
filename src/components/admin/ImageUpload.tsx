"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";

interface Props {
  currentUrl?: string;
  onUpload: (url: string) => void;
  onClear: () => void;
}

export default function ImageUpload({ currentUrl, onUpload, onClear }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("فقط تصویر مجاز است");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("حجم فایل باید کمتر از ۵ مگابایت باشد");
      return;
    }

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        onUpload(data.url);
      } else {
        setError(data.error || "خطا در آپلود");
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {currentUrl ? (
        <div className="relative inline-block">
          <img src={`/api/image-proxy?url=${encodeURIComponent(currentUrl)}`} alt="پیش‌نمایش" className="h-32 w-32 rounded-lg object-cover border" />
          <button
            type="button"
            onClick={onClear}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              در حال آپلود...
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              آپلود تصویر
            </>
          )}
        </button>
      )}

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {currentUrl && (
        <input type="text" value={currentUrl} onChange={(e) => onUpload(e.target.value)}
          placeholder="یا آدرس تصویر را وارد کنید"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      )}
    </div>
  );
}