// UserModal.jsx

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "../utils/Theme"; // Import the light theme
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.bgLighter}; /* Use theme.bgLighter */
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Ensure relative positioning for the close button */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text}; /* Use theme.text */
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.text}; /* Use theme.text */
  text-align: center;
`;

const ModalText = styled.p`
  color: ${({ theme }) => theme.text}; /* Use theme.text */
`;

const BuyButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.bgLight}; /* Use theme.bgLight */
  }
`;

const UserModal = ({ isOpen, onClose }) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleUpgrade = () => {
    // Navigate to the checkout page with the Premium membership parameter
    window.location.href = `/checkout?userId=${currentUser._id}`;
    onClose(); // Close the modal
  };

  return (
    <>
      {isOpen && (
        <ThemeProvider theme={lightTheme}>
          <ModalWrapper>
            <ModalContent>
              <CloseButton onClick={onClose}>X</CloseButton>{" "}
              {/* Close button */}
              <ModalTitle>Upgrade to Premium</ModalTitle>
              <br />
              <ModalText>Pay $29.99/month to enjoy premium features.</ModalText>
              <br />
              <BuyButton onClick={handleUpgrade}>Upgrade Now</BuyButton>
            </ModalContent>
          </ModalWrapper>
        </ThemeProvider>
      )}
    </>
  );
};

export default UserModal;
