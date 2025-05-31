import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const SignUp = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // console.log('user profile info updated');

                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database');
                                    reset();
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "User created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                    navigate('/');
                                }
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    }


    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">
                            Create your free account today to start ordering medicines easily and securely. Join our community of satisfied customers and enjoy seamless shopping!
                        </p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600 mt-2 ml-2'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL")} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className='text-red-600 mt-2 ml-2'>Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>

                                {/* {...register("email")} -> ki name register korte chai seta set korbo */}
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600 mt-2 ml-2'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className='text-red-600 mt-2 ml-2'>password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className='text-red-600 mt-2 ml-2'>Password must be 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className='text-red-600 mt-2 ml-2'>Password must be less than 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className='text-red-600 mt-2 ml-2'>Password must have one Uppercase one lower case, one number and one special character.</p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center pb-4'><small>Already have an account? <Link className='underline' to="/login">Login</Link></small></p>

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

export default SignUp;