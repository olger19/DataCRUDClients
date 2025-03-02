import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Client, TableListProps } from "../types";

const ClientDetails: React.FC<TableListProps> = ({ handleOpen }) => {
  const { id } = useParams<{ id: string }>();
  const [clients, setClient] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get<Client[]>(
          `http://localhost:3000/api/clientes/familia/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Response", response.data);
        setClient(response.data);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchClientDetails();
  }, [id]);

  if (!clients) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="overflow-x-auto mt-10">
        {clients.length === 0 ? (
          <p>No hay datos guardados...</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Razón Comercial</th>
                <th>Nombre Comercial</th>
                <th>Nombre de Contacto</th>
                <th>Teléfonos</th>
                <th>Correos</th>
                <th>Teléfonos 2</th>
                <th>Correos 2</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td>{client.razon_comercial}</td>
                  <td>{client.nombre_comercial}</td>
                  <td>{client.nombre_contacto}</td>
                  <td>{client.telefonos}</td>
                  <td>{client.correos}</td>
                  <td>{client.telefonos2 || "N/A"}</td>
                  <td>{client.correos2 || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleOpen("edit")}
                      className="btn btn-secondary"
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-accent">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ClientDetails;
