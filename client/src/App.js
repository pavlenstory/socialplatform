import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MenuBar from "./comonents/MenuBar";
import AuthRoute from "./context/authRoute";
import { AuthProvider } from "./context/auth";
function App() {
  return (
    <AuthProvider>
      <MenuBar />
      <Routes>
        <Route path="" element={<Home />} />

        <Route exact path="/" element={<AuthRoute />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route exact path="/" element={<AuthRoute />}>
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
