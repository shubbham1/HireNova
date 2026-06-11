import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-4">
        <div
          className="
          w-full
          max-w-lg
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-lg
          p-4
        "
        >
          <form onSubmit={submitHandler}>
            {/* TOP */}
            <div className="flex items-center gap-4 mb-4">
              <Button
                type="button"
                onClick={() => navigate("/admin/companies")}
                variant="outline"
                className="flex items-center gap-2 text-gray-500 font-semibold rounded-xl h-9"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>

              <h1 className="font-bold text-2xl">Company Setup</h1>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="block mb-1 text-base font-semibold text-gray-700">
                  Company Name
                </Label>

                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="h-9 rounded-xl"
                />
              </div>

              <div>
                <Label className="block mb-1 text-base font-semibold text-gray-700">
                  Description
                </Label>

                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="h-9 rounded-xl"
                />
              </div>

              <div>
                <Label className="block mb-1 text-base font-semibold text-gray-700">
                  Website
                </Label>

                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  className="h-9 rounded-xl"
                />
              </div>

              <div>
                <Label className="block mb-1 text-base font-semibold text-gray-700">
                  Location
                </Label>

                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="h-9 rounded-xl"
                />
              </div>

              <div>
                <Label className="block mb-1 text-base font-semibold text-gray-700">
                  Logo
                </Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="rounded-xl h-9"
                />
              </div>
            </div>

            {/* BUTTON */}
            {loading ? (
              <Button
                className="
                w-full
                h-9
                mt-4
                rounded-xl
                text-base
                font-semibold
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                text-white
              "
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="
                w-full
                h-9
                mt-4
                rounded-xl
                text-base
                font-semibold
               bg-black
               hover:bg-gray-900
                transition-all
                duration-300
                text-white
              "
              >
                Update
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default CompanySetup;
