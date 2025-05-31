import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({item}) => {
    const {image,price,description,name,_id} = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()
    const [,refetch] = useCart();


    const handleAddToCart = () => {
   
        if(user && user.email){
        //   console.log(food,user.email);

          const cartItem = {
            menuId: _id,
            email: user.email,
            name,
            image,
            price,
          }

          axiosSecure.post('/carts',cartItem)
          .then(res => {
            // console.log(res.data);
            if(res.data.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${name} added to your cart`,
                    showConfirmButton: false,
                    timer: 1500
                  });

                  //refetch cart to update the cart items count
                  refetch();
            }
          })
        }
        else{
            Swal.fire({
                title: "You are not logged In",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
              }).then((result) => {
                if (result.isConfirmed) {
                  //send the user to the login page
                  navigate('/login',{state:{from:location}})
                }
              });
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    className="w-full h-60 object-cover"
                    src={image}
                    alt="Shoes" />
            </figure>
                <p className='right-0 mr-4 mt-4 px-2 py-1 rounded-md absolute bg-slate-900 text-white'>${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p className="text-center">{description}</p>
                <div className="card-actions justify-end">
                <button onClick={handleAddToCart} className='btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-yellow-600'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;