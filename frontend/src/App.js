import "./App.css";
import Login from "./pages/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home/Home";

function App() {
  const hasJWT = localStorage.getItem("isAuthenticated") ? true : false;
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute Components={<Home />} />} />
        <Route
          path="/login"
          element={!hasJWT ? <Login /> : <Navigate replace to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
