import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import SuperAdminUserSearch from "./SuperAdminUserSearch";

class SuperAdminUserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get("/users/find/getAllUsers");
      this.setState({ users: response.data, filteredUsers: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      // After deletion, fetch users again to update the table
      this.fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  handleSearch = (searchText) => {
    const { users } = this.state;
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.setState({ filteredUsers });
  };

  render() {
    const { filteredUsers } = this.state;

    return (
      <Box p={2}>
        <SuperAdminUserSearch onSearch={this.handleSearch} />
        {filteredUsers.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Link
                        to={`/superadmin/superAdminUserDetails/${user._id}`}
                      >
                        <Button variant="contained" color="info" sx={{ mr: 2 }}>
                          Details
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => this.handleDeleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box mt={3}>
            <p>No Data Found</p>
          </Box>
        )}
      </Box>
    );
  }
}

export default SuperAdminUserTable;
