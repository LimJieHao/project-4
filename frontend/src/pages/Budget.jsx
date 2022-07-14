import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import BudgetCenter from "../components/budget/BudgetCenter";
import BudgetRightPanel from "../components/budget/BudgetRightPanel";

const Budget = () => {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);

  if (user.email === undefined) {
    navigate("/login");
  }

  // Calculate the current month for the state
  const dateFunc = new Date();
  const mthNum =
    dateFunc.getMonth() + 1 < 10
      ? "0" + (dateFunc.getMonth() + 1)
      : dateFunc.getMonth() + 1;
  const currentMth = dateFunc.getFullYear() + "-" + mthNum;

  // Month and budget State
  const [month, setMonth] = useState(currentMth);
  const [budget, setBudget] = useState({ income: [], expense: [], total: [] });
  const [toggleTrans, setToggleTrans] = useState(false);
  const [viewTrans, setViewTrans] = useState([]);
  const [transType, setTransType] = useState({ id: "", name: "" });

  // Convert month state to date ISO format for db fetching
  const date = new Date(month + "-01");
  const dateISO = date.toISOString();

  // calculate the first date of the month and last day of the month
  const lastDayCalc = (y, m) => {
    return new Date(y, m, 0).getDate().toString();
  };
  const firstDayMth = month + "-01";
  const lastDayMth =
    month +
    "-" +
    lastDayCalc(
      month.substring(0, 4),
      Number(month.substring(month.length - 2, month.length))
    );
  const startMth = new Date(firstDayMth);
  const startMthISO = startMth.toISOString();
  const endMth = new Date(lastDayMth);
  const endMthISO = endMth.toISOString();

  // Initial fetch
  useEffect(() => {
    fetch(`/api/budget/${user.id}/${dateISO}/`)
      .then((response) => response.json())
      .then((data) => setBudget(data));
  }, [month, viewTrans]);

  // Callback function from child
  const handleChangeCalBudget = (str) => {
    setMonth(str);
    setToggleTrans(false);
  };

  const handleAddBudget = (type, item) => {
    fetch(`/api/budget/addbudcat/${user.id}/${dateISO}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        if (type === "income") {
          setBudget({
            income: [...budget.income, data],
            expense: [...budget.expense],
          });
        } else if (type === "expense") {
          setBudget({
            income: [...budget.income],
            expense: [...budget.expense, data],
          });
        }
      });
  };

  const handleEditBudget = (type, data) => {
    fetch(`/api/budget/updatebud/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const pos = budget[type].findIndex((item) => item.id === data.id);
        if (type === "income") {
          setBudget({
            income: [
              ...budget.income.slice(0, pos),
              data,
              ...budget.income.slice(pos + 1),
            ],
            expense: [...budget.expense],
          });
        } else if (type === "expense") {
          setBudget({
            income: [...budget.income],
            expense: [
              ...budget.expense.slice(0, pos),
              data,
              ...budget.expense.slice(pos + 1),
            ],
          });
        }
      });
  };

  const populateDataBudget = () => {
    fetch(`/api/budget/populate/${user.id}/${dateISO}`, { method: "POST" })
      .then((response) => response.json())
      .then((data) => setBudget(data));
  };

  const deleteDataBudget = () => {
    fetch(
      `/api/budget/removebudbyuser/${user.id}/${startMthISO}/${endMthISO}`,
      { method: "DELETE" }
    )
      .then((response) => response.json())
      .then((data) => setBudget({ income: [], expense: [] }));
    setViewTrans([]);
    setToggleTrans(false);
  };

  const handleDeleteBudget = (type, id) => {
    fetch(`/api/budget/removebud/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        if (type === "income") {
          setBudget({
            income: budget[type].filter((b) => b.id !== id),
            expense: [...budget.expense],
          });
        } else if (type === "expense") {
          setBudget({
            income: [...budget.income],
            expense: budget[type].filter((b) => b.id !== id),
          });
        }
      });
    setViewTrans([]);
    setToggleTrans(false);
  };

  const viewTransactionBudget = (type) => {
    setToggleTrans(true);
    fetch(
      `/api/transaction/read/${user.id}/${startMthISO}/${endMthISO}/${type.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setViewTrans(data);
      });
    setTransType({ id: type.id, name: type.name });
  };

  const closeTransBRP = () => {
    setToggleTrans(false);
  };

  const transAddBRP = (item) => {
    Number(item.date) < 10 ? (item.date = "0" + item.date) : null;
    const itemDate = new Date(month + "-" + item.date);
    const itemDateISO = itemDate.toISOString();
    item.date = itemDateISO;
    fetch(`/api/transaction/addtrans/${user.id}/${transType.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        setViewTrans([...viewTrans, data]);
      });
  };

  const transEditBRP = (item) => {
    Number(item.date) < 10 ? (item.date = "0" + item.date) : null;
    const itemDate = new Date(month + "-" + item.date);
    const itemDateISO = itemDate.toISOString();
    item.date = itemDateISO;
    fetch(`/api/transaction/updatetrans/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        const pos = viewTrans.findIndex((trans) => trans.id === item.id);
        setViewTrans([
          ...viewTrans.slice(0, pos),
          data,
          ...viewTrans.slice(pos + 1),
        ]);
      });
  };

  const transDeleteBRP = (id) => {
    fetch(`/api/transaction/removetrans/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        setViewTrans(viewTrans.filter((element) => element.id !== id));
      });
  };

  return (
    <>
      <BudgetCenter
        month={month}
        budget={budget}
        handleChangeCalBudget={handleChangeCalBudget}
        handleAddBudget={handleAddBudget}
        populateDataBudget={populateDataBudget}
        deleteDataBudget={deleteDataBudget}
        handleEditBudget={handleEditBudget}
        handleDeleteBudget={handleDeleteBudget}
        viewTransactionBudget={viewTransactionBudget}
      />
      {toggleTrans === true ? (
        <BudgetRightPanel
          month={month}
          transType={transType}
          viewTrans={viewTrans}
          transAddBRP={transAddBRP}
          transEditBRP={transEditBRP}
          transDeleteBRP={transDeleteBRP}
          closeTransBRP={closeTransBRP}
        />
      ) : (
        "null"
      )}
    </>
  );
};

export default Budget;
