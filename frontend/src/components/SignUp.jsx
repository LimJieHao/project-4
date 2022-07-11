import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();

  const [signUp, setSignUp] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    display_pic_url: "",
    user_description: "",
  });

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
          setUser(data);
          console.log(data);
          navigate("/");
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
            placeholder="email"
            name="email"
            id="email"
            value={signUp.email}
            onChange={() => handleChange(event, "email")}
          />

          <label htmlFor="password">Password</label>
          <input
            className="inputfield"
            required
            type="text"
            placeholder="password"
            name="password"
            id="password"
            value={signUp.password}
            onChange={() => handleChange(event, "password")}
          />
          <br />
          
          <button>Sign Up</button>
        </fieldset>
      </form>
    </>
  );
};

export default SignUp;
