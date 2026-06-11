import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filtertype: "Location",
    array: ["DELHI NCR", "Banglore", "Hydrabad", "Pune", "Mumbai"],
  },
  {
    filtertype: "Industry",
    array: [
      "Frontend Developer",
      "React Developer",
      "Python Developer",
      "Java Developer",
      "IT Engineer",
    ],
  },
  {
    filtertype: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh-5lakh", "5lakh-7lakh", "7lakh-10lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);

    dispatch(setSearchedQuery(value));
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>

      <hr className="mt-3 mb-3" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h1 className="font-bold text-lg mb-2">{data.filtertype}</h1>

            {data.array.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} id={item} />

                <Label htmlFor={item}>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
