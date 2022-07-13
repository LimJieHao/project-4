import BudgetHeader from "./BudgetHeader";
import BudgetBody from "./BudgetBody";

const BudgetCenter = ({ month, budget, handleChangeBudget, populateDataBudget }) => {

  const handleChangeBC = (str) => {
    handleChangeBudget(str)
  };

  const populateDataBC = () => {
    populateDataBudget()
  };

  return (
    <div className="budgetcenter">
      <BudgetHeader month={month} handleChangeBC={handleChangeBC} populateDataBC={populateDataBC}/>
      <br />
      <br />
      <BudgetBody month={month} budget={budget}/>
    </div>
  );
};

export default BudgetCenter;
