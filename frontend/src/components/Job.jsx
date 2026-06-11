import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();

    const timeDifference = currentTime - createdAt;

    return Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100
      cursor-pointer min-h-[350px] flex flex-col justify-between overflow-hidden"
    >

      {/* Top */}
      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-500">
          {job?.createdAt
            ? daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`
            : "Recently posted"}
        </p>

        <Button  onClick={() => alert("Job saved Successfully ") }
          variant="outline"
          className="rounded-full h-8 w-8 p-0"
          size="icon"
        >
          <Bookmark
           className="w-4 h-4 " />
        </Button>

      </div>

      {/* Company */}
      <div className="flex items-center gap-3 mt-4 min-w-0">

        <Avatar className="h-12 w-12 min-w-[48px] min-h-[48px] border border-gray-200">
          <AvatarImage
            src={job?.company?.logo || ""}
            alt={job?.company?.name}
            className="object-cover w-full h-full rounded-full"
          />

          <AvatarFallback>
            {job?.company?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h1 className="font-medium text-lg truncate">
            {job?.company?.name || "Company"}
          </h1>

          <p className="text-sm text-gray-500 truncate">
            {job?.location || "India"}
          </p>
        </div>

      </div>

      {/* Job Info */}
      <div className="mt-3">

        <h1 className="font-bold text-lg my-2 line-clamp-1">
          {job?.title}
        </h1>

        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>

      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap mt-4">

        <Badge className="text-blue-700 font-bold border border-gray-200 bg-gray-50">
          {job?.position} Positions
        </Badge>

        <Badge className="text-red-700 font-bold border border-gray-200 bg-gray-50">
          {job?.jobType}
        </Badge>

        <Badge className="text-purple-700 font-bold border border-gray-200 bg-gray-50">
          {job?.salary} LPA
        </Badge>

      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-5">

        <Button
          onClick={() =>
            navigate(`/description/${job?._id}`)
          }
          variant="outline"
        >
          Details
        </Button>

        <Button
        onClick={() => alert("Job saved Successfully ") }
         className="bg-purple-700 hover:bg-purple-800 ">
          Save for later
        </Button>

      </div>

    </div>
  );
};

export default Job;