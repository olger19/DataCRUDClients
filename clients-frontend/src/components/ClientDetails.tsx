import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import axios from "axios";

import { Client, TableListProps } from "../types";

const ClientDetails: React.FC<TableListProps> = ({
  handleOpen,
  searchTerm,
  reload,
}) => {
  const { id } = useParams<{ id: string }>();
  const [clients, setClient] = useState<Client[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

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
        //console.log("Response", response.data);
        setClient(response.data);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchClientDetails();
  }, [id, reload]);

  // Filter clients by search term
  const filteredClients = clients.filter((client) => {
    return (
      (client.tipo_doc?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.nro_doc?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.razon_comercial?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.nombre_comercial?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.nombre_contacto?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.telefonos?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.correos?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.telefonos2?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (client.correos2?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  });

  const downloadExcel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/export-excel/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob", // Importante para manejar archivos
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data as BlobPart])
      );
      //TODO: APLICAR DISENO PARA EL EXCEL DESDE AQUI
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DataCompleta.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el archivo", error);
    }
  };

  if (!clients) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {tableRef.current && (
        <DownloadTableExcel
          filename="tabledata"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button className="btn btn-success m-2">
            Exportar Tabla Actual en Excel
          </button>
        </DownloadTableExcel>
      )}
      <button className="btn btn-success m-2" onClick={downloadExcel}>
        Exportar Data completa
      </button>

      <div className="overflow-x-auto rounder-box border border-base-content/5 bg-base-100 mt-10">
        {clients.length === 0 ? (
          <p>Cargando datos...</p>
        ) : (
          <table ref={tableRef} className="table table-xs table-zebra">
            <thead>
              <tr>
                <th>Id</th>
                <th>
                  Tipo Doc.
                </th>
                <th>Nro Doc.</th>
                <th>Razón Comercial</th>
                <th>Nom. Comercial</th>
                <th>
                  Ciudad
                  <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button" className="btn m-1">
                      ⬇️
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu rounded-box bg-base-100 z-1 w-52 p-2"
                    >
                      <li>
                        <a>Arequipa</a>
                      </li>
                      <li>
                        <a>Moquegua</a>
                      </li>
                    </ul>
                  </div>
                </th>
                <th>Nom. Vendedor</th>
                <th>Nom. Contacto</th>
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
                  <td>{client.tipo_doc || " "}</td>
                  <td>{client.nro_doc || " "}</td>
                  <td>{client.razon_comercial || " "}</td>
                  <td>{client.nombre_comercial || " "}</td>
                  <td>{client.ciudad || " "}</td>
                  <td>{client.nombre_vendedor || " "}</td>
                  <td>{client.nombre_contacto || " "}</td>
                  <td>{client.telefonos || " "}</td>
                  <td>{client.correos || " "}</td>
                  <td>{client.telefonos2 || " "}</td>
                  <td>{client.correos2 || " "}</td>
                  <td>
                    <button
                      onClick={() => handleOpen("edit", client.id_cliente)}
                      className="btn btn-secondary"
                    >
                      Editar
                    </button>
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
