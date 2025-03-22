import React from "react";
import { useNavigate } from "react-router-dom";

import { NavBarProps } from "../types";

const NavBar: React.FC<NavBarProps> = ({ onOpen, onSearch }) => {
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-base-100 p-4 sticky top-0 z-50 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a className="btn btn-ghost text-xl">
              <img
                src="/LOGO UNIMEDICA 2024.png"
                alt="Logo"
                className="w-32 h-auto"
              />
            </a>
          </div>

          {/* Buscador */}
          <div className="w-full max-w-md">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M16.65 10a6.65 6.65 0 11-13.3 0 6.65 6.65 0 0113.3 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Buscar coincidencias..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Botón + Avatar */}
          <div className="flex items-center gap-2">
            <a className="btn btn-primary hover:bg-red-700" onClick={onOpen}>
              Agregar Cliente
            </a>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Usuario"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li onClick={handleLogout}>
                  <a>Cerrar sesión</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
