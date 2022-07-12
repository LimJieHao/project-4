import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import EditAccountSettings from "../components/EditAccountSettings";
import DeleteAccount from "../components/DeleteAccount";

const Settings = () => {
  let navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);
  const [triggerEdit, setTriggerEdit] = useState(false);

  if (user.email === undefined) {
    navigate("/login");
  }

  // Update account details
  const handleEdit = () => {
    setTriggerEdit(true)
  }


  return (
    <>
      <div>Account Settings</div>
      <div>{user.email}</div>
      <div>{user.password}</div>
      <br />
      <br />
      <br />
      <br />
      <button>Edit account information</button>
      <br />
      <br />
      <br />
      <br />
      <EditAccountSettings />
      <DeleteAccount />
    </>
  );
};

export default Settings;
