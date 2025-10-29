import { useState } from "react";
import { IoMdStar } from "react-icons/io";
import FavoriteButton from "./FavoriteButton";

interface Product {
    id: number;
    name: string;
    image: string;
    price?: number;
    price_without_discount?: number;
    available?: boolean;
    new?: boolean;
    top?: boolean;
}

interface ProductCardProps {
    data: Product[];
}

export default function ProductCard({ data = [] }: ProductCardProps) {
    const [ratings, setRatings] = useState<{ [key: number]: number }>({});
    const [hover, setHover] = useState<{ [key: number]: number }>({});

    const handleStarClick = (productId: number, starIndex: number) => {
        setRatings(prev => ({ ...prev, [productId]: starIndex }));
    };

    const handleStarHover = (productId: number, starIndex: number) => {
        setHover(prev => ({ ...prev, [productId]: starIndex }));
    };

    const handleStarLeave = (productId: number) => {
        setHover(prev => ({ ...prev, [productId]: 0 }));
    };

    return (
        <div className="flex flex-wrap gap-8 justify-center">
            {data.map(product => {

                return (
                    <div
                        key={product.id}
                        className="relative w-full max-w-[230px] flex flex-col justify-between"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[270px] object-cover mb-4 rounded-lg"
                        />

                        <div className="flex flex-col justify-between flex-1 gap-2">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">{product.name}</span>
                                    <FavoriteButton productId={product.id} />
                                </div>

                                <span className="text-[10px] text-gray-400 block mb-1">
                                    {product.available ? "В наявності" : "Немає в наявності"}
                                </span>

                                <div className="price flex ">
                                    <span className="text-sm uppercase">{product.price} UAH</span>
                                    {product.price_without_discount && (
                                        <span className="text-gray-400 uppercase line-through text-sm ml-1 flex-1">
                                            {product.price_without_discount} UAH
                                        </span>
                                    )}

                                    <div className="flex items-center mt-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <IoMdStar
                                                key={star}
                                                className={`cursor-pointer text-sm ${star <= (hover[product.id] || ratings[product.id] || 0)
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                                onClick={() => handleStarClick(product.id, star)}
                                                onMouseEnter={() => handleStarHover(product.id, star)}
                                                onMouseLeave={() => handleStarLeave(product.id)}
                                            />
                                        ))}
                                    </div>
                                </div>


                            </div>

                            {/* ✅ Кнопка відокремлена й не злипається з текстом */}

                        </div>
                    </div>

                );
            })}
        </div>
    );
}
export type { Product };
