import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/app/Router";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
