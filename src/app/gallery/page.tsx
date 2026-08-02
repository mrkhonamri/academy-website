"use client";

import { useState, useEffect } from "react";
import { Play, X, ChevronLeft, ChevronRight, Image, Video } from "lucide-react";

const categories = [
  { value: "all", label: "همه" },
  { value: "class", label: "کلاس‌ها" },
  { value: "performance", label: "اجراهای دانشجویان" },
  { value: "event", label: "رویدادها" },
  { value: "behind-scenes", label: "پشت صحنه" },
];

interface GalleryItem {
  id: number;
  type: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  category: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchItems();
  }, [activeCategory]);

  async function fetchItems() {
    setLoading(true);
    const res = await fetch(`/api/gallery?category=${activeCategory}`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function prevItem() {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  }

  function nextItem() {
    if (lightboxIndex !== null && lightboxIndex < items.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  }

  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
            🎬 گالری
          </span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">
            لحظات ماندگار آکادمی
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            تصاویر و ویدیوهای کلاس‌ها، رویدادها و اجراهای دانشجویان
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        {loading ? (
          <div className="text-center py-20 text-slate-500">در حال بارگذاری...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <Image className="mx-auto h-16 w-16 text-slate-300" />
            <p className="mt-4 text-slate-500">هنوز آیتمی در گالری وجود ندارد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-slate-200"
              >
                {/* Thumbnail */}
                <img
                  src={item.thumbnailUrl || item.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  {item.type === "video" && (
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
                  )}
                </div>

                {/* Type badge */}
                <div className="absolute top-2 right-2 rounded-lg bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
                  {item.type === "video" ? (
                    <Video className="h-3 w-3" />
                  ) : (
                    <Image className="h-3 w-3" />
                  )}
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium text-white truncate">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevItem}
            disabled={lightboxIndex === 0}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextItem}
            disabled={lightboxIndex === items.length - 1}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="max-h-[90vh] max-w-[90vw]">
            {items[lightboxIndex].type === "video" ? (
              <video
                src={items[lightboxIndex].url}
                controls
                className="max-h-[90vh] max-w-[90vw] rounded-xl"
              />
            ) : (
              <img
                src={items[lightboxIndex].url}
                alt={items[lightboxIndex].title}
                className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
              />
            )}
            <p className="mt-4 text-center text-white font-medium">
              {items[lightboxIndex].title}
            </p>
            {items[lightboxIndex].description && (
              <p className="mt-1 text-center text-sm text-slate-400">
                {items[lightboxIndex].description}
              </p>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {lightboxIndex + 1} / {items.length}
          </div>
        </div>
      )}
    </div>
  );
}