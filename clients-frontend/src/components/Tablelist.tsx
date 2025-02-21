


import React from "react";

import { TableListProps } from '../types';

const TableList: React.FC<TableListProps> = ({handleOpen}) => {
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
      Rubro: "Humano",
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
      Rubro: "Humano",
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
      Rubro: "Humano",
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
      Rubro: "Humano",
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
      Rubro: "Humano",
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
      Rubro: "Humano",
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
      Rubro: "Humano",
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
      Rubro: "Humano",
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
      Rubro: "Humano",
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
      Rubro: "Humano",
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
      Rubro: "Humano",
    },
  ];
  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Cliente</th>
              <th>Nom. Comercial</th>
              <th>Nro. Doc.</th>
              <th>Tipo Doc.</th>
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
          <tbody className="hover">
            {/* row 1 */}
            {clients.map((client) => (
              <tr>
                <td>{client.id}</td>
                <td>{client.Cliente}</td>
                <td>{client.NombreComercial}</td>
                <td>{client.NroDocumento}</td>
                <td>{client.TipoDocumento}</td>
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
                  <button onClick={() => handleOpen('edit')} className="btn btn-secondary">Editar</button>
                </td>
                <td>
                  <button className="btn btn-accent">Eliminar</button>
                </td>
              </tr>
            ))}
           
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableList;