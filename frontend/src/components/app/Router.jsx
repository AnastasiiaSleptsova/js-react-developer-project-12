import { Routes, Route, useNavigate} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import PageNotFound from "../PageNotFound";
import { useEffect } from "react";

export const Router = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
