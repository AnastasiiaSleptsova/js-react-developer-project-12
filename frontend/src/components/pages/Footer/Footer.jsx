import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./Footer.module.css";
import { changeLanguage } from "i18next";
import leoProfanity from "leo-profanity";

export function Footer() {
  const [language, setLanguage] = useState("ru");
  const { t } = useTranslation();

  const handleLanguageChange = (language) => {
    setLanguage(language);
    changeLanguage(language);
  };
  leoProfanity.loadDictionary(language);

  return (
    <div className={classes.footer}>
      <p className={classes.text}>{t("footer")}.</p>
      <div className={classes.languageSwitcher}>
        <button
          className={`${classes.languageButton} ${
            language === "en" ? classes.active : ""
          }`}
          onClick={() => handleLanguageChange("en")}
        >
          EN
        </button>
        <button
          className={`${classes.languageButton} ${
            language === "ru" ? classes.active : ""
          }`}
          onClick={() => handleLanguageChange("ru")}
        >
          RU
        </button>
      </div>
    </div>
  );
}
