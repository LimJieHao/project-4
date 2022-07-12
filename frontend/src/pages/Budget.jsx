import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import BudgetCenter from "../components/budget/BudgetCenter";
import BudgetRightPanel from "../components/budget/BudgetRightPanel";

const Budget = () => {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  if (user.email === undefined) {
    navigate("/login");
  }
  
  return (
    <>
      <BudgetCenter />
      <BudgetRightPanel />
    </>
  );
};

export default Budget;
