import BudgetHeader from "./BudgetHeader";
import BudgetBody from "./BudgetBody";

const BudgetCenter = ({budgetCurMonth, month, budgetData, budgetPrepopulateData}) => {
  // Callback function to budget header component
  const bcMonth = (str) => {
    budgetMonth(str);
  };

  const bcPrepopulateData = () => {
    budgetPrepopulateData()
  }

  return (
    <div className="budgetcenter">
      <BudgetHeader bcMonth={bcMonth} month={month} bcPrepopulateData={bcPrepopulateData}/>
      <br />
      <br />
      { budgetData.data === "error" ? "" : <BudgetBody budgetCurMonth={budgetCurMonth} budgetData={budgetData}/>}
    </div>
  );
};

export default BudgetCenter;
