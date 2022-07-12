import { useState } from "react";

const BudgetHeader = () => {
  // For calculation of current month
  const dateFunc = new Date()
  const currentMonth = dateFunc.getFullYear() + "-" + (dateFunc.getMonth() < 10 ? "0" + (dateFunc.getMonth() + 1) : (dateFunc.getMonth() + 1))
  const [month, setMonth] = useState(currentMonth)
  
  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <>
      <label htmlFor="start">Start month:</label>
      <input
        type="month"
        id="start"
        name="start"
        min="2022-01"
        max="2025-12"
        value={month}
        onChange={() => handleChange(event)}
      />
      <div>HOW MUCH MORE TO BUDGET?</div>
    </>
  );
};

export default BudgetHeader;
