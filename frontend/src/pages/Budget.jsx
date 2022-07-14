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
  const [budget, setBudget] = useState({ income: [], expense: [] });

  // Convert month state to date ISO format for db fetching
  const date = new Date(month + "-01");
  const dateISO = date.toISOString();

  // Initial fetch
  useEffect(() => {
    fetch(`/api/budget/${user.id}/${dateISO}`)
      .then((response) => response.json())
      .then((data) => setBudget(data));
  }, [month]);

  // Callback function from child
  const handleChangeCalBudget = (str) => {
    setMonth(str);
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
        const pos = budget[type].findIndex((item) => item.id === data.id)
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
    fetch(`/api/budget/removebudbyuser/${user.id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => setBudget({ income: [], expense: [] }));
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
      />
      <BudgetRightPanel />
    </>
  );
};

export default Budget;
