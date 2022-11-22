import React from "react";
import { UserContext } from "../context/UserContext";
import userService from "../utils/userService";
import tokenService from "../utils/tokenService";

export default function useUser() {
  const [state, setState] = React.useContext(UserContext);

  const handleSignupOrLogin = () => {
    const freshUser = userService.getUser();
    setState((state) => ({ ...state, user: freshUser }));
  };

  const handleLogout = () => {
    userService.logout();
    setState({ ...state, user: null });
  };

  const refreshAuth = () => {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("token")) {
      const user = tokenService.getUserFromToken();
      return setState({ ...state, user });
    } else return false;
  };

  return {
    user: state.user,
    handleSignupOrLogin,
    handleLogout,
    refreshAuth,
  };
}
