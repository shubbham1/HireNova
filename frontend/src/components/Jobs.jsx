import React from "react";
import Navbar from "./ui/shared/navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {

  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector(
    (store) => store.job
  );

  console.log("Search Query:", searchedQuery);
  console.log(allJobs);

  // FILTER LOGIC
  const filteredJobs = searchedQuery
    ? allJobs.filter((job) => {

        const title = job?.title?.toLowerCase() || "";
        const location = job?.location?.toLowerCase() || "";

        const searchText = searchedQuery.toLowerCase();

        return (
          title.includes(searchText) ||
          location.includes(searchText)
        );
      })
    : allJobs;

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">

        <div className="flex gap-5 ml-10">

          {/* FILTER SIDEBAR */}
          <div className="w-[15%] pl-0 ml-0">
            <FilterCard />
          </div>

          {/* JOBS SECTION */}
          {filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] min-h-screen pb-5">

              <div className="grid grid-cols-3 gap-4">

                {filteredJobs.map((job) => (
                  <div key={job?._id}>
                  
                    <Job job={job} />
                  </div>
                ))}

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Jobs;