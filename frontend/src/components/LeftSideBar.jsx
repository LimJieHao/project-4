import { Outlet } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <>
      <div>LeftSideBar</div>
      <br />
      <br />
      <br />
      <Outlet />
    </>
  );
};

export default LeftSideBar;
