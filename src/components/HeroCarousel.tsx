'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  titleZh: string;
  titleEn: string;
  subtitleZh?: string;
  subtitleEn?: string;
  image: string;
  link?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  locale: string;
}

export default function HeroCarousel({ slides, locale }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <div className="relative h-[500px] md:h-[600px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">暂无轮播图</p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="relative w-full h-full bg-gray-200">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <div className="absolute inset-0 flex items-center justify-center z-20 text-white text-center px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                  {locale === 'zh' ? slide.titleZh : slide.titleEn}
                </h1>
                {(slide.subtitleZh || slide.subtitleEn) && (
                  <p className="text-lg md:text-xl lg:text-2xl animate-slide-up">
                    {locale === 'zh' ? slide.subtitleZh : slide.subtitleEn}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            )}
          />
        ))}
      </div>
    </div>
  );
}
