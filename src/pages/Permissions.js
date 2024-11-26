import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPermission, setCurrentPermission] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Mock data fetch
  useEffect(() => {
    // Example: Replace with actual API call
    const mockPermissions = [
      { id: 1, name: "View Users", description: "Allows viewing user data" },
      { id: 2, name: "Edit Roles", description: "Allows editing roles and permissions" },
      { id: 3, name: "Delete Logs", description: "Allows deleting system logs" },
    ];
    setPermissions(mockPermissions);
  }, []);

  const handleOpenDialog = (permission = { id: null, name: "", description: "" }) => {
    setCurrentPermission(permission);
    setIsEditing(!!permission.id); // Check if editing or adding
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPermission({ id: null, name: "", description: "" });
  };

  const handleSavePermission = () => {
    if (isEditing) {
      // Update existing permission
      setPermissions((prev) =>
        prev.map((perm) =>
          perm.id === currentPermission.id ? currentPermission : perm
        )
      );
    } else {
      // Add new permission
      setPermissions((prev) => [
        ...prev,
        { ...currentPermission, id: Date.now() },
      ]);
    }
    handleCloseDialog();
  };

  const handleDeletePermission = (id) => {
    setPermissions((prev) => prev.filter((perm) => perm.id !== id));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Manage Permissions
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Permission
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(permission)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeletePermission(permission.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit Permission" : "Add Permission"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Permission Name"
            type="text"
            fullWidth
            value={currentPermission.name}
            onChange={(e) =>
              setCurrentPermission({ ...currentPermission, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={currentPermission.description}
            onChange={(e) =>
              setCurrentPermission({
                ...currentPermission,
                description: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePermission} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Permissions;
