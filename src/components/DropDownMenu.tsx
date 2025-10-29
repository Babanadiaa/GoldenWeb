import { useState, useRef, useEffect } from "react";

interface MenuItem {
    label: string;
    children?: string[];
}

interface DropdownProps {
    menu: MenuItem[];
    label: string;
}

export default function DropdownMenu({ menu }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

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
        <div className="relative " ref={ref}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full "
            >
                Menu
            </button>

            {isOpen && (
                <div className="absolute top-full lg:translate-x-[-50%] mt-1 lg:w-[590px] lg:h-[300px] lg:p-8 p-4 h-screen w-[320px] bg-white shadow-lg flex z-10">
                    {/* Ліва панель */}
                    <div className="w-1/2 border-r">
                        {menu.map((item, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setActiveIndex(index)}
                                className=" py-2 hover:bg-gray-100 cursor-pointer font-semibold"
                            >
                                {item.label} {item.children && <span className="ml-2">&#9656;</span>}
                            </div>
                        ))}
                    </div>

                    {/* Права панель */}
                    <div className="w-1/2 p-2">
                        {activeIndex !== null &&
                            menu[activeIndex]?.children?.map((child, cIndex) => (
                                <div
                                    key={cIndex}
                                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                >
                                    {child}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
