import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';


//add publishable key
//1
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)


const Payment = () => {

    return (
        <div>
            <SectionTitle heading={'payment'} subHeading={'Please Pay to eat'}></SectionTitle>

            <div>
                {/* 2 */}
                <Elements stripe={stripePromise}>
                    {/* 3 */}
                    <CheckOutForm></CheckOutForm> 
                </Elements>


            </div>
        </div>
    );
};

export default Payment;