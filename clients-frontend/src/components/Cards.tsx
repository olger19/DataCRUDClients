import React from "react";
import { useNavigate } from "react-router-dom";

import { CardProps } from "../types";

const Cards: React.FC<CardProps> = ({ permissions }) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/client-details/${id}`);
  };
  return (
    <>
      <div className="flex flex-grap justify-center items-center gap-4">
        {permissions.includes("1") && (
          <div className="card w-96 bg-blue-100 card-lg shadow-sm">
            <figure className="px-10 pt-10">
              <img
                src="https://sinch.com/wp-content/uploads/2024/08/Os-6-principais-tipos-de-clientes-e-como-lidar-com-cada-um-deles-Capa.png"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Clientes</h2>
              <p>Acceder a informacion de clientes.</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleCardClick("1")}
                >
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        )}

        {permissions.includes("2") && (
          <div className="card w-96 bg-blue-100 card-lg shadow-sm">
            <figure className="px-10 pt-10">
              <img
                src="https://sinch.com/wp-content/uploads/2024/08/Os-6-principais-tipos-de-clientes-e-como-lidar-com-cada-um-deles-Capa.png"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Proveedores</h2>
              <p>Accede a informacion de proveedores.</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleCardClick("2")}
                >
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        )}

        {permissions.includes("3") && (
          <div className="card w-96 bg-blue-100 card-lg shadow-sm">
            <figure className="px-10 pt-10">
              <img
                src="https://sinch.com/wp-content/uploads/2024/08/Os-6-principais-tipos-de-clientes-e-como-lidar-com-cada-um-deles-Capa.png"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Servicios</h2>
              <p>Accede a informacion de Servicios.</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleCardClick("3")}
                >
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cards;
