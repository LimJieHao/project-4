const BudgetBody = ({ month, budget }) => {
  // Convert Month into words
  const monthWord = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"]
  const currentMonth = month.substring(month.length -1, month.length)
  const year = month.substring(0, 4)

  return (
    <>
      <div className="budgettable">
        <div className="budgettitle">Budget for {monthWord[currentMonth - 1] + " " + year}</div>
        <div className="budgetitem">Type</div>
        <div className="budgetitem">Planned</div>
        <div className="budgetitem">Actual</div>
      </div>
      {budget.map((data) => (
          <div className="budgettable"  key={data.id}>
            <div className="budgettitle">{data.description}</div>
            <div className="budgetitem">{data.inc_exp_category.name}</div>
            <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
            <div className="budgetitem">{data.actual_amt.toFixed(2)}</div>
          </div>
      ))}
    </>
  );
};

export default BudgetBody;
