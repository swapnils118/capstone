// Settings.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import UserModal from "../components/UserModal"; // Import the Modal component
import DefaultAvatar from "../img/default-avatar.png";

const Container = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.text};
  height: 100%;
  background-color: ${({ theme }) => theme.bg};
`;

const Title = styled.h2`
  font-size: 36px;
  letter-spacing: 3px;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;
const PremimumButton = styled.button`
  background-color: gold;
  color: black;
  padding: 10px 15px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;

const UserInfo = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;
const SettingsSecondaryHeading = styled.p`
  font-size: 25px;
  letter-spacing: 2px;
  margin: 5px;
  color: ${({ theme }) => theme.text};
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 12px 15px;
  text-align: left;
`;

const TableCell = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.bgLight};
  padding: 12px 15px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.bgLight};
  }
`;

const Settings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close

  useEffect(() => {
    const fetchUserVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/videos/getAllVideosUser/${currentUser._id}`
        );
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user videos:", error);
        setLoading(false);
      }
    };

    fetchUserVideos();
  }, [currentUser]);

  const handleUpgradeToPremium = async () => {
    // Open the modal when the user clicks Upgrade to Premium
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal when the user clicks Close
    setIsModalOpen(false);
  };

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`/videos/${videoId}`);
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <Container>
      <Title>Settings</Title>

      <ProfileImage
        src={currentUser.img ? currentUser.img : DefaultAvatar}
        alt={currentUser?.name}
      />
      <br />
      <UserInfo>Name: {currentUser?.name}</UserInfo>
      <UserInfo>Email: {currentUser?.email}</UserInfo>
      <UserInfo>Subscribers: {currentUser?.subscribers}</UserInfo>
      <br />
      {currentUser?.membershipType !== "Premium" ? (
        <Button onClick={handleUpgradeToPremium}>Upgrade to Premium</Button>
      ) : (
        <PremimumButton>Premium</PremimumButton>
      )}
      <br />
      <br />
      <SettingsSecondaryHeading>Your Videos:</SettingsSecondaryHeading>
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer>
          <thead>
            <tr>
              <TableHeader>Title</TableHeader>
              <TableHeader>Views</TableHeader>
              <TableHeader>Likes</TableHeader>
              <TableHeader>Dislikes</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <TableRow key={video._id}>
                <TableCell>{video.title}</TableCell>
                <TableCell>{video.views}</TableCell>
                <TableCell>{video.likes.length}</TableCell>
                <TableCell>{video.dislikes.length}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(video._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      )}

      {/* Render the Modal component */}
      <UserModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default Settings;
