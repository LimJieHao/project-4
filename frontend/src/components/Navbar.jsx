import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

const Navbar = () => {
  let navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  const handleLogOut = () => {
    fetch("/api/user/logout")
      .then((response) => response.json())
      .then((data) => setUser());
    navigate("/");
  };

  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
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
      ) : ( null
      )}
      <br />
      <br />
      <Outlet />
    </>
  );
};

export default Navbar;
