"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { 
    MailIcon, 
    PlusIcon, 
    XIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function Card() {

    const [open, setOpen] = useState(true);

    return(
        <AnimatePresence>
        {open && (
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.98,
                    filter: "blur[10px]",
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur[0px]",
                }}
                exit={{
                    opacity: 0,
                    scale: 0.98,
                    filter: "blur[10px]",
                }} 
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className={cn(
                    "w-72 min-h-[26rem] h-[28rem] bg-white rounded-xl",
                    "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]",
                    "p-4 flex flex-col"
                )}
            >
                <h2 className="font-bold text-[12px]">Visanth Design</h2>
                <p className="text-neutral-400 mt-2 text-[10px]">
                    A collection of beatiful UI Components, let's explore some of them.
                </p>
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1 text-[10px] mt-4 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1"
                    >
                        <Image 
                            width={50} 
                            height={50} 
                            alt="logo" 
                            src="/next.svg" 
                        /> {" "}
                        {/* Vercel */}
                        <XIcon className="h-3 w-3 text-neutral-400" />
                    </button>
                </div>
                <div className="bg-gray-100 flex-1 mt-4 rounded-lg border border-dashed border-neutral-200 relative">
                    <motion.div
                        initial={{
                            opacity:0,
                            scale: 0.98,
                            filter: "blur[10px]",
                        }} 
                        whileHover={{
                            opacity: 1,
                            scale: 1.05,
                            filter: "blur[0px]",
                        }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                        className="absolute inset-0 h-full w-full bg-white border border-neutral-200 rounded-lg divide-y divide-neutral-200">
                        <div className="flex gap-2 p-4">
                            <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br bg-white rounded-md flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1">
                                <MailIcon className="h-4 w-4 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[8px] font-bold text-neutral-600">
                                    Visanth UI Components
                                </p>
                                <p className="text-[8px] mt-1 text-neutral-400">
                                    A collection of UI Components
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 p-4">
                            <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br bg-white rounded-md flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1">
                                <MailIcon className="h-4 w-4 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[8px] font-bold text-neutral-600">
                                    Visanth UI Components
                                </p>
                                <p className="text-[8px] mt-1 text-neutral-400">
                                    A collection of UI Components
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 p-4">
                            <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br bg-white rounded-md flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1">
                                <MailIcon className="h-4 w-4 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[8px] font-bold text-neutral-600">
                                    Visanth UI Components
                                </p>
                                <p className="text-[8px] mt-1 text-neutral-400">
                                    A collection of UI Components
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 p-4">
                            <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br bg-white rounded-md flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1">
                                <MailIcon className="h-4 w-4 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[8px] font-bold text-neutral-600">
                                    Visanth UI Components
                                </p>
                                <p className="text-[8px] mt-1 text-neutral-400">
                                    A collection of UI Components
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 p-4 items-center justify-center">
                            <div className="w-4 h-4 flex-shrink-o bg-gradient-to-br bg-white rounded-md flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
                                <PlusIcon className="h-3 w-3 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-neutral-400 text-[8px] mt-1">Create Project</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        )}
        </AnimatePresence>
    );
}