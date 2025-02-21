import React, { useState } from "react";

import { ModalFormProps } from "../types";

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
}) => {
  const [cliente, setCliente] = useState("");
  const [nomComercial, setNomComercial] = useState("");
  const [rubro, setRubro] = useState<boolean>(false);
  const [tipoDoc, setTipoDoc] = useState<boolean>(false);
  const [nroDoc, setNroDoc] = useState("");
  const [contacto, setContacto] = useState("");
  const [cargoContacto, setCargoContacto] = useState("");
  const [correo1, setCorreo1] = useState("");
  const [correo2, setCorreo2] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nombreVendedor, setNombreVendedor] = useState("");

  const handleRubroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRubro(e.target.value === 'Humano'); // SetRubro booleano
  };

  const handleTipoDocChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoDoc(e.target.value === 'DNI'); // SetTipoDoc booleano
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Editar Cliente" : "Detalle Cliente"}
          </h3>

          <form method="dialog" className="space-y-4" onSubmit={handleSubmit}>
            {/* Información de cliente */}
            <div className="grid grid-cols-2 gap-4">
              <label className="input input-bordered flex items-center w-full gap-2 col-span-2">
                Cliente
                <input
                  type="text"
                  className="grow"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Clinica San Juan de Dios"
                />
              </label>
              <label className="input input-bordered flex items-center w-full gap-2 col-span-2">
                Nom. Comercial
                <input
                  type="text"
                  className="grow"
                  value={nomComercial}
                  onChange={(e) => setNomComercial(e.target.value)}
                  placeholder="Clinica San Juan de Dios"
                />
              </label>

              {/* Selección de Rubro cliente */}
              <select
                value={rubro ? "Humano" : "Veterinario"}
                className="select w-full col-span-2"
                onChange={handleRubroChange}
              >
                <option disabled>Rubro</option>
                <option>Veterinario</option>
                <option>Humano</option>
              </select>
            </div>

            {/* Selección de tipo de documento */}
            <div className="flex flex-col space-y-4">
              {/* Contenedor en fila para Tipo Documento y Nro. Doc. */}
              <div className="flex gap-4">
                <select
                  value={tipoDoc ? "DNI" : "RUC"}
                  className="select w-40"
                  onChange={handleTipoDocChange}
                >
                  <option disabled>Tipo Documento</option>
                  <option>DNI</option>
                  <option>RUC</option>
                </select>

                <label className="input input-bordered flex items-center w-70">
                  Nro. Doc.
                  <input
                    type="text"
                    value={nroDoc}
                    onChange={(e) => setNroDoc(e.target.value)}
                    className="grow"
                    placeholder="12345678"
                  />
                </label>
              </div>

              {/* Nombre del vendedor en fila completa */}
              <label className="input input-bordered flex items-center w-full gap-2">
                Nom. Vend.
                <input
                  type="text"
                  value={nombreVendedor}
                  onChange={(e) => setNombreVendedor(e.target.value)}
                  className="grow"
                  placeholder="Juan"
                />
              </label>
            </div>

            {/* Información de contacto */}
            <div className="grid grid-cols-2 gap-4">
              <label className="input input-bordered flex items-center gap-2">
                Contacto
                <input
                  type="text"
                  value={contacto}
                  onChange={(e) => setContacto(e.target.value)}
                  className="grow"
                  placeholder="Pedro"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Cargo Contacto
                <input
                  type="text"
                  value={cargoContacto}
                  onChange={(e) => setCargoContacto(e.target.value)}
                  className="grow"
                  placeholder="Gerencia"
                />
              </label>

              <label className="input input-bordered flex items-center gap-2">
                Correo 1
                <input
                  type="email"
                  value={correo1}
                  onChange={(e) => setCorreo1(e.target.value)}
                  className="grow"
                  placeholder="Daisy"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Correo 2
                <input
                  type="email"
                  value={correo2}
                  onChange={(e) => setCorreo2(e.target.value)}
                  className="grow"
                  placeholder="Daisy"
                />
              </label>
            </div>

            {/* Información de teléfono */}
            <div className="grid grid-cols-2 gap-4">
              <label className="input input-bordered flex items-center gap-2">
                Telefono 1
                <input
                  type="tel"
                  value={telefono1}
                  onChange={(e) => setTelefono1(e.target.value)}
                  className="grow"
                  placeholder="123-456-789"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Telefono 2
                <input
                  type="tel"
                  value={telefono2}
                  onChange={(e) => setTelefono2(e.target.value)}
                  className="grow"
                  placeholder="987-654-321"
                />
              </label>
            </div>

            {/* Información de ubicación */}
            <div className="grid grid-cols-2 gap-4">
              <label className="input input-bordered flex items-center w-full gap-2 col-span-2">
                Ciudad
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="grow"
                  placeholder="Arequipa"
                />
              </label>
              <label className="input input-bordered flex items-center w-full gap-2 col-span-2">
                Direccion
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="grow"
                  placeholder="Jacobo Hunter"
                />
              </label>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
                onClick={onClose}
              >
                ✕
              </button>
              <button className="btn btn-success">
                {mode === "edit" ? "Save Changes" : "Add Client"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalForm;
