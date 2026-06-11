import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchJobHandler = () => {
    navigate(`/browse?keyword=${query}`);
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">

        <span className="font-bold mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f82f02]">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-4xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mt-5 animate-pulse transition-all duration-500 hover:scale-105 hover:text-purple-600">
          Discover top career opportunities, connect with leading companies,
          and take the next step toward your dream job with HireNova.
        </p>

        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto h-12">

          <input
            type="text"
            placeholder="Find Your dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-base"
          />

          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] h-12"
          >
            <Search className="h-5 w-5" />
          </Button>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;