import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/Homepage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import useUser from "../../hooks/useUser";
import NavBar from "../../components/NavBar/NavBar";
import Inventory from "../Inventory/Inventory";
import InventoryView from "../InventoryView/InventoryView";
import InventoryEdit from "../InventoryEdit/InventoryEdit";
import AddFood from "../AddFood/AddFood";
import UserAnalytics from "../UserAnalytics/UserAnalytics";

function App() {
  const { refreshAuth } = useUser();

  React.useEffect(() => {
    refreshAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <header className="header">
        <h1>Waste Not</h1>
        <NavBar />
      </header>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/inventory" element={<Inventory />} />
        <Route exact path="/inventory-add" element={<AddFood />} />
        <Route exact path="/profile" element={<UserAnalytics />} />
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
