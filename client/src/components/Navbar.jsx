import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import Upload from "./Upload";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Modal from "./Modal"; // Import the Modal component
import DefaultAvatar from "../img/default-avatar.png";
import { current } from "@reduxjs/toolkit";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  position: relative;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Dropdown = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 40px;
  right: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.bgHover};
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [q, setQ] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // State variable to control modal visibility

  const handleUploadModalClose = () => {
    setOpenUploadModal(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleSearchModal = () => {
    if (!currentUser) {
      setShowModal(true);
    } else {
      navigate(`/search?q=${q}`);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={handleSearchModal} />
          </Search>
          {currentUser ? (
            <User>
              {!openUploadModal && (
                <VideoCallOutlinedIcon
                  onClick={() => setOpenUploadModal(true)}
                />
              )}

              <Avatar
                src={currentUser.img ? currentUser.img : DefaultAvatar}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {currentUser.name}
              <Dropdown ref={dropdownRef} isOpen={isDropdownOpen}>
                <DropdownItem
                  onClick={() => {
                    dispatch(logout());
                    navigate(`/signin`);
                  }}
                >
                  Sign out
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    navigate(`/settings`);
                  }}
                >
                  Settings
                </DropdownItem>
              </Dropdown>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
        {showModal && <Modal onClose={() => setShowModal(false)} />}
      </Container>
      {openUploadModal && (
        <Upload setOpen={setOpenUploadModal} onClose={handleUploadModalClose} />
      )}
    </>
  );
};

export default Navbar;
