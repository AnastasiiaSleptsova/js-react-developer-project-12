import {useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const PrivateRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }, [navigate]);

  return (
    children
  )
}
