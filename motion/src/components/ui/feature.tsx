"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { RocketIcon } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

const Backgrounds = ["#16A34A", "#2563EB", "#DC2626"];

export function Feature() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [background, setBackground] = useState(Backgrounds[0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Backgrounds.length - 1,
      Math.floor(latest * Backgrounds.length),
    );

    setBackground(Backgrounds[index]);
  });

  return (
    <motion.section
      ref={containerRef}
      animate={{ backgroundColor: background }}
      className="flex min-h-screen items-center justify-center transition-colors duration-500"
    >
      <div className="mx-auto flex max-w-6xl flex-col">
        {Features.map((feature) => (
          <Card key={feature.title} feature={feature} />
        ))}
      </div>
    </motion.section>
  );
}

type CardProps = {
  feature: FeatureType;
};

function Card({ feature }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0, 1, 1, 0],
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [10, 0, 0, 10],
  );

  return (
    <div
      ref={ref}
      className="grid min-h-screen grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-2"
    >
      <motion.div
        style={{
          y,
          opacity,
          filter: useMotionTemplate`blur(${blur}px)`,
        }}
        className="flex flex-col gap-6"
      >
        {feature.icon}

        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          {feature.title}
        </h2>

        <p className="max-w-md text-lg leading-relaxed text-neutral-300">
          {feature.description}
        </p>
      </motion.div>

      <motion.div
        style={{
          y,
          opacity,
        }}
      >
        {feature.content}
      </motion.div>
    </div>
  );
}

type FeatureType = {
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
};

const Features: FeatureType[] = [
  {
    icon: <RocketIcon className="h-8 w-8 text-neutral-200" />,
    title: "Generate ultra realistic AI images",
    description:
      "Create stunning, production-quality visuals instantly with advanced AI generation.",
    content: (
      <FeatureImage
        src="/feature-1.jpg"
        alt="AI generated artwork"
      />
    ),
  },
  {
    icon: <RocketIcon className="h-8 w-8 text-neutral-200" />,
    title: "Edit photos with cinematic quality",
    description:
      "Enhance portraits, landscapes, and product shots using intelligent AI tools.",
    content: (
      <FeatureImage
        src="/feature-2.jpg"
        alt="Photo editing workspace"
      />
    ),
  },
  {
    icon: <RocketIcon className="h-8 w-8 text-neutral-200" />,
    title: "Build creative projects faster",
    description:
      "Speed up your workflow with powerful automation and modern creative tooling.",
    content: (
      <FeatureImage
        src="/feature-3.jpg"
        alt="Creative development workspace"
      />
    ),
  },
];

type FeatureImageProps = {
  src: string;
  alt: string;
};

function FeatureImage({ src, alt }: FeatureImageProps) {
  return (
    <div className="overflow-hidden rounded-3xl backdrop-blur-sm">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className="rounded-2xl object-cover"
        priority
      />
    </div>
  );
}
