import { useState, useEffect } from "react";
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

  // Calculate the current month for the state
  const dateFunc = new Date();
  const mthNum = dateFunc.getMonth() + 1 < 10 ? "0" + (dateFunc.getMonth() + 1) : dateFunc.getMonth() + 1;
  const currentMth = dateFunc.getFullYear() + "-" + mthNum;

  // Month and budget State
  const [month, setMonth] = useState(currentMth);
  const [budget, setBudget] = useState([]);

  // Convert month state to date ISO format for db fetching
  const date = new Date(month + "-01");
  const dateISO = date.toISOString()

  // Initial fetch
  useEffect(() => {
     fetch(`/api/budget/${user.id}/${dateISO}`)
      .then((response) => response.json())
      .then((data) => setBudget(data))
  }, [month]);

  // Callback function from child
  const handleChangeCalBudget = (str) => {
    setMonth(str);
  };

  const populateDataBudget = () => {
    fetch(`/api/budget/populate/${user.id}/${dateISO}`,{method: "POST"})
      .then((response) => response.json())
      .then((data) => setBudget(data));
  };

  const handleDeleteBudget = (id) => {
    fetch(`/api/budget/removebud/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {setBudget(budget.filter((b) => b.id !== id))});
  };

  return (
    <>
      <BudgetCenter
        month={month}
        budget={budget}
        handleChangeCalBudget={handleChangeCalBudget}
        populateDataBudget={populateDataBudget}
        handleDeleteBudget={handleDeleteBudget}
      />
      <BudgetRightPanel />
    </>
  );
};

export default Budget;
