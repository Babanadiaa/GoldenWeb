import { CiHeart } from "react-icons/ci";
import { useState, useEffect } from "react";

interface FavoriteButtonProps {
    productId: number;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]") as number[];
        setIsFavorite(favorites.includes(productId));
    }, [productId]);

    const toggleFavorite = () => {
        setIsFavorite(prev => {
            const newState = !prev;

            let favorites = JSON.parse(localStorage.getItem("favorites") || "[]") as number[];

            if (newState) {
                // додаємо лише якщо ще немає
                if (!favorites.includes(productId)) {
                    favorites.push(productId);
                }
            } else {
                // видаляємо
                favorites = favorites.filter(id => id !== productId);
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));

            return newState;
        });
    };

    return (
        <CiHeart
            className={`cursor-pointer text-2xl ${isFavorite ? "text-red-500" : "text-gray-500"}`}
            onClick={toggleFavorite}
        />
    );
}
