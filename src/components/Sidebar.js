import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar bg-gray-100 w-64 p-4 h-screen">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-gray-700"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="mt-2">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-gray-700"
            }
          >
            Users
          </NavLink>
        </li>
        <li className="mt-2">
          <NavLink
            to="/roles"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-gray-700"
            }
          >
            Roles
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
