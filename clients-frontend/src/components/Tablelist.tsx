import React, { useState } from "react";

import { TableListProps } from "../types";

const TableList: React.FC<TableListProps> = ({ handleOpen }) => {
  const clients = [
    {
      id: 1,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano1@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 2,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano2",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano2@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 3,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 4,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 5,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 6,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 7,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 8,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 9,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 10,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 11,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
    {
      id: 12,
      Cliente: "Clinica San Juan de Dios",
      NombreComercial: "Vacio",
      NroDocumento: "12345678",
      TipoDocumento: "DNI",
      Contacto: "Fulano3",
      Telefono1: "987654321",
      Telefono2: "987654323",
      Ciudad: "Arequipa",
      Direccion: "Av. Los Pinos 123",
      CargoContacto: "Gerente",
      CorreoContacto1: "fulano1@gmail.com",
      CorreoContacto2: "fulano2@gmail.com",
      NombreVendedor: "Nancy",
      Rubro: "Humanitario",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsForPage = 10; //Cuantos items por pagina
  // Calcular el índice de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsForPage;
  const indexOfFirstItem = indexOfLastItem - itemsForPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="table table-xs table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Razon Comercial</th>
              <th>Nombre Comercial</th>
              <th>Tipo Doc.</th>
              <th>Nro. Doc.</th>
              <th>Contacto</th>
              <th>Telefono1</th>
              <th>Telefono2</th>
              <th>Ciudad</th>
              <th>Direccion</th>
              <th>Cargo Contacto</th>
              <th>Correo Contacto1</th>
              <th>Correo Contacto2</th>
              <th>Nom. Vend.</th>
              <th>Rubro</th>
            </tr>
          </thead>
          <tbody >
            {/* row 1 */}
            {currentItems.map((client,index) => (
              <tr key={client.id}>
                <td>{index + 1 + indexOfFirstItem}</td>
                <td>{client.Cliente}</td>
                <td>{client.TipoDocumento}</td>
                <td>{client.NroDocumento}</td>
                <td>{client.Contacto}</td>
                <td>{client.Telefono1}</td>
                <td>{client.Telefono2}</td>
                <td>{client.Ciudad}</td>
                <td>{client.Direccion}</td>
                <td>{client.CargoContacto}</td>
                <td>{client.CorreoContacto1}</td>
                <td>{client.CorreoContacto2}</td>
                <td>{client.NombreVendedor}</td>
                <td>{client.Rubro}</td>
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
        {/* Paginación */}
        <div className="join flex justify-center space-x-2 mt-4">
          {Array.from(
            { length: Math.ceil(clients.length / itemsForPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`join-item btn btn-square${
                  currentPage === i + 1 ? "join-item btn btn-active" : "join-item btn"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TableList;
