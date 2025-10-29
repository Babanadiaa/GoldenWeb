// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Slider() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axios.get('http://localhost:8000/main_slider/')
                setSlides(response.data);
            } catch (error) {
                console.error('Error fetching slides:', error);
            }
        };
        fetchSlides();
    }, []);

    return (
        <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper   ">
            {slides.map((slide: any) => (
                <SwiperSlide key={slide.id}>
                    <img src={slide.image} alt={slide.title} className="w-full " />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
