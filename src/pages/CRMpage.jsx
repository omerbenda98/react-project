import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Loader from "../components/Loader";

const CRMPage = () => {
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("/users/getAllUsers")
      .then((response) => {
        setAllUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const handleUpdate = async (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    try {
      delete user._id;
      delete user.isAdmin;
      await axios.put(`/users/userInfo/${userId}`, user);
      toast.success("user updated");
    } catch (err) {
      console.log("err", err);
      toast.error("error");
    }
  };
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`users/deleteUser/${userId}`);
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
      toast.success("user deleted");
    } catch (err) {
      console.log("err", err);
      toast.error("error");
    }
  };

  const handleBizToggle = (event, user) => {
    const checked = event.target.checked;
    setAllUsers((prevUsers) =>
      prevUsers.map((prevUser) =>
        prevUser._id === user._id ? { ...prevUser, biz: checked } : prevUser
      )
    );
  };

  if (!allUsers) {
    return <Loader />;
  }

  return (
    <Table>
      <TableBody>
        {selectedUser ? (
          <TableRow>
            <TableCell colSpan={4}>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                  padding: "32px",
                  maxWidth: "800px",
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  fontWeight="bold"
                  color="#333"
                  marginBottom="32px"
                >
                  Profile
                </Typography>
                <Box sx={{ maxWidth: 400 }}>
                  <Box sx={{ marginBottom: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="#333"
                    >
                      Personal Information
                    </Typography>
                    <Typography color="#666">
                      Name: {selectedUser.firstName} {selectedUser.lastName}
                    </Typography>
                    <Typography color="#666">
                      Email: {selectedUser.email}
                    </Typography>
                  </Box>
                  <Box sx={{ marginBottom: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="#333"
                    >
                      Account Information
                    </Typography>
                    <Typography color="#666">
                      Business Account: {selectedUser.biz ? "Yes" : "No"}
                    </Typography>
                  </Box>
                  <Box sx={{ marginBottom: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="#333"
                    >
                      Shipping Information
                    </Typography>

                    <Typography color="#666">
                      Country: {selectedUser.country}
                    </Typography>
                    <Typography color="#666">
                      State: {selectedUser.state}
                    </Typography>
                    <Typography color="#666">
                      City: {selectedUser.city}
                    </Typography>
                    <Typography color="#666">
                      Street: {selectedUser.street}
                    </Typography>
                    <Typography color="#666">
                      House Number: {selectedUser.houseNumber}
                    </Typography>
                    <Typography color="#666">
                      Zip Code: {selectedUser.zipCode}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setSelectedUser(null)}
                  sx={{ marginTop: "32px" }}
                >
                  Close
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ) : (
          allUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>

              <TableCell>
                {!user.isAdmin && (
                  <Typography sx={{ ml: { lg: 6 } }}>
                    is user a business client:{" "}
                    {!user.isAdmin && (
                      <Checkbox
                        checked={user.biz}
                        onChange={(event) => handleBizToggle(event, user)}
                        sx={{ ml: { lg: 0 } }}
                      />
                    )}
                  </Typography>
                )}
              </TableCell>

              <TableCell
                sx={{
                  display: { xs: "block", md: "flex", lg: "flex" },
                  width: { xs: "100%", md: "70%", lg: "100%" },
                  height: { lg: "5rem" },
                }}
              >
                {!user.isAdmin && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      width: { xs: "100%", md: "", lg: "20%" },
                      mb: { xs: 1, md: 0, lg: 0 },
                      mr: 8,
                    }}
                    onClick={() => handleUpdate(user._id)}
                  >
                    Update
                  </Button>
                )}

                {!user.isAdmin && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      width: { xs: "100%", md: "", lg: "20%" },
                      mb: { xs: 0, md: 0, lg: 0 },
                    }}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CRMPage;
