import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import ModalForm from "../components/ModalForm";
import NavBar from "../components/NavBar";
import ClientDetails from "../components/ClientDetails";
import { clientData } from "../types";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clientData, setClientData] = useState<clientData>();
  const [clientId, setClientId] = useState<string | null>(null);

  const handleOpen = async (mode: "add" | "edit", clientId?: string): Promise<void> => {
    setModalMode(mode);
    if (clientId) {
      console.log("Id ClientId HandleOpen: ", clientId);
      setClientId(clientId);
      //Otro endpoint que me muestra datos del cliente completo con IDS
      try {
        const response = await axios.get<clientData>(`http://localhost:3000/api/clientes-data/${clientId}`, {
          
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        //console.log('Respuesta del response.data: ',response.data);// ME DA TODO LA INFOMARCION
        //console.log('Respuesta del response.data (Rubro): ',response.data.rubro); //Me imprime undefined
        const client = response.data;
        //Me da todo los ids necesitados... ahora saber como usarlos en el endpoint de Editar
        //console.log('Client recibido (Dashboard): ',client);
        //console.log('Antes del setClientData:(Dashboard)',client.razonComercial);
        
      
        setClientData({
          razonComercial: client.razonComercial,
          nombreComercial: client.nombreComercial,
          rubro: client.rubro,
          tipoDoc: client.tipoDoc,
          nroDoc: client.nroDoc,
          ciudad: client.ciudad,
          direccion: client.direccion,
          nombreVendedor: client.nombreVendedor,
          contacto: client.contacto.map((contacto) => ({
            id_contacto: contacto.id_contacto,
            nombre_contacto: contacto.nombre_contacto,
            cargo_contacto: contacto.cargo_contacto,
            telefonos: contacto.telefonos.map((telefono) => ({
              id_telefono: telefono.id_telefono,
              numero: telefono.numero,
              numero2: telefono.numero2,
            })),
            correos: contacto.correos.map((correo) => ({
              id_correo: correo.id_correo,
              correo: correo.correo,
              correo2: correo.correo2,
              
            })),
            
          })),
        });
        //console.log('Despues del setClientData:(Dashboard)',client.razonComercial); //Me imprime undefined
        //console.log('Despues del setClientData:(Dashboard)RUBRO: ',client.rubro); //Me imprime el valor
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
      }
    }
    setIsOpen(true);
  };  
  useEffect(() => {
    console.log('Nuevo estado de clientData despues del (setClientData):', clientData);
  }, [clientData]); // Solo se ejecuta cuando clientData cambia


  const { id } = useParams<{ id: string }>();
  const handleSubmit = async (newClientData: clientData) => {
    const token = localStorage.getItem("token"); // Token de autorizacion
    if (!token) {
      console.error("Token de autenticación no encontrado");
      return;
    }
    console.log('Datos enviados a backend(NewClient): ',newClientData)
    if (modalMode == "add") {
      try {
        // Token de autorizacion
        const response2 = await axios.post(
          `http://localhost:3000/api/clientes/${id}`,
          newClientData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Agregar el token a los encabezados
            },
          }
        );
        console.log("cliente agregado: ", response2.data);
      } catch (error) {
        console.error("Error al agregar cliente: ", error);
      }
      console.log("modal mode Add");
    } else {
      if (modalMode == "edit") {
        console.log("modal mode Edit");
        console.log("Id edit es: ", clientId);
        try {
          const response = await axios.put(
            `http://localhost:3000/api/clientes/${clientId}`,
            newClientData,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Agregar el token a los encabezados
              },
            }
          );
          console.log("Cliente editado: ", response.data);
        } catch (error) {
          console.error("Error al editar cliente: ", error);
        }
      }
      //Modo para editar
    }
  };
  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <ClientDetails handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        mode={modalMode}
        clientData={clientData}
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export default Dashboard;
