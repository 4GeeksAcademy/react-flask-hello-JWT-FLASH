import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        alert("Sesión cerrada");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">Mi App</Link>
            <div className="ml-auto">
                {token ? (
                    <>
                        <Link className="btn btn-outline-light me-2" to="/private">Zona Privada</Link>
                        <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                        <Link className="btn btn-outline-light" to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
