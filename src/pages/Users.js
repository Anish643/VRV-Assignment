import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetch users from JSONPlaceholder
const fetchUsers = async (page, limit) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users`, {
    params: { _page: page, _limit: limit },
  });
  return {
    data: response.data,
    total: parseInt(response.headers["x-total-count"], 10),
  };
};

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  // Load persisted state from localStorage on component mount
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("userStates"));
    if (savedState) {
      setSearch(savedState.search || "");
      setPage(savedState.page || 0);
      setRowsPerPage(savedState.rowsPerPage || 5);
      setOrder(savedState.order || "asc");
      setOrderBy(savedState.orderBy || "name");
    }
  }, []);

  // Save state to localStorage whenever state changes
  useEffect(() => {
    const userStates = {
      search,
      page,
      rowsPerPage,
      order,
      orderBy,
    };
    localStorage.setItem("userStates", JSON.stringify(userStates));
  }, [search, page, rowsPerPage, order, orderBy]);

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, rowsPerPage],
    queryFn: () => fetchUsers(page + 1, rowsPerPage),
  });

  const handleSearch = (event) => setSearch(event.target.value);

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = data?.data.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = filteredUsers?.sort((a, b) => {
    if (order === "asc") return a[orderBy].localeCompare(b[orderBy]);
    return b[orderBy].localeCompare(a[orderBy]);
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Users</h2>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "email"}
                direction={orderBy === "email" ? order : "asc"}
                onClick={() => handleSort("email")}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data?.total || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Users;
