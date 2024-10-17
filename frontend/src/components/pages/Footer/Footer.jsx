import React from "react";
import { useTranslation } from "react-i18next";

import classes from "./Footer.module.css";
import { changeLanguage } from "i18next";

export function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={classes.footer}>
      <div>{t("footer")}</div>
      <div className={classes.changeLanguage}>
        <button onClick={() => changeLanguage("en")}>en</button>
        <button onClick={() => changeLanguage("ru")}>ru</button>
      </div>
    </div>
  );
}
