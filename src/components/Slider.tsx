import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';

interface Slide {
    id: number;
    image: string;
    title?: string;
}

export default function Slider() {
    const [slides, setSlides] = useState<Slide[]>([]);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axios.get('http://localhost:8000/main_slider/');
                setSlides(response.data);
            } catch (error) {
                console.error('Error fetching slides:', error);
            }
        };
        fetchSlides();
    }, []);

    return (
        <Swiper
            navigation
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            speed={800}
            className="mySwiper"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                    <motion.img
                        src={slide.image}
                        alt={slide.title || 'slide'}
                        className="w-full h-[400px] object-cover rounded-lg"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
