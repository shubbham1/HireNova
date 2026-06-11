import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_POINT, APPLICANT_API_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isApplied = singleJob?.applications?.find(
    (application) =>
      application.applicant?._id?.toString() === user?._id.toString() ||
      application.applicant?.toString() === user?.id?.toString(),
  );

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICANT_API_POINT}/apply/${singleJob?._id}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        const updatedJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            {
              applicant: {
                _id: user?._id,
              },
            },
          ],
        };

        dispatch(setSingleJob(updatedJob));

        console.log(updatedJob);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">{singleJob?.title}</h1>

          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>

            <Badge className="text-red-700 font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>

            <Badge className="text-purple-700 font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg text-white font-bold ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">
        Job Description
      </h1>

      <div className="my-4 space-y-3">
        <h1 className="font-bold">
          Role :
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>

        <h1 className="font-bold">
          Location :
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>

        <h1 className="font-bold">
          Description :
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>

        <h1 className="font-bold">
          Experience :
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} Years
          </span>
        </h1>

        <h1 className="font-bold">
          Salary :
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>

        <h1 className="font-bold">
          Total Applicants :
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>

        <h1 className="font-bold">
          Posted Date :
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
