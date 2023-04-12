import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/signup" element={ <SignUpPage /> } />
        </Routes>
    </div>
  );
}

export default App;
