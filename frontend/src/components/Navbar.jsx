import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  return (
    <>
      <Link to="/">Home</Link>
      <br />

      {user?.["email"] !== undefined ? null : (
        <>
          <Link to="/login">Login</Link>
          <br />
        </>
      )}

      <Outlet />
    </>
  );
};

export default Navbar;
