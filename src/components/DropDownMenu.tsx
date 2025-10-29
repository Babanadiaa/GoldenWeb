import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
    label: string;
    children?: string[];
}

interface DropdownProps {
    menu: MenuItem[];
    label?: string;
}

export default function DropdownMenu({ menu, label = "Menu" }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    // Закриття меню при кліку поза компонентом
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
                setActiveIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full px-4 py-2 "
            >
                {label}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute top-full lg:translate-x-[-50%] mt-1 lg:w-[590px] lg:h-[300px] lg:p-8 p-4 h-screen w-[320px] bg-white shadow-lg flex z-10"
                    >
                        {/* Ліва панель */}
                        <div className="w-1/2 border-r">
                            {menu.map((item, index) => (
                                <motion.div
                                    key={index}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className="py-2 cursor-pointer font-semibold"
                                    whileHover={{ backgroundColor: "rgba(243,244,246,1)" }} // Tailwind gray-100
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.label} {item.children && <span className="ml-2">&#9656;</span>}
                                </motion.div>
                            ))}
                        </div>

                        {/* Права панель */}
                        <div className="w-1/2 p-2">
                            {activeIndex !== null &&
                                menu[activeIndex]?.children?.map((child, cIndex) => (
                                    <motion.div
                                        key={cIndex}
                                        className="px-2 py-1 cursor-pointer"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        whileHover={{ backgroundColor: "rgba(243,244,246,1)" }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {child}
                                    </motion.div>
                                ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
