import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompaniesTable = () => {

  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState([]);

  const navigate = useNavigate();

  const deleteCompanyHandler = async (companyId) => {
    try {
      console.log(companyId);

      const res = await axios.delete(
        `http://localhost:8000/api/v1/company/delete/${companyId}`,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res.data.success) {
        alert("Company deleted successfully");
        window.location.reload();
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const filteredCompany = companies.filter((company) => {

      if (!searchCompanyByText) {
        return true;
      }

      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());

    });

    setFilterCompany(filteredCompany);

  }, [companies, searchCompanyByText]);

  return (
    <div>

      <Table>

        <TableCaption>
          A list of your recent registered companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {filterCompany?.map((company) => (

            <TableRow key={company._id}>

              <TableCell>
                <Avatar>

                  <AvatarImage
                    src={company?.logo}
                    alt={company?.name}
                  />

                  <AvatarFallback>
                    {company?.name?.charAt(0)}
                  </AvatarFallback>

                </Avatar>
              </TableCell>

              <TableCell>
                {company?.name}
              </TableCell>

              <TableCell>
                {company?.createdAt?.split("T")[0]}
              </TableCell>

              <TableCell className="text-right cursor-pointer">

                <Popover>

                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>

                  <PopoverContent className="w-32">

                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer mb-2"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCompanyHandler(company._id);
                      }}
                      className="flex items-center gap-2 w-fit cursor-pointer text-red-600"
                    >
                      <span>Delete</span>
                    </div>

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

export default CompaniesTable;