import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { apiBaseUrl } from "../config";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const Notifications = ({ requestsOnly }) => {
  const [notifications, setNotifications] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const getTokenId = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const payload = jwt_decode(token);
    const userId = payload._id;
    return userId;
  };

  const userId = getTokenId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both notifications and requests sent
        const [notificationsRes, requestsRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/users/${userId}/notifications`),
          axios.get(`${apiBaseUrl}/users/${userId}/requests-sent`),
        ]);
        console.log(notificationsRes.data);

        setNotifications(notificationsRes.data.notifications);
        setRequestsSent(requestsRes.data.requests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setOpenDialog(true);
  };

  const handleAccept = async () => {
    try {
      const adoptionData = {
        notificationId: selectedNotification._id, // Changed
        originalOwnerId: selectedNotification.data.originalOwnerId,
      };

      await axios.post(`${apiBaseUrl}/adoptions/accept-request`, adoptionData);

      // Remove the notification from the list
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== selectedNotification._id
        )
      );

      setOpenDialog(false);
      toast.success(
        `Adoption request for ${selectedNotification.data.dogName} accepted!`
      );
    } catch (error) {
      console.error("Error accepting adoption:", error);
      toast.error("Failed to accept adoption request");
    }
  };
  const handleDecline = async () => {
    try {
      // Remove the notification from the list
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== selectedNotification._id
        )
      );

      setOpenDialog(false);
      toast.info(`Adoption request declined`);
    } catch (error) {
      console.error("Error declining adoption:", error);
      toast.error("Failed to decline adoption request");
    }
  };

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {(requestsOnly ? requestsSent : notifications).map((item, index) => (
          <ListItem
            key={index}
            sx={{
              mb: 2,
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
              transition: "all 0.3s ease",
              border: "1px solid #f0f0f0",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                borderColor: "primary.main",
              },
            }}
          >
            <Box sx={{ width: "100%", p: 1 }}>
              {requestsOnly ? (
                // Requests Sent Item
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#2c3e50",
                      }}
                    >
                      {item.dog.name}
                    </Typography>
                    <Typography
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        backgroundColor:
                          item.status === "pending"
                            ? "#fff3e0"
                            : item.status === "accepted"
                            ? "#e8f5e9"
                            : "#ffebee",
                        color:
                          item.status === "pending"
                            ? "#f57c00"
                            : item.status === "accepted"
                            ? "#2e7d32"
                            : "#d32f2f",
                      }}
                    >
                      {item.status.toUpperCase()}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#666", fontSize: "0.9rem", mb: 1 }}>
                    Breed: {item.dog.breed}
                  </Typography>
                  <Typography sx={{ color: "#666", fontSize: "0.9rem", mb: 1 }}>
                    Owner: {item.originalOwner.name}
                  </Typography>
                  <Typography sx={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                    Requested: {formatDate(item.requestDate)}
                  </Typography>
                </>
              ) : (
                // Notifications Item
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "#2c3e50",
                        fontWeight: 500,
                        flex: 1,
                        pr: 2,
                      }}
                    >
                      {item.message}
                    </Typography>
                    <Box
                      onClick={() => handleNotificationClick(item)}
                      sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      View Details
                    </Box>
                  </Box>
                  <Typography sx={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                    {formatDate(item.createdAt)}
                  </Typography>
                </>
              )}
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography component="div" variant="h6">
            Adoption Request Details
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedNotification && (
            <Box>
              {/* Dog Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    mb: 2,
                    color: "#333",
                  }}
                >
                  Dog Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      component="div"
                      sx={{
                        mb: 2,
                        backgroundColor: "#f8f9fa",
                        p: 2,
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          color: "#666",
                          fontSize: "0.9rem",
                          mb: 0.5,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Name
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2c3e50",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                        }}
                      >
                        {selectedNotification.data.dogName}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      component="div"
                      sx={{
                        mb: 2,
                        backgroundColor: "#f8f9fa",
                        p: 2,
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          color: "#666",
                          fontSize: "0.9rem",
                          mb: 0.5,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Breed
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2c3e50",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                        }}
                      >
                        {selectedNotification.data.dogBreed}
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Personal Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    mb: 2,
                    color: "#333",
                  }}
                >
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      component="div"
                      sx={{
                        mb: 2,
                        backgroundColor: "#f8f9fa",
                        p: 2,
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          color: "black",
                          fontSize: "0.9rem",
                          mb: 0.5,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Name{" "}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2c3e50",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                        }}
                      >
                        {" "}
                        {selectedNotification.data.formData.name}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      component="div"
                      sx={{
                        mb: 2,
                        backgroundColor: "#f8f9fa",
                        p: 2,
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          color: "#666",
                          fontSize: "0.9rem",
                          mb: 0.5,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Email
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2c3e50",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                        }}
                      >
                        {selectedNotification.data.formData.email}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      component="div"
                      sx={{
                        mb: 2,
                        backgroundColor: "#f8f9fa",
                        p: 2,
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          color: "#666",
                          fontSize: "0.9rem",
                          mb: 0.5,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Phone
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2c3e50",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                        }}
                      >
                        {selectedNotification.data.formData.phone}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      component="div"
                      sx={{
                        mb: 2,
                        backgroundColor: "#f8f9fa",
                        p: 2,
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          color: "#666",
                          fontSize: "0.9rem",
                          mb: 0.5,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Address
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2c3e50",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                        }}
                      >
                        {selectedNotification.data.formData.address}
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Adoption Motivation Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "0.9rem",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    mb: 2,
                  }}
                >
                  Adoption Motivation
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    backgroundColor: "#f8f9fa",
                    color: "#2c3e50",
                    borderRadius: "8px",
                    fontSize: "1.1rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  {selectedNotification.data.formData.reason}
                </Paper>
              </Box>

              {/* Pet Experience Section */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "0.9rem",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    mb: 2,
                  }}
                >
                  Pet Experience
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    backgroundColor: "#f8f9fa",
                    color: "#2c3e50",
                    borderRadius: "8px",
                    fontSize: "1.1rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  {selectedNotification.data.formData.experience}
                </Paper>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
          <Button
            onClick={handleDecline}
            variant="outlined"
            color="error"
            sx={{ minWidth: 100, mr: 1 }}
          >
            Decline
          </Button>
          <Button
            onClick={handleAccept}
            variant="contained"
            color="primary"
            sx={{ minWidth: 100 }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notifications;
