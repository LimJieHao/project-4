import { BrowserRouter, Routes, Route } from "react-router-dom";
import { atom } from "jotai";
import LeftSideBar from "./components/LeftSideBar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Budget from "./pages/Budget";
import Position from "./pages/Position";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";

export const userAtom = atom({});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/app" element={<LeftSideBar />}>
            <Route path="/app/budget" element={<Budget />} />
            <Route path="/app/position" element={<Position />} />
            <Route path="/app/insights" element={<Insights />} />
            <Route path="/app/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
