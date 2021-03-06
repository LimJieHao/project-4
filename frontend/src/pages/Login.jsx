import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import jwtDecode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useAtom(userAtom);

  const handleChange = (event, key) => {
    setLogin({
      ...login,
      [key]: event.target.value,
    });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((response) => response.json())
      .then((data) => setUser(jwtDecode(data)));
      navigate("/app/budget")
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmitLogin}>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="Email">Email</label>
          <input
            className="inputfield"
            required
            type="Email"
            placeholder="Email"
            autoComplete="Email"
            name="Email"
            id="Email"
            value={login.username}
            onChange={() => handleChange(event, "email")}
          />

          <label htmlFor="Password">Password</label>
          <input
            className="inputfield"
            required
            type="Password"
            placeholder="Password"
            autoComplete="current-password"
            name="Password"
            id="Password"
            value={login.password}
            onChange={() => handleChange(event, "password")}
          />
          <button>Login</button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
