import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

const Insights = () => {
  let navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  if (user.email === undefined) {
    navigate("/login");
  }
  
  return (
    <>
      <div>Insights</div>
    </>
  );
};

export default Insights;
