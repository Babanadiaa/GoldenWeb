import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

// Типи для продуктів та банерів
interface Product {
    id: number;
    name: string;
    image: string;
    price?: number;
    available?: boolean;
    is_banner?: boolean;
    type?: string;
}

interface Banner {
    type?: "banner";
    is_banner?: boolean;
    image: string;
}

type CategoryItem = Product | Banner;

interface CategoryObject {
    products?: Product[];
    items?: Product[];
    banners?: string[];
    main_image?: string;
}

export default function Category() {
    const [products, setProducts] = useState<Product[]>([]);
    const [banners, setBanners] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch("http://localhost:8000/categories");
                const data: CategoryObject | CategoryItem[] = await res.json();

                // Якщо data — об'єкт
                if (!Array.isArray(data) && typeof data === "object") {
                    if (Array.isArray(data.products)) setProducts(data.products);
                    else if (Array.isArray(data.items)) setProducts(data.items);

                    if (Array.isArray(data.banners)) setBanners(data.banners);
                    else if (data.main_image) setBanners([data.main_image]);
                }

                // Якщо data — масив
                if (Array.isArray(data)) {
                    // Банери
                    const explicitBanners = data
                        .filter((it): it is Banner => !!it && (it.type === "banner" || it.is_banner === true))
                        .map(it => it.image);

                    // Продукти
                    const productsFromArray = data
                        .filter((it): it is Product =>
                            !!it &&
                            "id" in it &&
                            "name" in it &&
                            "image" in it &&
                            !("type" in it && it.type === "banner") &&
                            !(it.is_banner)
                        );

                    if (!products.length) setProducts(productsFromArray);
                    if (explicitBanners.length) setBanners(explicitBanners);
                    else if (data.length >= 3) {
                        const fallbackBanners = [
                            data[data.length - 1]?.image,
                            data[Math.floor(data.length / 2)]?.image,
                        ].filter(Boolean) as string[];
                        if (fallbackBanners.length) setBanners(fallbackBanners);
                    }
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Не вдалося завантажити дані з сервера");
                setLoading(false);
            }
        };

        fetchCategories();
    }, [products.length]);

    if (loading) {
        return (
            <div className="p-6 text-center">
                <div className="inline-block animate-pulse text-gray-500">Завантаження...</div>
            </div>
        );
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">{error}</div>;
    }

    // Вирізаємо 2 продукти для верхнього та нижнього рядів
    const topProducts = products.slice(0, 2);
    const bottomProducts = products.slice(0, 2);

    const topBanner = banners[0] ?? null;
    const bottomBanner = banners[1] ?? null;

    return (
        <div className="max-w-[1200px] mx-auto p-6">
            {/* Заголовок */}
            <header className="text-center mb-8">
                <h1 className="text-sm uppercase tracking-widest">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h1>
                <p className="text-gray-600 text-sm max-w-3xl mx-auto mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </header>

            {/* Верхній ряд: 2 картки зліва, банер праворуч */}
            <section className="flex flex-col lg:flex-row gap-6 lg:items-start items-center mb-12">
                <div className="flex flex-col gap-6 lg:flex-1 w-full">
                    <ProductCard data={topProducts} />
                    <button className="w-full border border-gray-300 text-sm py-2 rounded hover:bg-gray-100">
                        Перейти до категорії
                    </button>
                </div>

                {topBanner && (
                    <div className="w-full lg:w-[600px] h-64 lg:h-[500px] hidden lg:block bg-gray-100 overflow-hidden rounded">
                        <img src={topBanner} alt="banner" className="w-full h-full object-cover" />
                    </div>
                )}
            </section>

            {/* Нижній ряд: банер зліва, 2 картки справа */}
            <section className="flex flex-col lg:flex-row gap-6 lg:items-start items-center">
                {bottomBanner && (
                    <div className="w-full lg:w-[600px] h-64 lg:h-[500px] bg-gray-100 overflow-hidden hidden lg:block rounded order-1 lg:order-0">
                        <img src={bottomBanner} alt="banner" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="flex flex-col gap-6 lg:flex-1 w-full">
                    <ProductCard data={bottomProducts} />
                    <div className="flex justify-center lg:justify-end">
                        <button className="w-full border border-gray-300 text-sm py-2 rounded hover:bg-gray-100">
                            Перейти до категорії
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
