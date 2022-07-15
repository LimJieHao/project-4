import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../App";
import jwtDecode from "jwt-decode";

const SignUp = () => {
  const navigate = useNavigate();

  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useAtom(userAtom);

  const handleChange = (event, key) => {
    setSignUp({
      ...signUp,
      [key]: event.target.value,
    });
  };

  const handleSubmitSignup = (event) => {
    event.preventDefault();
    fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUp),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.data === "error") {
          alert(
            "Error! The username or email is currently in use. Please try again"
          );
          navigate("/login");
        } else {
          setUser(jwtDecode(data));
          navigate("/app/budget");
        }
      });
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmitSignup}>
        <fieldset>
          <legend>Sign Up</legend>
          <label htmlFor="email">Email</label>
          <input
            className="inputfield"
            required
            type="email"
            placeholder="Email"
            autoComplete="Email"
            name="email"
            id="email"
            value={signUp.email}
            onChange={() => handleChange(event, "email")}
          />

          <label htmlFor="password">Password</label>
          <input
            className="inputfield"
            required
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            name="password"
            id="password"
            value={signUp.password}
            onChange={() => handleChange(event, "password")}
          />
          <br />

          <button>Sign Up</button>
        </fieldset>
        <br />
      </form>
    </>
  );
};

export default SignUp;
