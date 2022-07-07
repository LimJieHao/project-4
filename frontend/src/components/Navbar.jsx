import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <Link to="/features">Features</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/app/budget">Budget</Link>
      <br />
      <Link to="/app/position">Position</Link>
      <br />
      <Link to="/app/insights">Insights</Link>
      <br />
      <Link to="/app/settings">Settings</Link>
      <br />
      <br />
      <br />
      <Outlet />
    </>
  );
};

export default Navbar;
