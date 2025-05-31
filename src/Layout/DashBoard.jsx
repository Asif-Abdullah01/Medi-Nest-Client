import React from 'react';
import { FaAd, FaBook, FaCalendar, FaCalendarDay, FaEnvelope, FaFileContract, FaHome, FaList, FaUsers, FaUtensils, FaVoicemail } from 'react-icons/fa';

import { IoCart } from 'react-icons/io5';
import { MdOutlineRestaurantMenu, MdOutlineShoppingBag, MdRateReview } from 'react-icons/md';
import { TbBrandBooking } from 'react-icons/tb';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const DashBoard = () => {
    const [cart] = useCart();

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();


    return (
        <div className='flex'>
            {/* dashboard sidebar */}
            <div className='w-64 min-h-screen bg-yellow-600 font-semibold'>
                <ul className='menu'>
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to={'/dashboard/adminHome'}> <FaHome className='text-white mr-1 text-xl' />Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/addItems'}> <FaUtensils className='text-white mr-1 text-xl' />Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/manageItems'}> <FaList className='text-white mr-1 text-xl' />Manage Items</NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/users'}> <FaUsers
                                        className='text-white mr-1 text-xl' />All Users</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to={'/dashboard/userHome'}> <FaHome className='text-white mr-1 text-xl' />User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/cart'}> <IoCart className='text-white mr-1 text-xl' />My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/paymentHistory'}> <TbBrandBooking className='text-white mr-1 text-xl' />Payment History</NavLink>
                                </li>
                            </>
                    }


                    {/* shared navLinks */}
                    <div className='divider'></div>

                    <li>
                        <NavLink to={'/'}> <FaHome className='text-white mr-1 text-xl' />Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/menu'}> <MdOutlineRestaurantMenu className='text-white mr-1 text-xl' />Medicines</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/popular'}> <MdOutlineShoppingBag className='text-white mr-1 text-xl' />Shop</NavLink>
                    </li>

                </ul>
            </div>

            {/* dashboard content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;