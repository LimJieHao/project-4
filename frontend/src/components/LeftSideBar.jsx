import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

const LeftSideBar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  if (user.email === undefined) {
    navigate("/login");
  }

  const handleLogOut = async () => {
    await fetch("/api/user/logout")
      .then((response) => response.json())
      .then((data) => setUser());
    navigate("/");
  };

  return (
    <>
      <div>LeftSideBar</div>
      {user?.["email"] !== undefined ? (
        <>
          <Link to="/app/budget">Budget</Link>
          <br />
          <Link to="/app/position">Position</Link>
          <br />
          <Link to="/app/insights">Insights</Link>
          <br />
          <Link to="/app/settings">Settings</Link>
          <br />
        </>
      ) : null}

      {user?.["email"] !== undefined ? (
        <button onClick={handleLogOut}>Log Out</button>
      ) : null}
      <br />
      <br />
      <Outlet />
    </>
  );
};

export default LeftSideBar;
