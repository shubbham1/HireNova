import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_POINT } from "@/utils/constant";
import axios from "axios";
import { setAllApplicants } from "@/redux/applicationSlice";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const dispatch = useDispatch();

  const statusHandler = async (status, id) => {
    console.log(status, id);

    try {
      const res = await axios.post(
        `${APPLICATION_API_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);

        const updatedApplicants = {
          ...applicants,
          applications: applicants.applications.filter(
            (application) => application._id !== id
          ),
        };

        dispatch(setAllApplicants(updatedApplicants));
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>

                <TableCell>{item?.applicant?.email}</TableCell>

                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>

                <TableCell>
                  {item?.applicant?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className="
                            flex
                            items-center
                            my-2
                            cursor-pointer
                            hover:bg-gray-100
                            p-2
                            rounded-md
                          "
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;