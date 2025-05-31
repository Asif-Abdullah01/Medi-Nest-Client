import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { GiMedicines } from 'react-icons/gi';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {

    const { register, handleSubmit ,reset} = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    
    const onSubmit = async(data) => {
        console.log(data)

        const imageFile = {image: data.image[0]}

        //image upload to imgbb and then get an url
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        if(res.data?.success){
            //now send the menu item data to the server with the image url


            const MedicineItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url,
            }


            const menuResponse = await axiosSecure.post('/medicines',MedicineItem)

            console.log(menuResponse.data);

            if(menuResponse.data.insertedId){
                //show success popup
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        }

        console.log("with img url",res.data);

    }


    return (
        <div>
            <SectionTitle heading={'add and item'} subHeading={`What's New?`}></SectionTitle>


            <div>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Medicine Name*</span>

                        </div>
                        <input type="text"
                            {...register('name',{required: true})}
                            required
                            placeholder="Medicine Name" className="input input-bordered w-full" />

                    </label>


                    <div className='flex gap-6'>
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>

                            </div>
                            <select defaultValue={'default'} {...register('category',{required: true})}
                                className="select select-bordered w-full">
                                <option disabled value={'default'}>Select a category</option>
                                <option value="popular">Popular</option>
                                <option value="tablet">Tablet</option>
                                <option value="syrup">Syrup</option>
                                <option value="capsule">Capsule</option>
                                <option value="injection">Injection</option>
                                <option value="ointment">Ointment</option>

                            </select>

                        </label>



                        {/* price */}


                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>

                            </div>
                            <input type="number"
                                {...register('price',{required: true})}
                                placeholder="Price" className="input input-bordered w-full" />

                        </label>


                       



                    </div>


                     {/* Details */}

                    <label className="form-control">
                            <div className="label">
                                <span className="label-text">Details</span>

                            </div>
                            <textarea 
                            {...register('description')}
                            className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                        </label>


                    <div className='form-control w-full my-6'>
                    <input {...register('image',{required: true})} type="file" className="file-input w-full max-w-xs" />
                    </div>


                    <button className='btn bg-yellow-500 text-base'>
                        Add Item <GiMedicines className='ml-2'></GiMedicines>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;