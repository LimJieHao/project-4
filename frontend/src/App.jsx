import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Budget from "../pages/Budget";
import Position from "../pages/Position";
import Insights from "../pages/Insights";
import Settings from "../pages/Settings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />}>
            </Route>
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
