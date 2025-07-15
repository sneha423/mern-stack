import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { logIn, logOut } from "./Store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .isLoggedIn()
      .then((userData) => {
        if (userData) {
          dispatch(logIn({ userData }));
        }
        else{
          dispatch(logOut())
        }
      })
      .finally(()=>setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-sc"></div>
  ):null
}

export default App;
