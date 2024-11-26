import React, { createContext, useContext, useState } from "react";

// Create Context
const AppContext = createContext();

// Custom Hook to use AppContext
export const useAppContext = () => useContext(AppContext);

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", permissions: ["Read"] },
  ]);
  const [permissions, setPermissions] = useState(["Read", "Write", "Delete"]);

  // Update state when data changes
  const updateState = {
    users,
    setUsers,
    roles,
    setRoles,
    permissions,
    setPermissions,
  };

  return <AppContext.Provider value={updateState}>{children}</AppContext.Provider>;
};
