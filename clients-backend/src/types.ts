export interface Contacto {
    id_contacto: string | number;
    nombre_contacto: string;
    cargo_contacto: string;
    telefonos: Telefono[];
    correos: Correo[];
  }
  
  export interface Telefono {
    id_telefono: string | number;
    numero: string;
    numero2: string;
  }
  
  export interface Correo {
    id_correo: string | number;
    correo: string;
    correo2: string;
  }