import { BrowserRouter, Routes, Route } from "react-router-dom";
import { atom } from "jotai";
import NavbarPage from "./pages/NavbarPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Budget from "./pages/Budget";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import LeftSideBarPage from "./pages/LeftSideBarPage";

export const userAtom = atom({});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarPage />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/app" element={<LeftSideBarPage />}>
            <Route path="/app/budget" element={<Budget />} />
            <Route path="/app/insights" element={<Insights />} />
            <Route path="/app/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
