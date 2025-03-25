import { useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import ModalForm from "../components/ModalForm";
import NavBar from "../components/Navbar";
import ClientDetails from "../components/ClientDetails";
import { clientData } from "../types";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clientData, setClientData] = useState<clientData>();
  const [clientId, setClientId] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(false); //Controlar
  const handleOpen = async (mode: "add" | "edit", clientId?: string): Promise<void> => {
    setModalMode(mode);
    if (mode === "add") {
      // Reinicar setClientData a vacio(Form Vacio y no con datos)
      setClientData({
        razonComercial: "",
        nombreComercial: "",
        rubro: "",
        tipoDoc: "",
        nroDoc: "",
        ciudad: "",
        direccion: "",
        nombreVendedor: "",
        contacto2: "",
        desc_observacion: "",
        contacto: [],
      });
    } else if (mode === "edit" && clientId) {
      setClientId(clientId);
      try {
        const response = await axios.get<clientData>(`http://localhost:3000/api/clientes-data/${clientId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const client = response.data;
        setClientData({
          razonComercial: client.razonComercial,
          nombreComercial: client.nombreComercial,
          rubro: client.rubro,
          tipoDoc: client.tipoDoc,
          nroDoc: client.nroDoc,
          ciudad: client.ciudad,
          direccion: client.direccion,
          nombreVendedor: client.nombreVendedor,
          contacto2: client.contacto2,
          desc_observacion: client.desc_observacion,
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
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
      }
    }
    setIsOpen(true);
  };
  
  //useEffect(() => {
  //  console.log('Nuevo estado de clientData despues del (setClientData):', clientData);
  //}, [clientData]); // Solo se ejecuta cuando clientData cambia


  const { id } = useParams<{ id: string }>();
  const handleSubmit = async (newClientData: clientData) => {
    const token = localStorage.getItem("token"); // Token de autorizacion
    if (!token) {
      console.error("Token de autenticación no encontrado");
      return;
    }
    //console.log('Datos enviados a backend(NewClient): ',newClientData)
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
      //console.log("modal mode Add");
    } else {
      if (modalMode == "edit") {
        //console.log("modal mode Edit");
        //console.log("Id edit es: ", clientId);
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
    setReload(!reload);
  };
  
  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm}/>
      <ClientDetails handleOpen={handleOpen} searchTerm={searchTerm} reload={reload}/>
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
