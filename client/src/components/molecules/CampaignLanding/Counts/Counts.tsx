'use client'
import { useEffect, useRef, useState } from 'react';
import { animate, useMotionValue, AnimationPlaybackControls } from 'framer-motion';
import { countData } from './Counts.data';
import bgImage from '@/assets/images/campaign/count_bg.png';

export default function Counts() {
  const controlsRefs = [
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
  ];
  const animValues = countData.map(() => useMotionValue(0));
  const animationControls = useRef<AnimationPlaybackControls[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (controlsRefs[0].current) {
      observer.observe(controlsRefs[0].current);
    }

    return () => {
      if (controlsRefs[0].current) {
        observer.unobserve(controlsRefs[0].current);
      }
    };
  }, []);

  const formatCount = (value: number): string => {
    return value === 3 ? `${value.toFixed(0)}k+` : `${value.toFixed(0)}+`;
  };

  useEffect(() => {
    if (isVisible) {
      animationControls.current = countData.map((data, index) => {
        return animate(animValues[index], data.count || 0, {
          duration: 1,
          onUpdate: (value) => {
            if (controlsRefs[index].current) {
              controlsRefs[index].current.textContent = formatCount(value);
            }
          },
        });
      });
    } else {
      animationControls.current.forEach((control) => control.stop());
    }

    return () => {
      animationControls.current.forEach((control) => control.stop());
    };
  }, [isVisible, animValues]);

  return (
    <div
      className="
        flex flex-col items-center
        py-16 md:py-24
        gap-8 md:gap-20
        w-full px-4 md:px-8
      "
      style={{
        backgroundImage: `url('${bgImage?.src}')`,
        backgroundSize: 'cover',
      }}
    >
      <h1
        className="
          text-center font-extrabold text-text-black-700
          text-[1.4rem] sm:text-[2rem] xl:text-[2.6rem]
          max-w-full md:max-w-[70%] xl:max-w-[60%] heading-section-title
        "
      >
        Are You Seeking For Your Next Nanny, Full / Part-time Housemaid in Dubai?
      </h1>

      <div
        className="
          flex flex-col md:flex-row
          w-full md:w-[60%] xl:w-[55%]
          gap-8 md:gap-0 justify-between
        "
      >
        {countData.map((items, index) => (
          <div
            key={items.count}
            className="flex flex-col items-center"
          >
            <h2
              ref={controlsRefs[index]}
              className="
                text-[#FF6F51]
                text-[3.5rem] md:text-[2.8rem] xl:text-[3.3rem]
                font-bold
              "
            >
              {formatCount(animValues[index].get())}
            </h2>
            <p
              className="
                font-medium
                text-[1.5rem] md:text-[1rem] xl:text-[1.3rem]
              "
            >
              {items.head}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
