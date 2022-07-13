const BudgetBody = ({ budgetCurMonth, budgetData }) => {
  return (
    <>
      <div className="budgettable">
        <div className="budgettitle">Budget for {budgetCurMonth}</div>
        <div className="budgetitem">Type</div>
        <div className="budgetitem">Planned</div>
        <div className="budgetitem">Actual</div>
      </div>
      {budgetData.map((data) => (
        <>
          <div className="budgettable"  key={data.id}>
            <div className="budgettitle" key={data.id}>{data.description}</div>
            <div className="budgetitem" key={data.id}>{data.inc_exp_category.name}</div>
            <div className="budgetitem" key={data.id}>{data.planned_amt.toFixed(2)}</div>
            <div className="budgetitem" key={data.id}>{data.actual_amt.toFixed(2)}</div>
          </div>
        </>
      ))}
    </>
  );
};

export default BudgetBody;
