import { Company } from "../models/company.model.js";
import Job from "../models/job.model.js";

// ================= POST JOB =================
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    console.log("USER ID:", userId);
    console.log("BODY:", req.body);

    // validation
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // create job
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experienceLevel),
      position: Number(position),
      company: companyId,
      created_by: userId,
    });

    console.log("JOB CREATED:", job);

    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// ================= GET ALL JOBS =================
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// ================= GET JOB BY ID =================
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// ================= GET ADMIN JOBS =================
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    console.log("ADMIN ID:", adminId);

    const jobs = await Job.find({
      created_by: adminId,
    }).populate({
      path: "company",
    });

    console.log("ADMIN JOBS:", jobs);

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      requirements: req.body.requirements,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      experienceLevel: req.body.experienceLevel,
      position: req.body.position,
    };

    const job = await Job.findByIdAndUpdate(
      jobId,
      updatedData,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteJob = async (req, res) => {
  try {

    const jobId = req.params.id;

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};