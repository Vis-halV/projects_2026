"use client";

import { useState } from "react";
import { 
    ChartColumnBigIcon, 
    ChevronLeftIcon, 
    ChevronRightIcon, 
    HomeIcon, 
    SettingsIcon, 
    UserIcon 
} from "lucide-react";
import { motion, stagger } from "motion/react";
import { delay } from "motion";

export function Sidebar() {
    
    const [isOpen, setIsOpen] = useState(true);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    const links = [
        {
            name: "Home",
            href: "/",
            icon: <HomeIcon />,
        },
        {
            name: "Analytics",
            href: "/analytics",
            icon: <ChartColumnBigIcon />,
        },
        {
            name: "Users",
            href: "/users",
            icon: <UserIcon />,
        },
        {
            name: "Settings",
            href: "/settings",
            icon: <SettingsIcon />,
        },
    ]

    const sidebarVariant = {
        open: {
            width: "16rem",
        },
        closed: {
            width: "4.5rem",
        }        
    }

    const parentVariant = {
        open: {
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            }
        }, 
        closed: {
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            }
        }
    }

    const childVariant = {
        open: {
            opacity: 1,
            y: 0,
        },
        closed: {
            opacity: 0,
            y: -10,
        }
    }

    return(
        <motion.div 
        initial={false}
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        transition={{
            duration: 0.3,
        }}
        className="border-r border-neutral-100 h-full">
            {/* <motion.nav 
            initial={false}   
            animate={isOpen ? "open" : "closed"}
            variants={sidebarVariant}
            transition={{
                duration: 0.3,
            }}
            className="bg-white shadow-md h-full" 
            > */}
            <motion.nav 
            variants={sidebarVariant}
            className="bg-white shadow-md h-full">
                <div className="p-4 flex justify-between items-center gap-2">
                    <h2 className={`text-xl font-semibold ${!isOpen && "sr-only"}`}>
                        Dashboard
                    </h2>
                    <button
                        onClick={toggleSidebar}
                        className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 focus:outline-none"
                        aria-label={isOpen ? "Close sidebar" : "Open Sidebar"}
                    >
                        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </button>
                </div>
                <div className="relative">
                    <nav className="p-4">
                        <motion.ul 
                        variants={parentVariant}
                        className="space-y-2">
                            {links.map((link) => (
                                <motion.li
                                    variants={childVariant}
                                    key={link.href}
                                    className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200 gap-2"
                                    title={!isOpen ? link.name : ""}
                                >
                                    {link.icon}
                                    {isOpen && link.name}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </nav>
                </div>
            </motion.nav>
        </motion.div>
    );
}