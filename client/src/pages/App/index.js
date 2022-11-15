import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import useUser from "../../hooks/useUser";
import NavBar from "../../components/NavBar/NavBar";
import Inventory from "../Inventory/Inventory";
import InventoryView from "../InventoryView/InventoryView";
import InventoryEdit from "../InventoryEdit/InventoryEdit";
import AddFood from "../AddFood/AddFood";

function App() {
  const { refreshAuth } = useUser();

  React.useEffect(() => {
    refreshAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <header className="header">
        <p>Login</p> <NavBar />
      </header>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/inventory" element={<Inventory />} />
        <Route exact path="/add-food" element={<AddFood />} />
        <Route
          exact
          path="/inventory-view/:foodID"
          element={<InventoryView />}
        />
        <Route
          exact
          path="/inventory-edit/:foodID"
          element={<InventoryEdit />}
        />
      </Routes>
    </div>
  );
}

export default App;
