import React from "react";
import { useNavigate } from "react-router-dom";

import { NavBarProps } from '../types';



const NavBar: React.FC<NavBarProps> = ({onOpen}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  return (
    <>
      <div className="navbar bg-base-100 p-4">
        <div className="navbar-start">
            {/* Logo */}
          <a className="btn btn-ghost text-xl">
          <img src="/LOGO UNIMEDICA 2024.png" alt="Logo" className="w-32 h-auto" />
          </a>
        </div>
        <div className="navbar-center ">
          <div className="form-control">
            <input
              type="text"
              placeholder="Buscar Cliente"
              className="input input-bordered w-100 md:w-110"
            />
          </div>
        </div>
        <div className="navbar-end">
          <a className="btn btn-primary mr-2" onClick={onOpen}>Agregar Cliente</a>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
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
    </>
  );
}

export default NavBar;