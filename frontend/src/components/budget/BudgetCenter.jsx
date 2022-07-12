import BudgetHeader from "./BudgetHeader";
import BudgetBody from "./BudgetBody";

const BudgetCenter = ({budgetCurMonth, month, budgetData }) => {
  // Callback function from budget header component
  const bcMonth = (str) => {
    budgetMonth(str);
  };

  return (
    <div className="budgetcenter">
      <BudgetHeader bcMonth={bcMonth} month={month}/>
      <br />
      <br />
      <BudgetBody budgetCurMonth={budgetCurMonth} budgetData={budgetData}/>
    </div>
  );
};

export default BudgetCenter;
