import { useState } from "react";

const BudgetCenter = ({month, budget, handleChangeCalBudget, populateDataBudget, handleDeleteBudget}) => {
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

  const handleDeleteBC = (id) => {
    handleDeleteBudget(id);
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
        onChange={() => handleChangeCalendarBC(event)}
      />
      {budget.length === 0 ? (
        <button onClick={() => populateDataBC()}>Start planning</button>
      ) : null}
      <br />
      <br />

      {/* budget summary table */}
      {/* budget summary table header */}
      <div className="budgettitle">
        <div>Budget for {monthWord[currentMonth - 1] + " " + year}</div>
        <button className="budgetbutton" onClick={() => handleCreateBC()}>
          Add
        </button>
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

      {/* display of all existing items */}
      {budget.map((data) => (
        <div className="budgettable" key={data.id}>
          <div className="budgetitem">{data.category}</div>
          <div className="budgetitem">{data.name}</div>
          <div className="budgetitem">{data.planned_amt.toFixed(2)}</div>
          <div className="budgetitem">to calculate</div>
          <div>
            <button className="budgetbutton" onClick={() => handleEditBC(data.id)}>Edit</button>
            <button className="budgetbutton" onClick={() => handleDeleteBC(data.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetCenter;
