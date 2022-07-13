import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import EditAccountSettings from "../components/settings/EditAccountSettings";
import DeleteAccount from "../components/settings/DeleteAccount";


const Settings = () => {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);
  const [userInfo, setUserInfo] = useState(user.email)

  if (user.email === undefined) {
    navigate("/login");
  }
  
  const updateAccInfo = (data) => {
    setUserInfo(data.email)
  }

  return (
    <div className="budgetcenter">
      <div>Account Settings</div>
      <div>Profile</div>
      <div>{userInfo}</div>
      <br />
      <div>Edit account information</div>
      <EditAccountSettings updateAccInfo={updateAccInfo} />
      <br />
      <br />
      <div>Edit account information</div>
      <DeleteAccount />
    </div>
  );
};

export default Settings;
