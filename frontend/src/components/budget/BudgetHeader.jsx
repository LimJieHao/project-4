const BudgetHeader = ({ month, handleChangeBC, populateDataBC }) => {
  //calculate the min month and max month
  let minMonth = (parseInt(month.substring(0, 4)) - 2) + "-01"
  let maxMonth = (parseInt(month.substring(0, 4)) + 2) + "-12"

  const handleChangeBH = (event) => {
    handleChangeBC(event.target.value)
  };

  const populateDataBH = () => {
    populateDataBC()
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
        onChange={() => handleChangeBH(event)}
      />
      <button onClick={() => populateDataBH()}>Start budgeting</button>
    </>
  );
};

export default BudgetHeader;
