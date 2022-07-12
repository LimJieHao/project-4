import { Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar";

const MainNavbar = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  
  export default MainNavbar;