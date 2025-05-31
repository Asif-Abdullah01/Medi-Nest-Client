import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

// Replace these with your actual medicine category images
import tabletImg from '../../../assets/medicine/tablet.jpg';
import syrupImg from '../../../assets/medicine/syrup.jpg';
import capsuleImg from '../../../assets/medicine/capsule.jpg';
import injectionImg from '../../../assets/medicine/injection.jpg';
import ointmentImg from '../../../assets/medicine/ointment.jpg';

import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section className="mb-16 mt-4">
            <SectionTitle
                subHeading={"Browse by Category"}
                heading={"Medicines Categories"}
            />

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={false} // ✅ removed unwanted left gap
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwipe"
                breakpoints={{ // ✅ responsive support
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                <SwiperSlide>
                    <img src={tabletImg} alt="Tablet" />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Tablet</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={syrupImg} alt="Syrup" />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Syrup</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={capsuleImg} alt="Capsule" />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Capsule</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={injectionImg} alt="Injection" />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Injection</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={ointmentImg} alt="Ointment" />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Ointment</h3>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;
