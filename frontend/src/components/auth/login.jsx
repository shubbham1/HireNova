import Navbar from "../ui/shared/navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (showPassword) {
      const timer = setTimeout(() => {
        setShowPassword(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showPassword]);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Input Change
  const changeEventhandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("LOGIN RESPONSE:", res.data);
      console.log("USER:", res.data.user);

      if (res.data.success) {
        dispatch(setUser(res.data.user));

        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-white-100">
      {/* Navbar */}
      <Navbar />

      {/* Login Container */}
      <div className="flex items-center justify-center min-h-screen bg-white overflow-hidden">
        {/* Form */}
        <form
          onSubmit={submitHandler}
          className=" shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 w-[40%] border border-gray-100 rounded-md p-6 my-10"
        >
          {/* Heading */}
          <h1 className="font-bold text-3xl mb-5">Login</h1>

          {/* Email */}
          <div className="mb-3">
            <Label className="text-base font-semibold">Email</Label>

            <Input
              type="email"
              name="email"
              value={input.email}
              autoComplete="email"
              onChange={changeEventhandler}
              placeholder="abc@gmail.com"
              className="mt-2"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <Label className="text-base font-semibold">Password</Label>

            <div className="relative mt-2">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={changeEventhandler}
                placeholder="password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {/* Role */}
          <div className="flex items-center gap-6 mb-8">
            {/* Student */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventhandler}
                className="cursor-pointer"
              />

              <Label htmlFor="student">Student</Label>
            </div>

            {/* Recruiter */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventhandler}
                className="cursor-pointer"
              />

              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </div>

           { 
           loading ? (
            <button
              type="button"
              className="w-full my-4 bg-black text-white py-2 rounded-md flex items-center justify-center"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className=" text-lg font-medium w-full bg-black text-white py-2 rounded-md hover:bg-gray-800  "
            >
              Login
            </button>
          )}
          <span className="text-sm">
            Don't have account?
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
