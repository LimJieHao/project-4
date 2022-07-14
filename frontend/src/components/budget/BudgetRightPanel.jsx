import { useState } from "react";

const BudgetRightPanel = ({
  viewTrans,
  transCreateBRP,
  transEditBRP,
  transDeleteBRP,
  closeTransBRP,
}) => {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [item, setItem] = useState({
    date: "",
    merchant: "",
    actual_amt: "",
    note: "",
  });
  const handleChangeFormBRP = (event, key) => {
    if (key === "actual_amt") {
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

  const handleCreateBRP = () => {
    transCreateBRP();
  };

  const handleEditBRP = () => {
    transEditBRP();
  };

  const handleDeleteBRP = () => {
    transDeleteBRP();
  };

  const handleCloseBRP = () => {
    closeTransBRP();
  };

  return (
    <div className="budgetrightpanel">
      <div className="panel-title-container">
        <div className="paneltitle">Actual Transaction for</div>
        <button className="panelbutton" onClick={() => handleCreateBRP()}>
          Add
        </button>
        <button className="panelbutton" onClick={() => handleCloseBRP()}>
          Close
        </button>
      </div>
      <div className="paneltable paneltabletitle">
        <div className="panelitem">Date</div>
        <div className="panelitem">Merchant</div>
        <div className="panelitem">Note</div>
        <div className="panelitem">Actual</div>
      </div>

      {/* Form to add new items */}
      {toggleAdd === true ? (
        <form
          className="budgetAddForm"
          method="post"
          onSubmit={() => handleAddSubmitBRP(event, "income")}
        >
          <fieldset>
            <legend>Add new item</legend>
            <label className="FormLabel" htmlFor="date">
              Date
            </label>
            <input
              className="inputfield"
              required
              type="date"
              placeholder="date"
              name="date"
              id="date"
              value={item.date}
              onChange={() => handleChangeFormBRP(event, "date")}
            />
            <br />
            <label htmlFor="merchant">Merchant</label>
            <input
              className="inputfield"
              required
              type="text"
              placeholder="merchant"
              name="merchant"
              id="merchant"
              value={item.merchant}
              onChange={() => handleChangeFormBRP(event, "merchant")}
            />
            <br />
            <label htmlFor="note">Note</label>
            <input
              className="inputfield"
              required
              type="text"
              placeholder="note"
              name="note"
              id="note"
              value={item.note}
              onChange={() => handleChangeFormBRP(event, "note")}
            />
            <br />
            <label htmlFor="actual_amt">Actual amount</label>
            <input
              className="inputfield"
              required
              type="number"
              placeholder="actual_amt"
              name="actual_amt"
              id="actual_amt"
              value={item.actual_amt}
              onChange={() => handleChangeFormBRP(event, "actual_amt")}
            />
            <br />
            <button>Add</button>
            <button type="button" onClick={() => handleCancelBRP("add")}>
              Cancel
            </button>
          </fieldset>
        </form>
      ) : null}

      {/* Actual Data */}
      {viewTrans.map((data) => (
        <div className="budgetdata" key={data.id}>
          <div className="budgettable">
            <div className="budgetitem">{data.date.substring(5, 10)}</div>
            <div className="budgetitem">{data.merchant}</div>
            <div className="budgetitem">{data.note}</div>
            <div className="budgetitem">{data.actual_amt.toFixed(2)}</div>
            <div className="budgetbuttondiv">
              <button className="budgetbutton">Edit</button>
              <button className="budgetbutton">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetRightPanel;
