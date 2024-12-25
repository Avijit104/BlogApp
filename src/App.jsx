import { useState } from "react";
import "./App.css";
import authServices from "./appwrite/authServ";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./sotre/authSlice";
import { Outlet } from "react-router";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(false); //this shoud be set true
  const dispatch = useDispatch();

  useEffect(() => {
    authServices
      .getUserAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading((prev) => !prev);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-gray-800 flex flex-wrap content-between text-white">
      <div className="w-full block border-2 border-red-100">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-800 flex flex-wrap content-between text-white">
      this is shit
    </div>
  );
}

export default App;
