import { useState } from "react";

import ModalForm from "../components/ModalForm";
import NavBar from "../components/NavBar";
import ClientDetails from "../components/ClientDetails";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const handleOpen = (mode: 'add' | 'edit'): void => {
    setModalMode(mode);
    setIsOpen(true);
  }

  const handleSubmit = (): void => {
    console.log(modalMode === 'add' ? 'modal mode add' : 'modal mode edit');
    setIsOpen(false); // Cerra el modal
  }
  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} />
      <ClientDetails handleOpen={handleOpen} />
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        mode={modalMode}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Dashboard;