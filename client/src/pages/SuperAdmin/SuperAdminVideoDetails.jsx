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
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Switch,
} from "@mui/material";

const SuperAdminVideoDetailsWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 40px;
`;

const RectangularCover = styled.img`
  width: 300px !important;
  height: 180px !important;
  margin-bottom: 20px;
  padding: 10px;
`;

const SuperAdminVideoDetails = () => {
  const [video, setVideo] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const { videoId } = useParams();

  useEffect(() => {
    const fetchVideo = async (videoId) => {
      try {
        const response = await axios.get(`/videos/find/${videoId}`);
        setVideo(response.data);
        setLoadingVideo(false);
        // Fetch user related to the video
        fetchUser(response.data.userId);
      } catch (error) {
        console.error("Error fetching video:", error);
        setLoadingVideo(false);
      }
    };

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

    if (videoId) {
      fetchVideo(videoId).catch((error) =>
        console.error("Error fetching data:", error)
      );
    } else {
      console.error("Video ID not found in route parameters.");
      setLoadingVideo(false);
      setLoadingUser(false);
    }
  }, [videoId]);

  return (
    <SuperAdminVideoDetailsWrapper p={{ xs: 2, md: 4 }}>
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
        Video Details
      </Typography>

      {loadingVideo || loadingUser ? (
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
          {video ? (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
              padding="10px"
            >
              <Grid item xs={12} sm={4}>
                <RectangularCover
                  alt={user.name}
                  src={video.imgUrl} // Assuming the image URL is in the 'imgUrl' field of the video object
                />
              </Grid>
              <Grid item xs={12} sm={8} sx={{ paddingBottom: 3 }}>
                <Typography variant="subtitle1" sx={{ fontSize: "large" }}>
                  <strong>Title:</strong> {video.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "large" }}>
                  <strong>Views:</strong> {video.views}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "large" }}>
                  <strong>User:</strong> {user.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "large" }}>
                  <strong>Tags:</strong> {video.tags.join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: "20px" }}>
                <Typography variant="subtitle1" sx={{ fontSize: "large" }}>
                  <strong>Description:</strong> {video.description}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body1">No video data found.</Typography>
          )}
        </Paper>
      )}
    </SuperAdminVideoDetailsWrapper>
  );
};

export default SuperAdminVideoDetails;
