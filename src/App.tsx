import { Game } from "./Game";
import "./App.css";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <Route path="/" element={<NavBar></NavBar>}></Route> */}
          <Route path="/" element={<NavBar></NavBar>}></Route>
          <Route path="/game" element={<Game></Game>}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
