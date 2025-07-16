import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logOut } from "../../Store/authSlice";
function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logOut());
    });
  };
  return <button>
    Logout
  </button>
}

export default LogoutBtn;
