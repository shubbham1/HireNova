import React, { useEffect } from "react";
import Navbar from "./ui/shared/navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useLocation } from "react-router-dom";

// const randomJobs = [1, 2, 3, 4, 5, 6];

const Browse = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);

  const location = useLocation();
  // get keyword from URL
  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword");

  const dispatch = useDispatch();

  // filter jobs
  const filteredJobs = keyword
    ? allJobs.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase()),
      )
    : allJobs;

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 ml-20 mr-20">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
