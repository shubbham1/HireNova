import React, { useState } from "react";
import Navbar from "./ui/shared/navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import ApplieJobTable from "./AppliedJobTable";
import UpdateProfileDialouge from "./UpdateProfileDialouge";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
// const skills=["Html", "CSS", "JavaScript", "React.Js"]

const isResume = true;
const Profile = () => {
useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl my-4 p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span> {user?.phoneNumber} </span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((Item, index) => (
                <Badge
                  key={index}
                  className="mr-2 bg-black text-white rounded-full px-3 py-1"
                >
                  {Item}{" "}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>

          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl mt-4">
        <h1 className="font-bold text-lg my-5 ">Applied Jobs</h1>
        <ApplieJobTable />
      </div>
      <UpdateProfileDialouge open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
