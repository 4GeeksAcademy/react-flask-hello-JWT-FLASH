import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Private from "./pages/Private";

// Componente wrapper para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      {/* Rutas públicas */}
      <Route index element={<Home />} />
      <Route path="single/:theId" element={<Single />} />
      <Route path="demo" element={<Demo />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* Ruta privada */}
      <Route
        path="private"
        element={
          <PrivateRoute>
            <Private />
          </PrivateRoute>
        }
      />
    </Route>
  )
);
