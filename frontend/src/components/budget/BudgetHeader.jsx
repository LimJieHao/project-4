const BudgetHeader = ({bcMonth, month}) => {
  // For calculation of current month
  const dateFunc = new Date();
  const currentMonth = dateFunc.getFullYear() + "-" + (dateFunc.getMonth() < 10 ? "0" + (dateFunc.getMonth() + 1) : dateFunc.getMonth() + 1);
  
  // Form min and max period
  const minMonth = dateFunc.getFullYear() - 5 + "-" + "01";
  const maxMonth = dateFunc.getFullYear() + 5 + "-" + "12";
  
  // Callback function to uplift value to state
  const handleChange = (event) => {
    bcMonth(event.target.value)
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
