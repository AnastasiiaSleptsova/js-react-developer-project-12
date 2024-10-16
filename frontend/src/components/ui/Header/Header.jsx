import { Button } from "../Button/Button";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token"); 

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={classes.header}>
      <NavLink to='/login' className={classes.logoText}>Hexlet Chat</NavLink>
      {isAuthenticated && (
        <Button variant="primary" onClick={logout}>
          Выйти
        </Button>
      )}
    </div>
  );
};
