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
          <div className="card bg-base-100 w-96 h-auto shadow-sm mt-5">
            <figure>
              <img
                src="https://static.vecteezy.com/system/resources/previews/040/815/487/non_2x/client-icon-in-logotype-vector.jpg"
                alt="Clientes"
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
          <div className="card bg-base-100 w-96 h-auto shadow-sm mt-5">
            <figure>
              <img
                src="https://w7.pngwing.com/pngs/698/880/png-transparent-computer-icons-vendor-delivery-miscellaneous-blue-data-thumbnail.png"
                alt="Clientes"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Proveedores</h2>
              <p>
                Accede a informacion de proveedores.
              </p>
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
          <div className="card bg-base-100 w-96 h-auto shadow-sm mt-5">
            <figure>
              <img
              className="w-full h-48 object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG5IvsSOjHAD13Bg6EfQ_lYlgqVw0YMoyPKQ&s"
                alt="Clientes"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Servicios</h2>
              <p>
                Accede a informacion de Servicios.
              </p>
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
