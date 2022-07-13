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

  // For calculation of current month
  const dateFunc = new Date();
  const currentMonth = dateFunc.getFullYear() + "-" + (dateFunc.getMonth() < 10 ? "0" + (dateFunc.getMonth() + 1) : dateFunc.getMonth() + 1);

  // All states
  const [month, setMonth] = useState(currentMonth);
  const [budgetData, setBudgetData] = useState([])  

  // Returns the month in words for budget body component
  const mthWord = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const budgetCurMonth = mthWord[currentMonth.slice(currentMonth.length - 1, currentMonth.length) - 1]
  
  // Callback to prepopulate data
  const budgetPrepopulateData = () => {
    useEffect(() => {
      fetch(`/api/budget/${user.id}/`)
        .then((response) => response.json())
        .then((data) => setBudgetData(data))
    }, []);
  }

  // Fetch all relevant 
  useEffect(() => {
    fetch(`/api/budget/${user.id}/`)
      .then((response) => response.json())
      .then((data) => setBudgetData(data))
  }, []);

  return (
    <>
      <BudgetCenter budgetCurMonth={budgetCurMonth} month={month} budgetData={budgetData} budgetPrepopulateData={budgetPrepopulateData}/>
      <BudgetRightPanel budgetData={budgetData}/>
    </>
  );
};

export default Budget;
 