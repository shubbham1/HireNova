import companyRoute from "./routes/company.routes.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
dotenv.config({});
const app= express();

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials:true
}));

const PORT = process.env.PORT || 8000;
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

connectDB();
app.listen(PORT,() => {
    console.log(`server running at port ${PORT}`);
});
