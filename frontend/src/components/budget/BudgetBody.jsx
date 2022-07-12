const BudgetBody = ({ budgetCurMonth, budgetData }) => {
  console.log(budgetData[0]?.inc_exp_category.type);
  console.log(budgetData[0]?.inc_exp_category.name);
  console.log(budgetData[0]?.description);
  console.log(budgetData[0]?.planned_amt);
  console.log(budgetData[0]?.actual_amt);
  return (
    <>
      <div>Budget for {budgetCurMonth}</div>
      <div className="budgettable">
        <>
          <div className="budgettitle"></div>
          <div>Planned</div>
          <div>Actual</div>
        </>
      </div>
    </>
  );
};

export default BudgetBody;
