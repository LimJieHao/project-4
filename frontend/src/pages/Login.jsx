import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, key) => {
    setLogin({
      ...login,
      [key]: event.target.value,
    });
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
    navigate("/");
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmitLogin}>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="username">Username</label>
          <input
            className="inputfield"
            required
            type="text"
            placeholder="username"
            name="username"
            id="username"
            value={login.username}
            onChange={() => handleChange(event, "username")}
          />

          <label htmlFor="password">Password</label>
          <input
            className="inputfield"
            required
            type="text"
            placeholder="password"
            name="password"
            id="password"
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
