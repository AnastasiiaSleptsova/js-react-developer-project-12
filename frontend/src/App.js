import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/app/Router";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
