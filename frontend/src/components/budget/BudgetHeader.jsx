import { useState } from "react";

const BudgetHeader = ({budgetmonth}) => {
  // For calculation of current month
  const dateFunc = new Date()
  const currentMonth = dateFunc.getFullYear() + "-" + (dateFunc.getMonth() < 10 ? "0" + (dateFunc.getMonth() + 1) : (dateFunc.getMonth() + 1))

  // Form min and max period
  const minMonth = dateFunc.getFullYear() - 5 + "-" + "01"
  const maxMonth = dateFunc.getFullYear() + 5 + "-" + "12"

  const [month, setMonth] = useState(currentMonth)
  
  const handleChange = (event) => {
    setMonth(event.target.value);
    budgetmonth(event.target.value)
  };

  return (
    <>
      <label htmlFor="start">Start month:</label>
      <input
        type="month"
        id="start"
        name="start"
        min={minMonth}
        max={maxMonth}
        value={month}
        onChange={() => handleChange(event)}
      />
      <div>HOW MUCH MORE TO BUDGET?</div>
    </>
  );
};

export default BudgetHeader;
