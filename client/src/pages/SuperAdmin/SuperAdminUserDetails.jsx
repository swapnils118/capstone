import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";

const SuperAdminUserDetailsWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 20px;
`;

const SuperAdminUserDetails = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await axios.get(`/users/find/${userId}`);
        setUser(response.data);
        setLoadingUser(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoadingUser(false);
      }
    };

    const fetchVideos = async (userId) => {
      try {
        const response = await axios.get(`/videos/getAllVideosUser/${userId}`);
        setVideos(response.data);
        setLoadingVideos(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoadingVideos(false);
      }
    };

    if (userId) {
      fetchUser(userId)
        .then(() => fetchVideos(userId))
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      console.error("User ID not found in route parameters.");
      setLoadingUser(false);
      setLoadingVideos(false);
    }
  }, [userId]);

  return (
    <SuperAdminUserDetailsWrapper p={3}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: (theme) => theme.textSoft, marginBottom: 4 }}
      >
        <Link
          to="/superadmin"
          style={{
            textDecoration: "underline dashed",
            color: "blue",
            fontSize: "30px",
          }}
        >
          Admin Dashboard
        </Link>
        {" / "}
        User Details
      </Typography>

      {loadingUser || loadingVideos ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} p={4}>
          {user ? (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={2}>
                <Avatar
                  alt={user.name}
                  src={user.img} // Assuming the image URL is in the 'img' field of the user object
                  sx={{ width: 150, height: 150, marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={8} sx={{ paddingBottom: 3 }}>
                <Typography variant="subtitle1" sx={{ fontSize: "large" }}>
                  <strong>Name:</strong> {user.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "large" }}>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "large" }}>
                  <strong>Subscribers:</strong> {user.subscribers}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    paddingLeft: 2,
                    textAlign: "center",
                    fontSize: "large",
                  }}
                >
                  <strong>Videos</strong>
                </Typography>
                {videos.length > 0 ? (
                  <List>
                    {videos.map((video) => (
                      <div key={video._id}>
                        <ListItem>
                          <ListItemText
                            primary={video.title}
                            secondary={`Views: ${video.views}`}
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2">No videos available</Typography>
                )}
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body1">No user data found.</Typography>
          )}
        </Paper>
      )}
    </SuperAdminUserDetailsWrapper>
  );
};

export default SuperAdminUserDetails;

export const darkTheme = {
  bg: "#181818",
  bgLighter: "#202020",
  text: "white",
  textSoft: "#aaaaaa",
  soft: "#373737",
};

export const lightTheme = {
  bg: "#f9f9f9",
  bgLighter: "white",
  text: "black",
  textSoft: "#606060",
  soft: "#f5f5f5",
};
