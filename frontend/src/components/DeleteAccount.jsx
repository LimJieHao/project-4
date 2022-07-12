import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

const DeleteAccount = () => {
  let navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);
  const [deleteAcc, setDeleteAcc] = useState(false);

  const handleDelete = () => {
    fetch(`/api/user/settings/${user.id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        setUser();
        navigate("/");
      });
  };

  return (
    <>
      {deleteAcc === false ? (
        <button onClick={() => setDeleteAcc(true)}>Delete your account</button>
      ) : (
        <>
          <p>Confirm Delete?</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setDeleteAcc(false)}>Cancel</button>
        </>
      )}
    </>
  );
};

export default DeleteAccount;
