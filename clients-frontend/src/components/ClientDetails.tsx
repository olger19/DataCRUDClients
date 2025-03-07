import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Client, TableListProps } from "../types";

const ClientDetails: React.FC<TableListProps> = ({
  handleOpen,
  searchTerm,
}) => {
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
  // Filter clients by search term
  const filteredClients = clients.filter(
    (client) =>
      (client.tipo_doc?.toLowerCase() || "").includes(searchTerm.toLowerCase())||
      (client.nro_doc?.toLowerCase() || "").includes(searchTerm.toLowerCase())||
      (client.razon_comercial?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (client.nombre_comercial?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (client.nombre_contacto?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (client.telefonos?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (client.correos?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (client.telefonos2?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (client.correos2?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
  if (!clients) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <div className="overflow-x-auto mt-10">
        
        {clients.length === 0 ? (
          <p>No hay datos guardados...</p>
        ) : (
          <table className="table table-xs table-zebra">
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo Doc.</th>
                <th>Nro Doc.</th>
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
              {filteredClients.map((client, index) => (
                <tr key={index}>
                  <td>{client.id_cliente}</td>
                  <td>{client.tipo_doc}</td>
                  <td>{client.nro_doc}</td>
                  <td>{client.razon_comercial || "N/A"}</td>
                  <td>{client.nombre_comercial || "N/A"}</td>
                  <td>{client.nombre_contacto || "N/A"}</td>
                  <td>{client.telefonos || "N/A"}</td>
                  <td>{client.correos || "N/A"}</td>
                  <td>{client.telefonos2 || "N/A"}</td>
                  <td>{client.correos2 || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleOpen("edit", client.id_cliente)}
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
