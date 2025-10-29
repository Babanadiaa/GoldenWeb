import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Tabs from '../components/Tabs';

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    price_without_discount?: number;
    available: boolean;
    new?: boolean;
    top?: boolean;
}

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeTab, setActiveTab] = useState<string>("all");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/search/?query=product")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    // 🔍 Фільтрація товарів за табом
    const filteredProducts = products.filter(product => {
        if (activeTab === "all") return true;
        if (activeTab === "new") return product.new;
        if (activeTab === "top") return product.top;
        return true;
    });

    return (
        <section className="flex flex-col items-center max-w-7xl mx-auto p-4 gap-8">
            {/* ✅ Tabs зверху */}
            <Tabs
                tabs={[
                    { id: "all", label: "Усі товари" },
                    { id: "new", label: "Новинки" },
                    { id: "top", label: "Топ продажу" },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {/* ✅ Сітка з товарами */}
            <ProductCard data={filteredProducts} />

            <button className="text-sm hover:underline border p-3 w-full max-w-[300px]">
                Переглянути всі знижки
            </button>
        </section>
    );
}
