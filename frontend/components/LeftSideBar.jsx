import { Outlet } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <>
      <div>LeftSideBar</div>
      <Outlet />
    </>
  );
};

export default LeftSideBar;
