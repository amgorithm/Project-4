import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MainHomePage from "../MainHomePage/MainHomePage";
import UserHomePage from "../UserHomePage/UserHomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import useUser from "../../hooks/useUser";
import NavBar from "../../components/NavBar/NavBar";
import Inventory from "../Inventory/Inventory";
import InventoryView from "../InventoryView/InventoryView";
import InventoryEdit from "../InventoryEdit/InventoryEdit";
import AddFood from "../AddFood/AddFood";
import UserAnalytics from "../UserAnalytics/UserAnalytics";
import InventorySearch from "../InventorySearch/InventorySearch";
import UnactionedExpiredFoodView from "../UnactionedExpiredFoodView/UnactionedExpiredFoodView";
// import UnactionedExpiredFoodEdit from "../UnactionedExpiredFoodEdit/UnactionedExpiredFoodEdit";
import { ProtectedRoute } from "../../utils/route";

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
        <Route exact path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<MainHomePage />} />
        {/* <Route exact path="/dashboard" element={<UserHomePage />} /> */}
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        {/* <Route exact path="/inventory" element={<Inventory />} /> */}
        {/* <Route exact path="/inventory-add" element={<AddFood />} /> */}
        {/* <Route exact path="/profile" element={<UserAnalytics />} />
        <Route exact path="/search" element={<InventorySearch />} /> */}
        {/* <Route
          exact
          path="/inventory-view/:foodID"
          element={<InventoryView />}
        /> */}
        {/* <Route
          exact
          path="/inventory-edit/:foodID"
          element={<InventoryEdit />}
        /> */}
        {/* <Route
          exact
          path="/expired-inventory-view/:foodID"
          element={<UnactionedExpiredFoodView />}
        />
        <Route
          exact
          path="/expired-inventory-edit/:foodID"
          element={<UnactionedExpiredFoodEdit />}
        /> */}

        <Route
          exact
          path="/dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <UserHomePage />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/inventory-add"
          element={
            <ProtectedRoute>
              <AddFood />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/inventory-view/:foodID"
          element={
            <ProtectedRoute>
              <InventoryView />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/inventory-edit/:foodID"
          element={
            <ProtectedRoute>
              <InventoryEdit />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/expired-inventory-view/:foodID"
          element={
            <ProtectedRoute>
              <UnactionedExpiredFoodView />
            </ProtectedRoute>
          }
        />
        {/* View and edit for expired food combined */}
        {/* <Route
          exact
          path="/expired-inventory-edit/:foodID"
          element={
            <ProtectedRoute>
              <UnactionedExpiredFoodEdit />
            </ProtectedRoute>
          }
        /> */}
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute>
              <UserAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <ProtectedRoute>
              <InventorySearch />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
