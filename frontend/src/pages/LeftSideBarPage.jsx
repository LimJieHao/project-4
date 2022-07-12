import { Outlet, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import LeftSideBarComponent from "../components/LeftSideBarComponent";

const LeftSideBarPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  if (user.email === undefined) {
    navigate("/login");
  }

  return (
    <>
      <LeftSideBarComponent />
      <Outlet />
    </>
  );
};

export default LeftSideBarPage;
