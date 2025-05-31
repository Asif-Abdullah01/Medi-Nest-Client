import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/home/01.jpg';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.jpg';
import img4 from '../../../assets/home/04.jpg';
import img5 from '../../../assets/home/05.jpg';

const Banner = () => {
    const banners = [
        {
            img: img1,
            text: "Trusted Medicines from Verified Vendors"
        },
        {
            img: img2,
            text: "24/7 Health Support & Fast Delivery"
        },
        {
            img: img3,
            text: "Affordable & Genuine Healthcare Products"
        },
        {
            img: img4,
            text: "Secure Payment Gateway for Safe Transactions"
        },
        {
            img: img5,
            text: "Easy Returns & Customer Satisfaction Guarantee"
        }
    ];

    return (
        <div className="mx-auto w-full max-w-screen-xl rounded-lg shadow-lg overflow-hidden">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={5000}
                transitionTime={1000}
            >
                {banners.map((slide, index) => (
                    <div key={index} className="relative">
                        <img
                            src={slide.img}
                            alt={`Slide ${index + 1}`}
                            className="h-[60vh] object-cover w-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center px-4 text-center">
                            <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
                                {slide.text}
                            </h2>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
