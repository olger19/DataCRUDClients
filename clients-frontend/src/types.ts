export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  onSubmit: (clientData: clientData) => void;
  clientData?: clientData;
}

export interface NavBarProps {
  onOpen: () => void;
  onSearch: (searchTerm: string) => void;
}

export interface TableListProps {
  handleOpen: (mode: "add" | "edit", id_cliente: string) => void;
  searchTerm: string;
  reload: boolean
}

export interface CardProps {
  permissions: string[];
}

//Client
export interface Client {
  id_cliente: string
  tipo_doc: string;
  nro_doc: string;
  razon_comercial: string;
  nombre_comercial: string;
  ciudad: string;
  nombre_vendedor: string;
  nombre_contacto: string;
  telefonos: string;
  correos: string;
  telefonos2: string;
  correos2: string;
}

export interface clientData {
  razonComercial: string;
  nombreComercial: string;
  rubro: string;
  tipoDoc: string;
  nroDoc: string;
  ciudad: string;
  direccion: string;
  nombreVendedor: string;
  contacto2: string;
  contacto: Contacto[];
  desc_observacion: string;
}

export interface Contacto {
  id_contacto: string | number;
  //Idcontacto
  nombre_contacto: string;
  cargo_contacto: string;
  telefonos: Telefono[];
  correos: Correo[];
}

export interface Telefono {
  id_telefono: string | number;
  //Idtelefono
  numero: string;
  numero2: string;
}

export interface Correo {
  id_correo: string | number;
  correo: string;
  correo2: string;
}