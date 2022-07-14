import { useState } from "react";

const BudgetCenter = ({ month, budget, handleChangeCalBudget, populateDataBudget, handleDeleteBudget }) => {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [item, setItem] = useState({
    type: "",
    category: "",
    planned_amt: 0.0,
  });

  //calculate the min month and max month
  let minMonth = parseInt(month.substring(0, 4)) - 2 + "-01";
  let maxMonth = parseInt(month.substring(0, 4)) + 2 + "-12";

  // Convert Month into words
  const monthWord = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = month.substring(month.length - 1, month.length);
  const year = month.substring(0, 4);

  const handleChangeCalBC = (event) => {
    handleChangeCalBudget(event.target.value);
  };

  const populateDataBC = () => {
    populateDataBudget();
  };

  const handleCreateBC = () => {
    setToggleAdd(true);
  };

  const handleChangeAddBC = (event, key) => {
    setItem({
      ...item,
      [key]: event.target.value,
    });
  };

  const handleEditBC = (id) => {
    console.log(id);
  };

  const handleDeleteBC = (type, id) => {
    handleDeleteBudget(type, id);
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
      {budget.income.length === 0 && budget.expense.length === 0 ? (<button onClick={() => populateDataBC()}>Start planning</button>) : null}
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
          <button className="budgetbutton" onClick={() => handleCreateBC()}>Add</button>
        </div>
        <div className="budgettable">
          <div className="budgetitem">Category</div>
          <div className="budgetitem">Name</div>
          <div className="budgetitem">Planned</div>
          <div className="budgetitem">Actual</div>
        </div>
        {/* Form to add new items */}
        {toggleAdd === true ? (
          <form method="post" onSubmit={handleSubmitProduct}>
            <fieldset>
              <legend>Add new Product</legend>
              <label htmlFor="productname">Product Name</label>
              <input
                className="inputfield"
                required
                type="text"
                placeholder="product name"
                name="productname"
                id="productname"
                value={product.product_name}
                onChange={() => handleChange(event, "product_name")}
              />
              <br />
              <label htmlFor="productcategory">Product Category</label>
              <input
                className="inputfield"
                required
                type="text"
                placeholder="product category"
                name="productcategory"
                id="productcategory"
                value={product.product_category}
                onChange={() => handleChange(event, "product_category")}
              />
              <br />
              <label htmlFor="productimage">Image</label>
              <input
                className="inputfield"
                required
                type="text"
                placeholder="product image"
                name="productimage"
                id="productimage"
                value={product.product_image}
                onChange={() => handleChange(event, "product_image")}
              />
              <br />
              <button>Add Product</button>
            </fieldset>
          </form>
        ) : null}

        {/* display of all income items */}
        {budget.income.map((data) => (
          <div className="budgettable" key={data.id}>
            <div className="budgetitem">{data.category}</div>
            <div className="budgetitem">{data.name}</div>
            <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
            <div className="budgetitem">to calculate</div>
            <div>
              <button className="budgetbutton" onClick={() => handleEditBC(data.id)}>Edit</button>
              <button className="budgetbutton" onClick={() => handleDeleteBC("income", data.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {/* budget expense summary table */}
      {/* budget expense summary table header */}
      <div className="budgetcontainer">
        <div className="budgettitle">
          Expense
          <button className="budgetbutton" onClick={() => handleCreateBC()}>Add</button>
        </div>
        <div className="budgettable">
          <div className="budgetitem">Category</div>
          <div className="budgetitem">Name</div>
          <div className="budgetitem">Planned</div>
          <div className="budgetitem">Actual</div>
        </div>
        {/* Form to add new items */}
        {toggleAdd === true ? (
          <form method="post" onSubmit={handleSubmitProduct}>
            <fieldset>
              <legend>Add new Product</legend>
              <label htmlFor="productname">Product Name</label>
              <input
                className="inputfield"
                required
                type="text"
                placeholder="product name"
                name="productname"
                id="productname"
                value={product.product_name}
                onChange={() => handleChange(event, "product_name")}
              />
              <br />
              <label htmlFor="productcategory">Product Category</label>
              <input
                className="inputfield"
                required
                type="text"
                placeholder="product category"
                name="productcategory"
                id="productcategory"
                value={product.product_category}
                onChange={() => handleChange(event, "product_category")}
              />
              <br />
              <label htmlFor="productimage">Image</label>
              <input
                className="inputfield"
                required
                type="text"
                placeholder="product image"
                name="productimage"
                id="productimage"
                value={product.product_image}
                onChange={() => handleChange(event, "product_image")}
              />
              <br />
              <button>Add Product</button>
            </fieldset>
          </form>
        ) : null}

        {/* display of all expense items */}
        {budget.expense.map((data) => (
          <div className="budgettable" key={data.id}>
            <div className="budgetitem">{data.category}</div>
            <div className="budgetitem">{data.name}</div>
            <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
            <div className="budgetitem">to calculate</div>
            <div>
              <button className="budgetbutton" onClick={() => handleEditBC(data.id)}>Edit</button>
              <button className="budgetbutton" onClick={() => handleDeleteBC("expense", data.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetCenter;
