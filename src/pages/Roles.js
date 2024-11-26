import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({ name: "", permissions: [] });

  // Load roles from localStorage on component mount
  useEffect(() => {
    const savedRoles = localStorage.getItem("roles");
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles));
    } else {
      // Default roles if none are stored
      const defaultRoles = [
        { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
        { id: 2, name: "User", permissions: ["Read"] },
      ];
      setRoles(defaultRoles);
      localStorage.setItem("roles", JSON.stringify(defaultRoles));
    }
  }, []);

  // Save roles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  const handleOpen = (role) => {
    setCurrentRole(role || { name: "", permissions: [] });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (currentRole.id) {
      setRoles((prev) =>
        prev.map((role) => (role.id === currentRole.id ? currentRole : role))
      );
    } else {
      setRoles((prev) => [
        ...prev,
        { ...currentRole, id: prev.length + 1 },
      ]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  return (
    <div>
      <h2>Roles</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Role
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ")}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(role)}>Edit</Button>
                <Button onClick={() => handleDelete(role.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentRole.id ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            value={currentRole.name}
            onChange={(e) =>
              setCurrentRole({ ...currentRole, name: e.target.value })
            }
            margin="dense"
          />
          <TextField
            label="Permissions (comma-separated)"
            fullWidth
            value={currentRole.permissions.join(", ")}
            onChange={(e) =>
              setCurrentRole({
                ...currentRole,
                permissions: e.target.value.split(",").map((p) => p.trim()),
              })
            }
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Roles;
