import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMedicines = () => {
  const axiosPublic = useAxiosPublic();

  const { data: medicines = [], isLoading, refetch } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const res = await axiosPublic.get('/medicines');
      return res.data;
    }
  });

  return [medicines, isLoading, refetch];
};

export default useMedicines;
