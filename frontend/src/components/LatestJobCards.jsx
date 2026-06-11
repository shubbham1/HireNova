import { Badge } from "./ui/badge";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const LatestJobCards = ({ job }) => {
  return (
    <div
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 
      cursor-pointer min-h-[350px] flex flex-col justify-between"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={job?.company?.logo || ""}
            alt={job?.company?.name}
            className="object-cover"
          />

          <AvatarFallback>
            {job?.company?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="font-medium text-lg">
            {job?.company?.name || "Company Name"}
          </h1>

          <p className="text-sm text-gray-500">
            {job?.location || "India"}
          </p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">
          {job?.title}
        </h1>

        <p className="text-sm text-gray-600 h-[120px] overflow-hidden">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold border border-gray-200 bg-gray-70">
          {job?.position} Positions
        </Badge>

        <Badge className="text-red-700 font-bold border border-gray-200 bg-gray-70">
          {job?.jobType}
        </Badge>

        <Badge className="text-purple-700 font-bold border border-gray-200 bg-gray-70">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;