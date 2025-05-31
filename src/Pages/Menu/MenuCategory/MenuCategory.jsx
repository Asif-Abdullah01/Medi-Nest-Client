import React from 'react';
import MedicineItem from '../../Shared/MedicineItem';
import Cover from '../../Shared/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, img }) => {

    return (
        <div className='pt-8'>
            {
                title && <Cover img={img} title={title}></Cover>
            }
            <div className='grid md:grid-cols-2 gap-12 my-16'>
                {
                    items.map(item => <MedicineItem key={item._id} item={item}></MedicineItem>)
                }
            </div>

            <div className='flex justify-center items-center'>
                {
                    title ? 
                    <Link to={`/order/${title}`}>
                        <button className='btn btn-outline border-0 border-b-4 mt-4'>Order Now</button>
                    </Link> 
                    :
                    <Link to={`/order/popular`}>
                        <button className='btn btn-outline border-0 border-b-4 mt-4'>Order Now</button>
                    </Link>
                }


            </div>

        </div>
    );
};

export default MenuCategory;