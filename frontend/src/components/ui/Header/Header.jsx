import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logoText">Hexlet Chat</div>
      <Button variant="primary" onClick={logout}>
        Выйти
      </Button>
    </div>
  );
};
