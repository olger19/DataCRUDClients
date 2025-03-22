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
  const [cityFilter, setCityFilter] = useState<string>("");
  const [nomComercialFilter, setNomComercialFilter] = useState<string>("");
  const [nomVendedorFilter, setNomVendedor] = useState<string>("");

  const handleNomComercialFilterChange = (nomComercial: string) => {
    setNomComercialFilter(nomComercial);
  };

  const handleNomVendedorFilterChange = (nomVendedor: string) => {
    setNomVendedor(nomVendedor);
  };

  const handleCityFilterChange = (city: string) => {
    setCityFilter(city);
  };

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

  // Obtener una lista unica de Nombres Comerciales
  const uniqueNomComercial = Array.from(
    new Set(
      clients.map((client) => client.nombre_comercial?.toLowerCase() || "")
    )
  ).filter((nomComercial) => nomComercial !== "");

  //Obtener una lista unica de nombres de vendedores
  const uniqueNomVendedor = Array.from(
    new Set( clients.map((client) => client.nombre_vendedor?.toLowerCase() || "" ))
  ).filter((nomVendedor) => nomVendedor !== "");

  // Obtener una lista única de ciudades
  const uniqueCities = Array.from(
    new Set(clients.map((client) => client.ciudad?.toLowerCase() || ""))
  ).filter((city) => city !== "");

  // Filter clients by search term
  const filteredClients = clients.filter((client) => {
    const matchesSearchTerm =
      searchTerm === "" ||
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
      (client.correos2?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesCityFilter =
      cityFilter === "" ||
      client.ciudad?.toLowerCase() === cityFilter.toLowerCase();

    const matchesNomVendedorFilter =
      nomVendedorFilter === "" ||
      client.nombre_vendedor?.toLowerCase() === nomVendedorFilter.toLowerCase();

    const matchesNomComercialFilter =
      nomComercialFilter === "" ||
      client.nombre_comercial?.toLowerCase() ===
        nomComercialFilter.toLowerCase();

    return (
      matchesSearchTerm &&
      matchesCityFilter &&
      matchesNomComercialFilter &&
      matchesNomVendedorFilter
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
      {/* //TODO:Exportar tabla actual, me muestra todas las ciudades pero no deberia mostrarme eso, solo las columnas. */}
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

      {/* Filtros */}
      <div className="flex items-center gap-2 mb-4 m-2">
        <label>Filtrar por Nombre Comercial:</label>
        <select
          className="select select-bordered"
          onChange={(e) => handleNomComercialFilterChange(e.target.value)}
          value={nomComercialFilter}
        >
          <option value="">Todas</option>
          {uniqueNomComercial.map((nomComercial) => (
            <option key={nomComercial} value={nomComercial}>
              {nomComercial.charAt(0).toUpperCase() + nomComercial.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {id == "1" ?(
      <div className="flex items-center gap-2 mb-4 m-2">
        <label>Filtrar por Nombre Vendedor:</label>
        <select
          className="select select-bordered"
          onChange={(e) => handleNomVendedorFilterChange(e.target.value)}
          value={nomVendedorFilter}
        >
          <option value="">Todas</option>
          {uniqueNomVendedor.map((nomVendedor) => (
            <option key={nomVendedor} value={nomVendedor}>
              {nomVendedor.charAt(0).toUpperCase() + nomVendedor.slice(1)}
            </option>
          ))}
        </select>
      </div>
      ): null}
      <div className="flex items-center gap-2 mb-4 m-2">
        <label>Filtrar por ciudad:</label>
        <select
          className="select select-bordered"
          onChange={(e) => handleCityFilterChange(e.target.value)}
          value={cityFilter}
        >
          <option value="">Todas</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {/* Fin Filtros */}
      <div className="overflow-x-auto rounder-box border border-base-content/5 bg-base-100 mt-10">
        {clients.length === 0 ? (
          <p>Cargando datos...</p>
        ) : (
          <table ref={tableRef} className="table table-xs table-zebra overflow-x-auto">
            <thead className="bg-base-200">
              <tr>
                <th>Id</th>
                <th>Tipo Doc.</th>
                <th>Nro Doc.</th>
                <th>Razón Comercial</th>
                <th>Nom. Comercial</th>
                <th>Ciudad</th>
                <th>Nom. Vendedor</th>
                <th>Nom. Contacto</th>
                <th>Teléfonos</th>
                <th>Correos</th>
                <th>Teléfonos 2</th>
                <th>Correos 2</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr key={index} className="hover:bg-base-300">
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
                  <td className="sticky right-0">
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
