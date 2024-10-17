import { Button } from "../Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import classes from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuthenticated = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={classes.header}>
      <NavLink to="/login" className={classes.logoText}>
        {t("logoText")}
      </NavLink>
      {isAuthenticated && (
        <Button variant="primary" onClick={logout}>
          {t("buttonExit")}
        </Button>
      )}
    </div>
  );
};
