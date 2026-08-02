"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  subtitle: string | null;
  backgroundType: string;
  backgroundUrl: string;
  button1Text: string | null;
  button1Link: string | null;
  button2Text: string | null;
  button2Link: string | null;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch("/api/slides")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSlides(data);
      });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [current]);

  if (slides.length === 0) {
    return (
      <section className="flex min-h-[90vh] items-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-4xl font-black text-white sm:text-6xl">به آکادمی زبان خوش آمدید</h1>
          <p className="mt-4 text-xl text-blue-100">برای شروع، اسلایدها را از پنل مدیریت اضافه کنید</p>
        </div>
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Background */}
      {slide.backgroundType === "video" ? (
        <video
          src={slide.backgroundUrl}
          autoPlay
          muted
          loop
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 animate-ken-burns"
          style={{ backgroundImage: `url(${slide.backgroundUrl})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-blue-900/80 via-blue-900/50 to-slate-950/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 w-full">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-4xl font-black text-white leading-tight sm:text-6xl sm:leading-tight">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="mt-6 text-xl text-blue-100 leading-relaxed">{slide.subtitle}</p>
          )}
          {(slide.button1Text || slide.button2Text) && (
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {slide.button1Text && slide.button1Link && (
                <Link
                  href={slide.button1Link}
                  className="rounded-2xl bg-amber-400 px-8 py-4 font-bold text-slate-900 hover:bg-amber-300 transition-all text-lg text-center shadow-xl shadow-amber-400/30"
                >
                  {slide.button1Text}
                </Link>
              )}
              {slide.button2Text && slide.button2Link && (
                <Link
                  href={slide.button2Link}
                  className="rounded-2xl border-2 border-white/30 px-8 py-4 font-bold text-white hover:bg-white/10 transition-all text-lg text-center"
                >
                  {slide.button2Text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative h-2 rounded-full transition-all overflow-hidden"
            style={{ width: i === current ? "2.5rem" : "0.5rem" }}
          >
            <span className="absolute inset-0 rounded-full bg-white/40" />
            {i === current && (
              <span
                className="absolute inset-0 rounded-full bg-amber-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}