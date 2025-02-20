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