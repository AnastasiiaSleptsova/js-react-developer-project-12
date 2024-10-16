import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/app/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/ui/Header/Header";
import { Footer } from "./components/pages/Footer/Footer";

import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <div className={classes.wrapper}>
          <Header />
          <div className={classes.content}>
            <Router />
          </div>
          <div className={classes.footer}>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
