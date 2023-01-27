import "./App.css";
import Login from "./pages/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

function App() {
  const hasJWT = localStorage.getItem("isAuthenticate") ? true : false;
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute Components={<Home />} />} />
        <Route
          path="/login"
          element={!hasJWT ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </>
  );
}

export default App;
