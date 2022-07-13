import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

const LeftSideBarComponent = () => {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  const handleLogOut = async () => {
    await fetch("/api/user/logout")
      .then((response) => response.json())
      .then((data) => setUser());
    navigate("/");
  };

  return (
    <div className="leftsidebar">
      {user?.["email"] !== undefined ? (
        <>
          <Link to="/app/budget">Budget</Link>
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
    </div>
  );
};

export default LeftSideBarComponent;
