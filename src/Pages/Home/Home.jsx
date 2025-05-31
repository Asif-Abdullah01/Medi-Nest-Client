import React from 'react';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import PopularMedicines from './PopularMedicines/PopularMedicines';
import Featured from './Featured/Featured';
import Testimonials from './Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMedicines></PopularMedicines>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;