import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { USER_API_POINT } from "@/utils/constant";

const useGetCurrentUser = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchCurrentUser = async () => {

      try {

        const res = await axios.get(
          `${USER_API_POINT}/profile`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentUser();

  }, []);

};


export default useGetCurrentUser;