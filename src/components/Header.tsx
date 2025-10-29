import { BsTelephone } from "react-icons/bs";
import { CiHeart, CiUser } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { useState } from "react";
import SearchBar from "./SearchBar";
import DropdownMenu from "./DropDownMenu";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menu = [
        { label: "Фрукти", children: ["Яблука", "Банани", "Груші"] },
        { label: "Овочі", children: ["Помідори", "Огірки"] },
        { label: "Напої", children: ["Вода", "Сік", "Кава"] },
        { label: "Фрукти", children: ["Яблука", "Банани", "Груші"] },
        { label: "М'єсо", children: ["Курча", "Свинина", "Банани", "Груші"] },

    ];

    return (
        <header className="w-full text-gray-700 fixed top-0  bg-white z-50 shadow-sm" id="header">
            {/* Top bar */}
            <div className="flex justify-between items-center  text-xs sm:text-sm border-b border-gray-300 px-2 sm:px-6 py-1 sm:py-2">
                <ul className="hidden sm:flex gap-3 sm:gap-6">
                    <li><a href="#">Про нас</a></li>
                    <li><a href="#">Відгуки</a></li>
                    <li><a href="#">Оплата та доставка</a></li>
                    <li><a href="#">Обмін та повернення</a></li>
                    <li><a href="#">Блог</a></li>
                </ul>
                <div className="flex sm:hidden gap-2">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="px-2 py-1 border rounded"
                    >
                        Меню
                    </button>
                </div>
            </div>

            {/* Main header */}
            <div className=" flex justify-between items-center px-2 sm:px-6 py-2 sm:py-4">
                <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                    <BsTelephone />
                    <span className="text-xs sm:text-sm">UA / EN</span>
                </div>

                <h1 className="text-center text-lg sm:text-xl font-semibold">LOGO</h1>

                <div className="flex justify-end items-center gap-2 sm:gap-4 text-lg sm:text-xl">
                    <div className="w-20 sm:w-40">
                        <SearchBar />
                    </div>
                    <button><CiHeart /></button>
                    <button><CiUser /></button>
                    <button><IoBagOutline /></button>
                </div>
            </div>

            {/* Nav menu */}
            <nav className="border-t border-gray-300">
                {/* Desktop menu */}
                <div className="hidden sm:flex justify-center gap-4 md:gap-8 px-2 sm:px-6 py-1">
                    {menu.map((item, idx) => (
                        <DropdownMenu key={idx} menu={menu} label={item.label} />
                    ))}
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden flex flex-col gap-2 px-2 py-2 border-t border-gray-300">
                        {menu.map((item, idx) => (
                            <DropdownMenu key={idx} menu={menu} label={item.label} />
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}
