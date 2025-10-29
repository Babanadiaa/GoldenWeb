import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
    id: number;
    name: string;
    image: string;
    price: number;
    price_without_discount?: number;
    available: boolean;
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [open, setOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 400);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // --- debounce запит до бекенду ---
    useEffect(() => {
        if (debouncedQuery.length > 2) {
            axios
                .get<SearchResult[]>(`http://127.0.0.1:8000/search/?query=${debouncedQuery}`)
                .then((res) => {
                    setResults(res.data);
                    setOpen(true);
                });
        } else {
            setResults([]);
            setOpen(false);
        }
    }, [debouncedQuery]);

    // --- закриття при кліку поза вікном пошуку ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
            <div className="flex items-center bg-gray-100 w-full p-2 text-sm rounded">
                <input
                    type="text"
                    placeholder="Пошук..."
                    className="outline-none flex-1 bg-gray-100 w-full"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => results.length > 0 && setOpen(true)}
                />
                <IoIosSearch className="text-gray-500 text-xl mr-2" />
            </div>

            <AnimatePresence>
                {open && results.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute flex flex-col gap-2 top-full shadow-2xl left-[-85px] w-[375px] bg-white rounded mt-2 p-5 pt-0 overflow-y-auto max-h-[550px] z-10"
                    >
                        {results.slice(0, 5).map((item) => (
                            <motion.li
                                key={item.id}
                                className="p-2 flex cursor-pointer rounded transition-all"
                                whileHover={{ backgroundColor: "rgba(243,244,246,1)" }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                onClick={() => console.log("Вибрано:", item.name)}
                            >
                                <img src={item.image} alt="product image" className="h-[70px] rounded" />
                                <div className="flex flex-col justify-between ml-2">
                                    <span className="text-sm">{item.name}</span>
                                    <div className="price flex">
                                        <span className="text-sm uppercase">{item.price} UAH</span>
                                        {item.price_without_discount && (
                                            <span className="text-gray-400 uppercase line-through text-sm ml-1">
                                                {item.price_without_discount} UAH
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-gray-400">
                                        {item.available ? "В наявності" : "Немає в наявності"}
                                    </span>
                                </div>
                            </motion.li>
                        ))}
                        <motion.button
                            className="text-sm hover:underline border p-3 mt-2 rounded"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => console.log("Переглянути всі результати")}
                        >
                            Переглянути всі результати
                        </motion.button>
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
