import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../App";

const EditAccountSettings = () => {
  const [user, setUser] = useAtom(userAtom);
  const [editAcc, setEditAcc] = useState(false);
  const [accInfo, setAccInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event, key) => {
    setAccInfo({
      ...accInfo,
      [key]: event.target.value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault()
    fetch(`/api/user/settings/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...accInfo}),
    })
      .then((response) => response.json())
      .then((data) => {
        setAccInfo(data);
      });
      setEditAcc(false);
  };

  return (
    <>
      {editAcc === false ?
      (
        <button onClick={() => setEditAcc(true)}>Edit account information</button>
      ) : (
        <form method="post" onSubmit={handleEdit}>
          <fieldset>
            <legend>Edit Account Information</legend>
            <label htmlFor="Email">Email</label>
            <input
              className="inputfield"
              required
              type="Email"
              placeholder="Email"
              name="Email"
              id="Email"
              value={accInfo.email}
              onChange={() => handleChange(event, "email")}
            />

            <label htmlFor="Password">Password</label>
            <input
              className="inputfield"
              required
              type="Password"
              placeholder="Password"
              name="Password"
              id="Password"
              value={accInfo.password}
              onChange={() => handleChange(event, "password")}
            />
            <button>Edit</button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default EditAccountSettings;
