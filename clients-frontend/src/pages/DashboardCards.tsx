import { useEffect, useState } from "react";

import Cards from "../components/Cards";


const DashboardCards = () => {     
  const [permissions, setPermissions] = useState<string[]>([]);
  
  useEffect(() => {
    const storedPermissions = localStorage.getItem("permissions");
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
  }, []);

    return (
        <>
        <Cards permissions={permissions}/>
        </>
    );

}

export default DashboardCards;