import React, { useState } from "react";

const UsersContext = React.createContext();
const UsersProvider = ({children}) => {
    const [users, set_users] = useState([]);
    return (
        <UsersContext.Provider value={{ users, set_users }}>
            {children}
        </UsersContext.Provider>
    );
}

export { UsersContext, UsersProvider };