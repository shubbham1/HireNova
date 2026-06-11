import useGetAllJobs from "@/hooks/useGetAllJobs";
import CategoryCarousel from "./CategoryCarousel";
import Footer from "./footer";
import HeroSection from "./HeroSection";
import Latestjobs from "./Latestjobs";
import Navbar from "./ui/shared/navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home=()=>{
    useGetAllJobs();
    const {user} = useSelector(store=> store.auth);
    const navigate= useNavigate();
    useEffect(()=>{
if(user?.role==="recruiter"){
    navigate("/admin/companies");
}
    }, [])
    return(
        <div>
            <Navbar/>
            <HeroSection/>
            <CategoryCarousel/>
             <Latestjobs/> 
            <Footer/>  
        </div>
    )
}
export default Home;