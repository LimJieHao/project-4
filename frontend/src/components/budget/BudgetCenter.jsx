import BudgetHeader from "./BudgetHeader";
import BudgetBody from "./BudgetBody";

const BudgetCenter = () => {

    const budgetmonth = (str) => {
        console.log(str)
    }

    return (
        <div className="budgetcenter">
            <BudgetHeader budgetmonth={budgetmonth} />
            <br />
            <br />
            <BudgetBody />
        </div>
    );
  };
  
  export default BudgetCenter;
  