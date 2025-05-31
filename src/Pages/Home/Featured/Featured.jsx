import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'
import { Link } from 'react-router-dom';

const Featured = () => {
  return (
    <div className='featured-item bg-fixed text-white pt-8 my-20'>
      <SectionTitle subHeading={'Don’t Miss'} heading={'Featured Medicine'}></SectionTitle>
      
      <div className='md:flex justify-center items-center bg-slate-700 bg-opacity-70 pb-20 pt-12 px-10 md:px-36 rounded-lg'>
        
        <div className='md:w-1/2'>
          <img src={featuredImg} alt="Featured Medicine" className='rounded-lg shadow-lg' />
        </div>
        
        <div className='md:ml-10 md:w-1/2 mt-6 md:mt-0'>
          <p className='text-sm text-gray-300'>Available Now</p>
          <h3 className='uppercase text-2xl font-semibold mt-1 mb-3'>Paracetamol Tablet</h3>
          <p className='mb-4'>
            Fast-acting pain relief and fever reducer trusted by millions. Ideal for headaches, muscle pain, and cold symptoms.
          </p>
          <p className='font-semibold mb-4 text-xl'>Price: <span className='text-sky-200'>$25.00</span></p>
          
      <button className='btn btn-outline border-0 border-b-4 text-white mt-4 hover:bg-sky-600 hover:text-white transition'>
        <Link to="/order/popular" className="block w-full h-full">
          Order Now
        </Link>
      </button>
        </div>
        
      </div>
    </div>
  );
};

export default Featured;