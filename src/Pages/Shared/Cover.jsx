import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({ img, title }) => {
    return (

        <Parallax
            blur={{ min: -20, max: 20 }}
            bgImage={img}
            bgImageAlt="The Menu"
            strength={-200}
        >

            <div
                className="hero h-[600px]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5">
                            Welcome to MediNest — your trusted platform for reliable medicine delivery from verified sellers.
                        </p>

                    </div>
                </div>
            </div>
        </Parallax>


    );
};

export default Cover;