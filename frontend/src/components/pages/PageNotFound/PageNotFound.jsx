import { useTranslation } from "react-i18next";

export const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        404 <br /> {t("error404Login")}
      </div>
    </>
  );
};
