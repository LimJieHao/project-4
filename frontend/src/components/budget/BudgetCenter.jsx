const BudgetCenter = ({ month, budget, handleChangeBudget, populateDataBudget, handleDeleteBudget }) => {
  //calculate the min month and max month
  let minMonth = parseInt(month.substring(0, 4)) - 2 + "-01";
  let maxMonth = parseInt(month.substring(0, 4)) + 2 + "-12";

  // Convert Month into words
  const monthWord = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
  const currentMonth = month.substring(month.length - 1, month.length);
  const year = month.substring(0, 4);

  const handleChangeBC = (event) => {
    handleChangeBudget(event.target.value);
  };

  const populateDataBC = () => {
    populateDataBudget();
  };

  const handleEditBC = (id) => {
    console.log(id)
  };  

  const handleDeleteBC = (id) => {
    handleDeleteBudget(id);
  };  

  return (
    <div className="budgetcenter">
      <label htmlFor="start">Start month:</label>
      <input
        type="month"
        id="start"
        name="start"
        min={minMonth}
        max={maxMonth}
        value={month}
        onChange={() => handleChangeBC(event)}
      />
      {budget.length === 0 ? (<button onClick={() => populateDataBC()}>Start planning</button>) : null}
      <br />
      <br />
      <div className="budgettitle">
        <div>Budget for {monthWord[currentMonth - 1] + " " + year}</div>
        {/* <button onClick={() => populateDataBC()}>Add Item</button> */}
      </div>
      <div className="budgettable">
        <div className="budgetitem">Type</div>
        <div className="budgetitem">Category</div>
        <div className="budgetitem">Planned</div>
        <div className="budgetitem">Actual</div>
      </div>
      {budget.map((data) => (
        <div className="budgettable" key={data.id}>
          <div className="budgetitem">{data.type}</div>
          <div className="budgetitem">{data.name}</div>
          <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
          <div className="budgetitem">to calculate</div>
          <div>
            <button className="budgetbutton" onClick={() => handleEditBC(data.id)}>Edit</button>
            <button className="budgetbutton" onClick={() => handleDeleteBC(data.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetCenter;
