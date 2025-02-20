import { useState } from "react";
import "./App.css";
import ModalForm from "./components/ModalForm";
import NavBar from "./components/Navbar";
import TableList from "./components/Tablelist";

function App() {

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
      <NavBar onOpen={() => handleOpen('add')}/>
      <TableList handleOpen={handleOpen}/>
      <ModalForm 
      isOpen = {isOpen} 
      onSubmit={handleSubmit}
      mode={modalMode}
      onClose = {() => setIsOpen(false)} />
    </>
  );
}

export default App;
