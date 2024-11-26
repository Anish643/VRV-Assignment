import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Users API
export const fetchUsers = () => axios.get(`${BASE_URL}/users`);
export const addUser = (user) => Promise.resolve({ data: { id: Date.now(), ...user } }); // Simulate adding
export const updateUser = (id, user) => Promise.resolve({ data: { id, ...user } }); // Simulate editing
export const deleteUser = (id) => Promise.resolve({ data: { message: "Deleted successfully", id } }); // Simulate delete

// Mock Roles API
let roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  { id: 3, name: "Viewer", permissions: ["Read"] },
];

export const fetchRoles = () => Promise.resolve({ data: roles });
export const addRole = (role) => {
  const newRole = { id: Date.now(), ...role };
  roles.push(newRole);
  return Promise.resolve({ data: newRole });
};
export const updateRole = (id, updatedRole) => {
  roles = roles.map((role) => (role.id === id ? { ...role, ...updatedRole } : role));
  return Promise.resolve({ data: updatedRole });
};
export const deleteRole = (id) => {
  roles = roles.filter((role) => role.id !== id);
  return Promise.resolve({ data: { message: "Role deleted", id } });
};
