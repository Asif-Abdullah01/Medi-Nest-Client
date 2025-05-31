import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from './../Shared/Cover';
import menuImg from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useMedicines from '../../hooks/useMedicines';
import MenuCategory from './MenuCategory/MenuCategory';
import img1 from '../../assets/menu/01.jpg'
import img2 from '../../assets/menu/02.jpg'
import img3 from '../../assets/menu/03.jpg'
import img4 from '../../assets/menu/04.jpg'
import img5 from '../../assets/menu/05.jpg'
import img6 from '../../assets/menu/06.jpg'

const Menu = () => {
    const [medicine] = useMedicines();
    const desserts = medicine.filter(item => item.category === 'tablet')
    const syrups = medicine.filter(item => item.category === 'syrup')
    const capsules = medicine.filter(item => item.category === 'capsule')
    const injections = medicine.filter(item => item.category === 'injection')
    const offered = medicine.filter(item => item.category === 'ointment')


    return (
        <div>
            <Helmet>
                <title>Medi Nest | Medicine</title>
            </Helmet>
            {/* main cover */}
            <Cover img={menuImg} title={"Our Medicines"}></Cover>
            <SectionTitle subHeading={"24/7 Hours"} heading={"Order Any Time"}></SectionTitle>
            

            <MenuCategory items={offered}></MenuCategory>


            <MenuCategory img={img3} items={desserts} title={"tablets"}></MenuCategory>


            <MenuCategory items={injections} img={img1} title={"syrups"}></MenuCategory>
         

            <MenuCategory items={capsules} img={img2} title={"capsules"}></MenuCategory>
         
            {/* Soups menu items */}
            <MenuCategory items={syrups} img={img3} title={"injections"}></MenuCategory>


        </div>
    );
};

export default Menu;