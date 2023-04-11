import React, { useState } from "react";
const MainContext = React.createContext();

const MainProvider = ({ children }) => {
    const [username, set_username] = useState("");
    const [room, set_room] = useState("");
    return (
        <MainContext.Provider value={{ username, room, set_username, set_room }} >
            {children}
        </MainContext.Provider>
    );
}

export { MainContext, MainProvider };