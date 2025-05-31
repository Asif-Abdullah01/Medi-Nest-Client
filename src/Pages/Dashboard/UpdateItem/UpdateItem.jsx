import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUtensils } from "react-icons/fa";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateItem = () => {
    const { name, category, description, price, _id } = useLoaderData();


    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        console.log(data)

        const imageFile = { image: data.image[0] }

        //image upload to imgbb and then get an url
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        if (res.data?.success) {
            //now send the menu item data to the server with the image url


            const MedicineItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url,
            }


            const menuResponse = await axiosSecure.patch(`/medicines/${_id}`, MedicineItem)

            console.log(menuResponse.data);

            if (menuResponse.data.modifiedCount > 0) {
                //show success popup
                // reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${data.name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        }

        console.log("with img url", res.data);

    }





    return (
        <div>
            <SectionTitle heading={'update an item'} subHeading={'Refresh Info'}></SectionTitle>


            <div>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">description Name*</span>

                        </div>
                        <input type="text" defaultValue={name}
                            {...register('name', { required: true })}
                            required
                            placeholder="description Name" className="input input-bordered w-full" />

                    </label>


                    <div className='flex gap-6'>
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>

                            </div>
                            <select defaultValue={category} {...register('category', { required: true })}
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
                            <input type="number" defaultValue={price}
                                {...register('price', { required: true })}
                                placeholder="Price" className="input input-bordered w-full" />

                        </label>






                    </div>


                    {/* Details */}

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Details</span>

                        </div>
                        <textarea
                            defaultValue={description}
                            {...register('description')}
                            className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                    </label>


                    <div className='form-control w-full my-6'>
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>


                    <button className='btn bg-yellow-500 text-base'>
                        Update Item <FaUtensils className='ml-2'></FaUtensils>
                    </button>
                </form>
            </div>
        </div>


    );
};

export default UpdateItem;