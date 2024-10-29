import { Routes, Route, } from "react-router-dom";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {MainPage} from "../pages/MainPage/MainPage";
import {PageNotFound} from "../pages/PageNotFound/PageNotFound";
import {Signup} from "../pages/Signup/Signup"
import { PrivateRoute } from "./PrivateRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
