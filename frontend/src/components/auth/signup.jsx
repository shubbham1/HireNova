import Navbar from "../ui/shared/navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { USER_API_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";

const Signup = () => {
  const dispatch = useDispatch();

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
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const changeEventhandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex justify-center pt-10 pb-10">
        <form
          onSubmit={submitHandler}
          className=" shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 w-[40%] border border-gray-100 rounded-md p-6 my-10 shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          {/* Full Name */}
          <div className="my-2">
            <Label>Full Name</Label>

            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventhandler}
              placeholder="Enter Your full Name"
              className="mt-2 h-9 rounded-xl focus-visible:ring-2 focus-visible:ring-purple-700 transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div className="my-2">
            <Label>Email</Label>

            <Input
              type="email"
              value={input.email}
              name="email"
              autoComplete="new-password"
              onChange={changeEventhandler}
              placeholder="Enter your mail address"
              className="mt-2  h-9 rounded-xl focus-visible:ring-2 focus-visible:ring-purple-700 transition-all duration-200"
            />
          </div>

          {/* Phone Number */}
          <div className="my-2">
            <Label>Phone Number</Label>

            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventhandler}
              className="mt-2 h-9 rounded-xl focus-visible:ring-2 focus-visible:ring-purple-700 transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="my-2">
            <Label>Password</Label>

            <div className="relative mt-2">
              <Input
                type={showPassword ? "text" : "password"}
                value={input.password}
                name="password"
                onChange={changeEventhandler}
                placeholder="*********"
                className="mt-2 h-9 rounded-xl focus-visible:ring-2 focus-visible:ring-purple-700 transition-all duration-200"
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

          {/* Role Selection */}
          <RadioGroup className="flex items-center gap-4 my-5 w-full">
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

            <div className="flex items-center gap-2 flex-1 ml-10">
              <Label className="text-lg">Profile</Label>

              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer w-full"
              />
            </div>
          </RadioGroup>

          {/* Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className=" text-lg font-medium w-full bg-black text-white py-5 rounded-md hover:bg-purple-700 hover:scale-[1.02] transition-all duration-200"
            >
              Signup
            </Button>
          )}

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/Login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
