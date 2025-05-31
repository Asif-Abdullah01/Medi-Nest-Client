import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://medi-nest-server-seven.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;