import React, { useState, useEffect } from "react";

import { ModalFormProps, Contacto } from "../types";

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  clientData,
}) => {
  const [razonComercial, setRazonComercial] = useState("");
  const [nombreComercial, setNomComercial] = useState("");
  const [rubro, setRubro] = useState("");
  const [tipoDoc, setTipoDoc] = useState(""); // Cambiar despues a booleano
  const [nroDoc, setNroDoc] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nombreVendedor, setNombreVendedor] = useState("");
  const [contacto, setContacto] = useState<Contacto[]>([
    {
      id_contacto: "",
      nombre_contacto: "",
      cargo_contacto: "",
      telefonos: [{ id_telefono: "", numero: "", numero2: "" }],
      correos: [{ id_correo: "", correo: "", correo2: "" }],
    },
  ]);

  useEffect(() => {
    if (!isOpen || !clientData) return; // No ejecuta si el modal está cerrado

    setRazonComercial(clientData.razonComercial || "");
    setNomComercial(clientData.nombreComercial || "");
    setRubro(clientData.rubro || "");
    setTipoDoc(clientData.tipoDoc || "");
    setNroDoc(clientData.nroDoc || "");
    setCiudad(clientData.ciudad || "");
    setDireccion(clientData.direccion || "");
    setNombreVendedor(clientData.nombreVendedor || "");
    setContacto(
      clientData.contacto.length > 0
        ? clientData.contacto.map((contacto) => ({
            id_contacto: contacto.id_contacto || "",
            nombre_contacto: contacto.nombre_contacto || "",
            cargo_contacto: contacto.cargo_contacto || "",
            telefonos: contacto.telefonos.map((telefono) => ({
              id_telefono: telefono.id_telefono || "",
              numero: telefono.numero || "",
              numero2: telefono.numero2 || "",
            })),
            correos: contacto.correos.map((correo) => ({
              id_correo: correo.id_correo || "",
              correo: correo.correo || "",
              correo2: correo.correo2 || "",
            })),
          }))
        : [
            {
              id_contacto: "",
              nombre_contacto: "",
              cargo_contacto: "",
              telefonos: [{ id_telefono: "", numero: "", numero2: "" }],
              correos: [{ id_correo: "", correo: "", correo2: "" }],
            },
          ]
    );
  }, [clientData, isOpen]);

  const handleContactoChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedContacto = [...contacto];
    updatedContacto[index] = { ...updatedContacto[index], [field]: value };
    setContacto(updatedContacto);
  };

  const handleTelefonoChange = (
    contactIndex: number,
    telIndex: number,
    field: string,
    value: string
  ) => {
    const updatedContacto = [...contacto];
    updatedContacto[contactIndex].telefonos[telIndex] = {
      ...updatedContacto[contactIndex].telefonos[telIndex],
      [field]: value,
    };
    setContacto(updatedContacto);
  };

  const handleCorreoChange = (
    contactIndex: number,
    correoIndex: number,
    field: string,
    value: string
  ) => {
    const updatedContacto = [...contacto];
    updatedContacto[contactIndex].correos[correoIndex] = {
      ...updatedContacto[contactIndex].correos[correoIndex],
      [field]: value,
    };
    setContacto(updatedContacto);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const clientData = {
        razonComercial,
        nombreComercial,
        rubro,
        tipoDoc,
        nroDoc,
        contacto,
        ciudad,
        direccion,
        nombreVendedor,
      };
      console.log("ModalForm: clientData", clientData);
      await onSubmit(clientData);
      onClose();
    } catch (error) {
      console.error("Error al agregar el cliente.", error);
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Editar Cliente" : "Detalle Cliente"}
          </h3>

          <form method="dialog" className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <label className="input input-bordered flex items-center w-full gap-2 col-span-2">
                Razon Comercial:
                <input
                  type="text"
                  className="grow"
                  value={razonComercial}
                  onChange={(e) => setRazonComercial(e.target.value)}
                  placeholder="Clinica San Juan de Dios"
                />
              </label>
              <label className="input input-bordered flex items-center w-full gap-2 col-span-2">
                Nom. Comercial:
                <input
                  type="text"
                  className="grow"
                  value={nombreComercial}
                  onChange={(e) => setNomComercial(e.target.value)}
                  placeholder="Clinica San Juan de Dios"
                />
              </label>

              <label className="input input-bordered flex items-center w-full gap-2 col-span-2">
                Rubro:
                <input
                  type="text"
                  className="grow"
                  value={rubro}
                  onChange={(e) => setRubro(e.target.value)}
                  placeholder="Transporte de carga"
                />
              </label>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex gap-4">
                <label className="input input-bordered flex items-center w-70">
                  Tipo Doc.:
                  <input
                    type="text"
                    value={tipoDoc}
                    onChange={(e) => setTipoDoc(e.target.value)}
                    className="grow"
                    placeholder="DNI"
                  />
                </label>
                <label className="input input-bordered flex items-center w-70">
                  Nro. Doc.:
                  <input
                    type="text"
                    value={nroDoc}
                    onChange={(e) => setNroDoc(e.target.value)}
                    className="grow"
                    placeholder="12345678"
                  />
                </label>
              </div>

              <label className="input input-bordered flex items-center w-full gap-2">
                Nom. Vend.:
                <input
                  type="text"
                  value={nombreVendedor}
                  onChange={(e) => setNombreVendedor(e.target.value)}
                  className="grow"
                  placeholder="Juan"
                />
              </label>
            </div>

            {contacto.map((contact, contactIndex) => (
              <div key={contactIndex} className="grid grid-cols-2 gap-4">
                <label className="input input-bordered flex items-center gap-2">
                  Contacto:
                  <input
                    type="text"
                    value={contact.nombre_contacto}
                    onChange={(e) =>
                      handleContactoChange(
                        contactIndex,
                        "nombre_contacto",
                        e.target.value
                      )
                    }
                    className="grow"
                    placeholder="Pedro"
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Cargo Contacto:
                  <input
                    type="text"
                    value={contact.cargo_contacto}
                    onChange={(e) =>
                      handleContactoChange(
                        contactIndex,
                        "cargo_contacto",
                        e.target.value
                      )
                    }
                    className="grow"
                    placeholder="Gerencia"
                  />
                </label>

                {contact.telefonos.map((telefono, telIndex) => (
                  <React.Fragment key={telIndex}>
                    <label className="input input-bordered flex items-center gap-2">
                      Telefono 1:
                      <input
                        type="tel"
                        value={telefono.numero}
                        onChange={(e) =>
                          handleTelefonoChange(
                            contactIndex,
                            telIndex,
                            "numero",
                            e.target.value
                          )
                        }
                        className="grow"
                        placeholder="123-456-789"
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      Telefono 2:
                      <input
                        type="tel"
                        value={telefono.numero2}
                        onChange={(e) =>
                          handleTelefonoChange(
                            contactIndex,
                            telIndex,
                            "numero2",
                            e.target.value
                          )
                        }
                        className="grow"
                        placeholder="987-654-321"
                      />
                    </label>
                  </React.Fragment>
                ))}

                {contact.correos.map((correo, correoIndex) => (
                  <React.Fragment key={correoIndex}>
                    <label className="input input-bordered flex items-center gap-2">
                      Correo 1:
                      <input
                        type="email"
                        value={correo.correo}
                        onChange={(e) =>
                          handleCorreoChange(
                            contactIndex,
                            correoIndex,
                            "correo",
                            e.target.value
                          )
                        }
                        className="grow"
                        placeholder="asd@gmail.com"
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      Correo 2:
                      <input
                        type="email"
                        value={correo.correo2}
                        onChange={(e) =>
                          handleCorreoChange(
                            contactIndex,
                            correoIndex,
                            "correo2",
                            e.target.value
                          )
                        }
                        className="grow"
                        placeholder="asd@gmail.com"
                      />
                    </label>
                  </React.Fragment>
                ))}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <label className="input input-bordered flex items-center w-full gap-2 col-span-2">
                Ciudad:
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="grow"
                  placeholder="Arequipa"
                />
              </label>
              <label className="input input-bordered flex items-center w-full gap-2 col-span-2">
                Dirección:
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="grow"
                  placeholder="Jacobo Hunter"
                />
              </label>
              <textarea className="textarea w-100" placeholder="Observación"></textarea>
            </div>

            <div className="flex justify-between mt-4">
              <button className="btn btn-success">
                {mode === "edit" ? "Guardar Cambios" : "Agregar Cliente"}
              </button>

            </div>
          </form>
          <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
                onClick={onClose}
              >
                ✕
              </button>
        </div>
      </dialog>
    </>
  );
};

export default ModalForm;
