import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = () => {

    const { user } = useAuth();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');


    const stripe = useStripe();
    const elements = useElements();

    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
    const navigate = useNavigate();


    useEffect(() => {
        if (totalPrice > 0) {
            const res = axiosSecure.post('/create_payment_intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement)

        if (card === null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment error!', error);
            setError(error.message)
        }
        else {
            console.log('Payment method', paymentMethod);
            setError('')
        }


        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })


        if (confirmError) {
            console.log('confirm error', confirmError);
        }
        else {
            console.log('payment intent', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
            }


            //now save the payment history in the database

            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(), //utc date convert, we will use moment js to convert in future
                cartIds: cart.map(item => item._id), //array of id niye nilam cart er gular
                MedicineItemIds: cart.map(item => item.menuId),
                status: 'pending'
            }


            const res = await axiosSecure.post('/payments', payment);
            console.log('payment saved', res.data);

            refetch();
            if (res.data?.paymentResult?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thanks for your payment",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/paymentHistory')
            }

        }
    }

    return (


        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />


            <button disabled={!stripe || !clientSecret} className='btn btn-sm btn-success my-4 text-white' type="submit">
                Pay
            </button>

            <p className='text-red-600'>{error}</p>
            {transactionId && <p className='text-green-600 font-bold'>Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;