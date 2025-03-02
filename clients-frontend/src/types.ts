export interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    onSubmit: () => void;
  }

export interface NavBarProps {
  onOpen: () => void;
}

export interface TableListProps {
  handleOpen: (mode: 'add' | 'edit') => void;
}

export interface CardProps {
  permissions: string[];
}


export interface Client {
  id_tipo_familia: string;
  razon_comercial: string;
  nombre_comercial: string;
  nombre_contacto: string;
  telefonos: string;
  correos: string;
  telefonos2: string;
  correos2: string;
}