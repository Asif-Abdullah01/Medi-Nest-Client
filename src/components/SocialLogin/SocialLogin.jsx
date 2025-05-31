import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from './../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {

    const axiosPublic = useAxiosPublic();
    const {googleSignIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(res => {
            console.log(res.user);

            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName
            }

            axiosPublic.post('/users',userInfo)
            .then(res => {
                console.log(res.data);
            })



            navigate(from,{replace: true});
        })
    }
    

    return (
        <div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn bg-blue-300">
                    <FaGoogle></FaGoogle>
                    Login With Gogle
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;