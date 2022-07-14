import { useState } from "react";

const BudgetCenter = ({
  month,
  budget,
  handleChangeCalBudget,
  handleAddBudget,
  populateDataBudget,
  deleteDataBudget,
  handleEditBudget,
  handleDeleteBudget,
  viewTransactionBudget,
}) => {
  const [toggleAdd, setToggleAdd] = useState({
    income: false,
    expense: false,
  });
  const [toggleEdit, setToggleEdit] = useState({
    income: -1,
    expense: -1,
  });
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
  const currentMonthIndex =
    Number(month.substring(month.length - 2, month.length)) - 1;
  const year = month.substring(0, 4);

  const handleChangeCalBC = (event) => {
    handleChangeCalBudget(event.target.value);
  };

  const populateDataBC = () => {
    populateDataBudget();
  };

  const deleteDataBC = () => {
    deleteDataBudget();
  };

  const handleAddBC = (type) => {
    if (type === "income") {
      setToggleAdd({
        ...toggleAdd,
        income: true,
        expense: false,
      });
    } else if (type === "expense") {
      setToggleAdd({
        ...toggleAdd,
        income: false,
        expense: true,
      });
    }
  };

  const handleAddSubmitBC = (event, type) => {
    event.preventDefault();
    if (type === "income") {
      item.type = "Income";
    } else if (type === "expense") {
      item.type = "Expense";
    }
    setToggleAdd({ ...toggleAdd, [type]: false });
    handleAddBudget(type, item);
    setItem({
      type: "",
      category: "",
      name: "",
      planned_amt: "",
    });
  };

  const handleEditBC = (type, data) => {
    setItem(data);
    if (type === "income") {
      setToggleEdit({
        ...toggleEdit,
        income: data.id,
        expense: -1,
      });
    } else if (type === "expense") {
      setToggleEdit({
        ...toggleEdit,
        income: -1,
        expense: data.id,
      });
    }
  };

  const submitEditBC = (type, data) => {
    handleEditBudget(type, data);
    setToggleEdit({ ...toggleEdit, [type]: -1 });
    setItem({
      type: "",
      category: "",
      name: "",
      planned_amt: "",
    });
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

  const handleCancelBC = (key, type) => {
    if (type === "add") {
      setToggleAdd({ ...toggleAdd, [key]: false });
    } else if (type === "edit") {
      setToggleEdit({ ...toggleEdit, [key]: -1 });
    }
    setItem({
      type: "",
      category: "",
      name: "",
      planned_amt: "",
    });
  };

  const viewTransactionBC = (data) => {
    viewTransactionBudget(data);
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
      ) : (
        <button onClick={() => deleteDataBC()}>Delete budget</button>
      )}
      <br />
      <br />

      {/* budget income summary table */}
      {/* budget income summary table header */}
      <div className="budgetheader">
        <div>Budget for {monthWord[currentMonthIndex] + " " + year}</div>
      </div>
      <div className="budgetcontainer">
        <div className="budget-title-container">
          <div className="budgettitle">Income</div>
          <button
            className="budgetbutton"
            onClick={() => handleAddBC("income")}
          >
            Add
          </button>
        </div>
        <div className="budgettable tabletitle">
          <div className="budgetitem">Category</div>
          <div className="budgetitem">Name</div>
          <div className="budgetitem">Planned</div>
          <div className="budgetitem">Actual</div>
        </div>

        {/* display of all income items */}
        {budget.income.map((data) =>
          toggleEdit.income === data.id ? (
            <div className="inputtable" key={data.id}>
              <input
                className="inputitem"
                onChange={() => handleChangeFormBC(event, "category")}
                value={item.category}
              />
              <input
                className="inputitem"
                onChange={() => handleChangeFormBC(event, "name")}
                value={item.name}
              />
              <input
                className="inputitem"
                onChange={() => handleChangeFormBC(event, "planned_amt")}
                value={item.planned_amt}
              />
              <div className="inputitem extraitem"></div>
              <div>
                <button
                  className="budgetbutton"
                  onClick={() => submitEditBC("income", item)}
                >
                  Update
                </button>
                <button
                  className="budgetbutton"
                  onClick={() => handleCancelBC("income", "edit")}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="budgetdata" key={data.id}>
              <div className="budgettable">
                <div className="budgetitem">{data.category}</div>
                {/* <div className="budgetitem">{data.name}</div> */}
                <button
                  className="budgetbutton longbutton"
                  onClick={() => viewTransactionBC(data)}
                >
                  {data.name}
                </button>
                <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
                <div className="budgetitem">to calculate</div>
                <div className="budgetbuttondiv">
                  <button
                    className="budgetbutton"
                    onClick={() => handleEditBC("income", data)}
                  >
                    Edit
                  </button>
                  <button
                    className="budgetbutton"
                    onClick={() => handleDeleteBC("income", data.id)}
                  >
                    Delete
                  </button>
                  {/* <button
                    className="budgetbutton longbutton"
                    onClick={() => viewTransactionBC(data)}
                  >
                    View actual
                  </button> */}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Form to add new items */}
      {toggleAdd.income === true ? (
        <form
          className="budgetAddForm"
          method="post"
          onSubmit={() => handleAddSubmitBC(event, "income")}
        >
          <fieldset>
            <legend>Add new income</legend>
            <label className="FormLabel" htmlFor="category">
              Category
            </label>
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
            <button
              type="button"
              onClick={() => handleCancelBC("income", "add")}
            >
              Cancel
            </button>
          </fieldset>
        </form>
      ) : null}

      {/* budget expense summary table */}
      {/* budget expense summary table header */}
      <div className="budgetcontainer">
        <div className="budget-title-container">
          <div className="budgettitle">Expense</div>
          <button
            className="budgetbutton"
            onClick={() => handleAddBC("expense")}
          >
            Add
          </button>
        </div>
        <div className="budgettable tabletitle">
          <div className="budgetitem">Category</div>
          <div className="budgetitem">Name</div>
          <div className="budgetitem">Planned</div>
          <div className="budgetitem">Actual</div>
        </div>

        {/* display of all expense items */}
        {budget.expense.map((data) =>
          toggleEdit.expense === data.id ? (
            <div className="inputtable" key={data.id}>
              <input
                className="inputitem"
                onChange={() => handleChangeFormBC(event, "category")}
                value={item.category}
              />
              <input
                className="inputitem"
                onChange={() => handleChangeFormBC(event, "name")}
                value={item.name}
              />
              <input
                className="inputitem"
                onChange={() => handleChangeFormBC(event, "planned_amt")}
                value={item.planned_amt}
              />
              <div className="inputitem extraitem"></div>
              <div>
                <button
                  className="budgetbutton"
                  onClick={() => submitEditBC("expense", item)}
                >
                  Update
                </button>
                <button
                  className="budgetbutton"
                  onClick={() => handleCancelBC("expense", "edit")}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="budgetdata" key={data.id}>
              <div className="budgettable">
                <div className="budgetitem">{data.category}</div>
                {/* <div className="budgetitem">{data.name}</div> */}
                <button
                  className="budgetbutton longbutton"
                  onClick={() => viewTransactionBC(data)}
                >
                  {data.name}
                </button>
                <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
                <div className="budgetitem">to calculate</div>
                <div className="budgetbuttondiv">
                  <button
                    className="budgetbutton"
                    onClick={() => handleEditBC("expense", data)}
                  >
                    Edit
                  </button>
                  <button
                    className="budgetbutton"
                    onClick={() => handleDeleteBC("expense", data.id)}
                  >
                    Delete
                  </button>
                  {/* <button
                    className="budgetbutton longbutton"
                    onClick={() => viewTransactionBC(data)}
                  >
                    View actual
                  </button> */}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Form to add new items */}
      {toggleAdd.expense === true ? (
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
            <button
              type="button"
              onClick={() => handleCancelBC("expense", "add")}
            >
              Cancel
            </button>
          </fieldset>
        </form>
      ) : null}
    </div>
  );
};

export default BudgetCenter;
