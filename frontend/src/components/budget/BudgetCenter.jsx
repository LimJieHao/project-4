import { useState } from "react";

const BudgetCenter = ({
  month,
  budget,
  handleAddBudget,
  handleChangeCalBudget,
  populateDataBudget,
  handleDeleteBudget,
}) => {
  const [toggleAddInc, setToggleAddInc] = useState(false);
  const [toggleAddExp, setToggleAddExp] = useState(false);
  const [item, setItem] = useState({
    type: "",
    category: "",
    name: "",
    planned_amt: "",
  });

  //calculate the min month and max month
  let minMonth = parseInt(month.substring(0, 4)) - 2 + "-01";
  let maxMonth = parseInt(month.substring(0, 4)) + 2 + "-12";

  // Convert Month into words
  const monthWord = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = month.substring(month.length - 1, month.length);
  const year = month.substring(0, 4);

  const handleChangeCalBC = (event) => {
    handleChangeCalBudget(event.target.value);
  };

  const populateDataBC = () => {
    populateDataBudget();
  };

  const handleAddBC = (type) => {
    if (type === "income") {
      setToggleAddInc(true);
    } else if (type === "expense") {
      setToggleAddExp(true);
    }
  };

  const handleAddSubmitBC = (event, type) => {
    event.preventDefault();
    if (type === "income") {
      item.type = "Income"
      setToggleAddInc(false);
    } else if (type === "expense") {
      item.type = "Expense"
      setToggleAddExp(false);
    }
    handleAddBudget(type, item)
    setItem({
      type: "",
      category: "",
      name: "",
      planned_amt: "",
    })
  };

  const handleEditBC = (id) => {
    console.log(id);
  };

  const handleDeleteBC = (type, id) => {
    handleDeleteBudget(type, id);
  };

  const handleChangeFormBC = (event, key) => {
    if (key === "planned_amt") {
      setItem({
        ...item,
        [key]: Number(event.target.value),
      });
    } else {
      setItem({
        ...item,
        [key]: event.target.value,
      });
    }
  };

  return (
    <div className="budgetcenter">
      {/* header */}
      <label htmlFor="start">Start month:</label>
      <input
        type="month"
        id="start"
        name="start"
        min={minMonth}
        max={maxMonth}
        value={month}
        onChange={() => handleChangeCalBC(event)}
      />
      {budget.income.length === 0 && budget.expense.length === 0 ? (
        <button onClick={() => populateDataBC()}>Start planning</button>
      ) : null}
      <br />
      <br />

      {/* budget income summary table */}
      {/* budget income summary table header */}
      <div className="budgetheader">
        <div>Budget for {monthWord[currentMonth - 1] + " " + year}</div>
      </div>
      <div className="budgetcontainer">
        <div className="budgettitle">
          Income
          <button
            className="budgetbutton"
            onClick={() => handleAddBC("income")}
          >
            Add
          </button>
        </div>
        <div className="budgettable">
          <div className="budgetitem">Category</div>
          <div className="budgetitem">Name</div>
          <div className="budgetitem">Planned</div>
          <div className="budgetitem">Actual</div>
        </div>

        {/* display of all income items */}
        {budget.income.map((data) => (
          <div className="budgettable" key={data.id}>
            <div className="budgetitem">{data.category}</div>
            <div className="budgetitem">{data.name}</div>
            <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
            <div className="budgetitem">to calculate</div>
            <div>
              <button
                className="budgetbutton"
                onClick={() => handleEditBC(data.id)}
              >
                Edit
              </button>
              <button
                className="budgetbutton"
                onClick={() => handleDeleteBC("income", data.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form to add new items */}
      {toggleAddInc === true ? (
        <form
          className="budgetAddForm"
          method="post"
          onSubmit={() => handleAddSubmitBC(event, "income")}
        >
          <fieldset>
            <legend>Add new income</legend>
            <label className="FormLabel" htmlFor="category">Category</label>
            <input
              className="inputfield"
              required
              type="text"
              placeholder="category"
              name="category"
              id="category"
              value={item.category}
              onChange={() => handleChangeFormBC(event, "category")}
            />
            <br />
            <label htmlFor="name">Name</label>
            <input
              className="inputfield"
              required
              type="text"
              placeholder="name"
              name="name"
              id="name"
              value={item.name}
              onChange={() => handleChangeFormBC(event, "name")}
            />
            <br />
            <label htmlFor="planned_amt">Planned amount</label>
            <input
              className="inputfield"
              required
              type="number"
              placeholder="planned_amt"
              name="planned_amt"
              id="planned_amt"
              value={item.planned_amt}
              onChange={() => handleChangeFormBC(event, "planned_amt")}
            />
            <br />
            <button>Add</button>
            <button type="button" onClick={() => setToggleAddInc(false)}>
              Cancel
            </button>
          </fieldset>
        </form>
      ) : null}

      {/* budget expense summary table */}
      {/* budget expense summary table header */}
      <div className="budgetcontainer">
        <div className="budgettitle">
          Expense
          <button
            className="budgetbutton"
            onClick={() => handleAddBC("expense")}
          >
            Add
          </button>
        </div>
        <div className="budgettable">
          <div className="budgetitem">Category</div>
          <div className="budgetitem">Name</div>
          <div className="budgetitem">Planned</div>
          <div className="budgetitem">Actual</div>
        </div>

        {/* display of all expense items */}
        {budget.expense.map((data) => (
          <div className="budgettable" key={data.id}>
            <div className="budgetitem">{data.category}</div>
            <div className="budgetitem">{data.name}</div>
            <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
            <div className="budgetitem">to calculate</div>
            <div>
              <button
                className="budgetbutton"
                onClick={() => handleEditBC(data.id)}
              >
                Edit
              </button>
              <button
                className="budgetbutton"
                onClick={() => handleDeleteBC("expense", data.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form to add new items */}
      {toggleAddExp === true ? (
        <form
          className="budgetAddForm"
          method="post"
          onSubmit={() => handleAddSubmitBC(event, "expense")}
        >
          <fieldset>
            <legend>Add new expense</legend>
            <label htmlFor="category">Category</label>
            <input
              className="inputfield"
              required
              type="text"
              placeholder="category"
              name="category"
              id="category"
              value={item.category}
              onChange={() => handleChangeFormBC(event, "category")}
            />
            <br />
            <label htmlFor="name">Name</label>
            <input
              className="inputfield"
              required
              type="text"
              placeholder="name"
              name="name"
              id="name"
              value={item.name}
              onChange={() => handleChangeFormBC(event, "name")}
            />
            <br />
            <label htmlFor="planned_amt">Planned amount</label>
            <input
              className="inputfield"
              required
              type="number"
              placeholder="planned_amt"
              name="planned_amt"
              id="planned_amt"
              value={item.planned_amt}
              onChange={() => handleChangeFormBC(event, "planned_amt")}
            />
            <br />
            <button>Add</button>
            <button type="button" onClick={() => setToggleAddExp(false)}>
              Cancel
            </button>
          </fieldset>
        </form>
      ) : null}
    </div>
  );
};

export default BudgetCenter;
