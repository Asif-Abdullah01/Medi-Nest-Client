import React from 'react';

const MedicineItem = ({item}) => {
    const {image,price,description,name} = item;
    return (
        <div className='flex space-x-2'>
            <img style={{borderRadius:'0 200px 200px 200px'}} className='w-[105px]' src={image} alt="" />
            <div>
                <h3 className='uppercase'>{name} ----------</h3>
                <p>{description}</p>
            </div>
            <p className='text-yellow-600'>${price}</p>
        </div>
    );
};

export default MedicineItem;