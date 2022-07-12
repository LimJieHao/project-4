import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

const NavbarPage = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default NavbarPage;
