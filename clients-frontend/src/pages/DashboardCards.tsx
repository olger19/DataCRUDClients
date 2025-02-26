import { useState } from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";


const DashboardCards = () => {     
const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const handleOpen = (mode: 'add' | 'edit'): void => {
    setModalMode(mode);
    setIsOpen(true);
  }
    return (
        <>
        <NavBar onOpen={() => handleOpen("add")}/>
        <Cards />
        </>
    );
    

}

export default DashboardCards;