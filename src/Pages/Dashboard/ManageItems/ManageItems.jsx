import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMedicines from '../../../hooks/useMedicines';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {

    const [menu, , refetch] = useMedicines();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {


                const res = await axiosSecure.delete(`/medicines/${item._id}`)
                // console.log(res.data);

                if (res.data.deletedCount) {

                    //refetch
                    refetch();

                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted`,
                        icon: "success"
                    });
                }





            }
        });
    }

    const handleUpdate = item => {

    }

    return (
        <div>
            <SectionTitle heading={'manage all items'} subHeading={'Hurry Up'}></SectionTitle>


            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, idx) =>
                                    <tr key={item._id}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {item.name}

                                        </td>
                                        {/* <td className='text-right'>${item.price}</td> */}
                                        <td>${item.price}</td>
                                        <td>
                                            <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button className="btn btn-ghost btn-md bg-orange-600">
                                                <FaEdit className='text-white text-2xl'></FaEdit>
                                            </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-md bg-red-600">
                                                <FaTrashAlt className='text-white text-xl'></FaTrashAlt>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }



                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;