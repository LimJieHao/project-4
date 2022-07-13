const BudgetBody = ({ month, budget }) => {
  // Convert Month into words
  const monthWord = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"]
  const currentMonth = month.substring(month.length -1, month.length)
  const year = month.substring(0, 4)
  
  return (
    <>
    <div className="budgettitle">Budget for {monthWord[currentMonth - 1] + " " + year}</div>
      <div className="budgettable">
        <div className="budgetitem">Type</div>
        <div className="budgetitem">Category</div>
        <div className="budgetitem">Planned</div>
        <div className="budgetitem">Actual</div>
      </div>
      {budget.map((data) => (
          <div className="budgettable"  key={data.id}>
            <div className="budgetitem">{data.type}</div>
            <div className="budgetitem">{data.name}</div>
            <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
            <div className="budgetitem">to calculate</div>
          </div>
      ))}
    </>
  );
};

export default BudgetBody;
