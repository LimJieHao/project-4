import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import EditAccountSettings from "../components/settings/EditAccountSettings";
import DeleteAccount from "../components/settings/DeleteAccount";

const Settings = () => {
  let navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  if (user.email === undefined) {
    navigate("/login");
  }

  return (
    <>
      <div>Account Settings</div>
      <br />
      <br />
      <button>Edit account information</button>
      <br />
      <br />
      <br />
      <EditAccountSettings />
      <br />
      <br />
      <DeleteAccount />
    </>
  );
};

export default Settings;
