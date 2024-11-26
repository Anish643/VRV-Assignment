import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Dashboard from "./pages/Dashboard";
import Permissions from "./pages/Permissions";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
