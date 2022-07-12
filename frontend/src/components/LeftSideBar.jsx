import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

const LeftSideBar = () => {
  let navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  if (user.email === undefined) {
    navigate("/login");
  }

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
