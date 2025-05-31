import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    console.log('state in the location', location.state);

    const [disabled, setDisabled] = useState(true)


    const { signIn } = useContext(AuthContext)


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "You have successfully logged in",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true });
            })

    }

    const handleValidateCaptcha = (e) => {
        const userCaptchaValue = e.target.value;

        if (validateCaptcha(userCaptchaValue)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
            alert('Captcha not matched')
        }
    }



    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Access your personalized dashboard, track your activities, and enjoy a seamless experience. Please log in with your credentials to continue.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="type the captcha above" className="input input-bordered" required />

                                <p className='mt-3 btn btn-outline btn-xs'>Validate</p>
                            </div>


                            <div className="form-control mt-6">
                                <input disabled={disabled} className='btn btn-primary' type="submit" value={'login'} />
                            </div>
                        </form>

                        <p className='text-center pb-4'><small>New here? <Link className='underline' to={'/signup'}>Create an Account</Link></small></p>

                        <div className='divider px-8'></div>

                        <div className='flex flex-col items-center pb-4'>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>


            </div>

        </>
    );
};

export default Login;