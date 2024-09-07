import React from "react";
import { Button } from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";


const MainPage = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="container">
      <Button variant="primary" onClick={logout}>
        Выйти
      </Button>
      <div> Вы на главной странице. Вас зовут </div>
    </div>
  );
};

export default MainPage;
