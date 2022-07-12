import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <br />

      {user?.["email"] !== undefined ? null : (
        <>
          <Link to="/login">Login</Link>
          <br />
        </>
      )}
    </div>
  );
};

export default NavbarComponent;
