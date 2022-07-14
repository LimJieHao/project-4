import { useState } from "react";

const BudgetRightPanel = ({
  month,
  transType,
  viewTrans,
  transAddBRP,
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
  // calculate the max last day array[0] is for Feb 29
  const dayLimit = [29, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let maxDays = 0;
  Number(month.substring(0, 4)) % 4 === 0 &&
  Number(month.substring(month.length - 2, month.length)) === 2
    ? (maxDays = dayLimit[0])
    : (maxDays =
        dayLimit[Number(month.substring(month.length - 2, month.length))]);
  console.log(maxDays)
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

  const handleAddSubmitBRP = (event) => {
    event.preventDefault();
    setToggleAdd(false);
    transAddBRP(item);
    setItem({
      date: "",
      merchant: "",
      actual_amt: "",
      note: "",
    });
  };

  const handleCancelBRP = () => {
    setToggleAdd(false);
    setItem({
      date: "",
      merchant: "",
      actual_amt: "",
      note: "",
    });
  };

  const handleEditBRP = () => {
    transEditBRP();
  };

  const handleDeleteBRP = (id) => {
    transDeleteBRP(id);
  };

  const handleCloseBRP = () => {
    closeTransBRP();
  };

  return (
    <div className="budgetrightpanel">
      <div className="panel-title-container">
        <div className="paneltitle">
          Actual Transaction for {transType.name}
        </div>
        <button className="panelbutton" onClick={() => setToggleAdd(true)}>
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
          onSubmit={() => handleAddSubmitBRP(event)}
        >
          <fieldset>
            <legend>Add new item</legend>
            <label className="FormLabel" htmlFor="day">
              Day
            </label>
            <input
              className="inputfield"
              required
              type="number"
              placeholder="day"
              name="day"
              id="day"
              min="1"
              max={maxDays}
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
            <button type="button" onClick={() => handleCancelBRP()}>
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
              <button
                className="budgetbutton"
                onClick={() => handleDeleteBRP(data.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetRightPanel;
