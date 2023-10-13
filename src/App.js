import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { app, database } from "./firebaseConfig";
import Manager from "./components/Home/Pages/Manager";
import Generator from "./components/Home/Pages/Generator";
import Checker from "./components/Home/Pages/Checker";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/register" element={<Register database={database} />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manager" element={<Manager database={database} />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/checker" element={<Checker />} />
      </Routes>
    </div>
  );
}

export default App;
