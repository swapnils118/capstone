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
import SuperAdminVideoSearch from "./SuperAdminVideoSearch";

class SuperAdminVideoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      filteredVideos: [],
    };
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos = async () => {
    try {
      const response = await axios.get("/videos/getAllVideos");
      this.setState({ videos: response.data, filteredVideos: response.data });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`/videos/${videoId}`);
      // After deletion, fetch videos again to update the table
      this.fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  handleSearch = (searchText) => {
    const { videos } = this.state;
    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(searchText.toLowerCase())
    );
    this.setState({ filteredVideos });
  };

  render() {
    const { filteredVideos } = this.state;

    return (
      <Box p={2}>
        <SuperAdminVideoSearch onSearch={this.handleSearch} />
        {filteredVideos.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="video table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Likes</TableCell>
                  <TableCell>Dislikes</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVideos.map((video) => (
                  <TableRow key={video._id}>
                    <TableCell>{video.title}</TableCell>
                    <TableCell>{video.views}</TableCell>
                    <TableCell>{video.likes.length}</TableCell>
                    <TableCell>{video.dislikes.length}</TableCell>
                    <TableCell>{video.tags}</TableCell>
                    <TableCell>
                      <Link
                        to={`/superadmin/superAdminVideoDetails/${video._id}`}
                      >
                        <Button variant="contained" color="info" sx={{ mr: 2 }}>
                          Details
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => this.handleDeleteVideo(video._id)}
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

export default SuperAdminVideoTable;
