// components/Marquee.tsx
"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Clone the child nodes and append them again for seamless looping
    const clone = el.cloneNode(true) as HTMLDivElement;
    el.appendChild(clone);

    // Animate both original and cloned content together
    const animation = el.animate(
      [
        { transform: "translateX(0%)" },
        { transform: "translateX(-50%)" },
      ],
      {
        duration: 15000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    return () => {
      animation.cancel();
    };
  }, []);

  const logos = [
    "/logoipsum1.svg",
    "/logoipsum2.svg",
    "/logoipsum4.svg",
    "/logoipsum5.svg",
    "/logoipsum6.svg",
    "/logoipsum7.svg",
    "/logoipsum8.svg",
  ];

  return (
    <div className="overflow-hidden py-6">
      <div
        className="flex w-max gap-20 items-center"
        ref={ref}
        aria-hidden="true"
      >
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`Logo ${index + 1}`}
            width={120}
            height={50}
            className="h-auto w-auto flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}