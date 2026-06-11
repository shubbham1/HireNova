import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { JOB_API_POINT } from "@/utils/constant";

const EditJob = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
  });

  // fetch single job
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_POINT}/get/${params.id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setInput({
            title: res.data.job.title,
            description: res.data.job.description,
            requirements: res.data.job.requirements,
            salary: res.data.job.salary,
            location: res.data.job.location,
            jobType: res.data.job.jobType,
            experienceLevel: res.data.job.experienceLevel,
            position: res.data.job.position,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, []);

  // input change handler
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // update job
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${JOB_API_POINT}/update/${params.id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        alert("Job updated successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen my-10">
      <form
        onSubmit={submitHandler}
        className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
      >
        <h1 className="font-bold text-xl mb-5">Edit Job</h1>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={changeEventHandler}
            placeholder="Title"
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Description"
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="requirements"
            value={input.requirements}
            onChange={changeEventHandler}
            placeholder="Requirements"
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="salary"
            value={input.salary}
            onChange={changeEventHandler}
            placeholder="Salary"
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="location"
            value={input.location}
            onChange={changeEventHandler}
            placeholder="Location"
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="jobType"
            value={input.jobType}
            onChange={changeEventHandler}
            placeholder="Job Type"
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="experienceLevel"
            value={input.experienceLevel}
            onChange={changeEventHandler}
            placeholder="Experience Level"
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="position"
            value={input.position}
            onChange={changeEventHandler}
            placeholder="No of Position"
            className="border p-2 rounded"
          />
        </div>

        <button className="w-full my-4 bg-black text-white p-2 rounded">
          Edit Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
