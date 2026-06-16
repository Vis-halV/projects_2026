"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { cn } from "../../lib/utils";
import type { ArchiveEntry } from "../../data/archive";

const archiveContainerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.18,
    },
  },
};

const archiveItemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type ArchiveProps = React.ComponentPropsWithoutRef<"section">;

export const Archive = React.forwardRef<HTMLElement, ArchiveProps>(
  ({ className, ...props }, ref) => {
    return <section ref={ref} className={cn(className)} {...props} />;
  },
);
Archive.displayName = "Archive";

type ArchiveHeaderProps = HTMLMotionProps<"div"> & {
  eyebrow: string;
  title: string;
  description?: string;
};

export const ArchiveHeader = React.forwardRef<HTMLDivElement, ArchiveHeaderProps>(
  ({ className, eyebrow, title, description, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={archiveItemVariants}
        className={cn("mx-auto max-w-3xl text-center", className)}
        {...props}
      >
        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#5e675d]">
          {eyebrow}
        </p>
        <h1 className="text-5xl font-medium uppercase tracking-[0.12em] text-[#1d241d] sm:text-6xl md:text-7xl lg:text-[5.75rem]">
          {title}
        </h1>
        <p className="mx-auto my-16 max-w-2xl text-sm leading-7 text-[#62675f] sm:text-base">
          {description}
        </p>
      </motion.div>
    );
  },
);
ArchiveHeader.displayName = "ArchiveHeader";

type ArchiveListProps = React.ComponentPropsWithoutRef<"div">;

export const ArchiveList = React.forwardRef<HTMLDivElement, ArchiveListProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative mt-16 pb-16 sm:mt-20 sm:pb-16 lg:mt-24 lg:pb-16",
          className,
        )}
        {...props}
      />
    );
  },
);
ArchiveList.displayName = "ArchiveList";

type ArchiveCardProps = ArchiveEntry &
  HTMLMotionProps<"article"> & {
    contentClassName?: string;
  };

export const ArchiveCard = React.forwardRef<HTMLElement, ArchiveCardProps>(
  (
    {
      className,
      contentClassName,
      title,
      description,
      tone,
      align,
      image,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.article
        ref={ref}
        variants={archiveItemVariants}
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className={cn(
          "overflow-hidden rounded-[8px] shadow-[0_24px_50px_rgba(36,41,36,0.08)]",
          tone,
          className,
        )}
        {...props}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "grid gap-8 p-8 sm:p-10 lg:p-12",
              align,
              image ? "items-start" : "items-center",
              contentClassName,
            )}
          >
            <div className="max-w-xl">
              <h2 className="text-4xl leading-none font-medium tracking-[-0.02em] sm:text-5xl lg:text-[4.2rem]">
                {title}
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 opacity-90 sm:justify-self-end sm:text-base">
              {description}
            </p>

            <ArchiveButton />
          </div>

          {image ? (
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
              <div
                className="h-[240px] w-full rounded-[8px] bg-cover bg-center sm:h-[280px] lg:h-[320px]"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ) : null}
        </div>
      </motion.article>
    );
  },
);
ArchiveCard.displayName = "ArchiveCard";

type ArchiveButtonProps = HTMLMotionProps<"a"> & {
  children?: React.ReactNode;
};

export const ArchiveButton = React.forwardRef<HTMLAnchorElement, ArchiveButtonProps>(
  ({ className, children = "Read More", ...props }, ref) => {
    return (
      <motion.a
        ref={ref}
        href="#"
        whileHover="hover"
        initial="rest"
        animate="rest"
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-current px-5 py-3 text-xs uppercase tracking-[0.3em]",
          className,
        )}
        {...props}
      >
        <motion.span
          variants={{
            rest: { scaleX: 0 },
            hover: { scaleX: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 origin-left bg-current"
        />
        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#f8f3ea]">
          {children}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </motion.a>
    );
  },
);
ArchiveButton.displayName = "ArchiveButton";

type ArchiveSectionProps = React.ComponentPropsWithoutRef<"section"> & {
  eyebrow: string;
  title: string;
  description?: string;
  items: ArchiveEntry[];
};

export const ArchiveSection = React.forwardRef<HTMLElement, ArchiveSectionProps>(
  ({ className, eyebrow, title, description, items, ...props }, ref) => {
    const featuredImage = items[1]?.image;

    return (
      <Archive
        ref={ref}
        className={cn(
          "overflow-hidden bg-[#F5F4F0] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28",
          className,
        )}
        {...props}
      >
        <motion.div
          className="mx-auto flex w-full max-w-7xl flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={archiveContainerVariants}
        >
          <ArchiveHeader eyebrow={eyebrow} title={title} description={description} />

          <ArchiveList>
            {items.map((item, index) => (
              <ArchiveCard
                key={`${item.title}-${index}`}
                title={item.title}
                description={item.description}
                tone={item.tone}
                align={item.align}
                image={index === 0 ? featuredImage : item.image}
                className="relative z-20 -mt-12 min-h-[520px]"
              />
            ))}
          </ArchiveList>
        </motion.div>
      </Archive>
    );
  },
);
ArchiveSection.displayName = "ArchiveSection";
