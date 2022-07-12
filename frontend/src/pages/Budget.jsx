import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

const Budget = () => {
  let navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  if (user.email === undefined) {
    navigate("/login");
  }
  
  return (
    <>
      <div>budget</div>
    </>
  );
};

export default Budget;
