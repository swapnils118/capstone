import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure modal appears on top of other content */
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) =>
    theme.bg}; /* Use background color from theme */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add box shadow for depth */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalText = styled.p`
  color: ${({ theme }) => theme.text}; /* Use text color from theme */
  font-size: 16px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background-color: red; /* Use primary color for button background */
  color: white;
  font-color: black;
  border: none;
  margin-left: 5px;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add transition for smooth hover effect */

  &:hover {
    background-color: ${({ theme }) =>
      theme.primaryDark}; /* Darken primary color on hover */
  }
`;

const RedirectButton = styled.button`
  background-color: #0066cc;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  margin-right: 5px;
  cursor: pointer;
`;

const Modal = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <ModalContainer onClick={onClose}>
      <ModalContent>
        <div>
          <ModalText>You have to sign in to use this feature.</ModalText>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <RedirectButton onClick={() => navigate(`/signin`)}>
            Sign in
          </RedirectButton>

          <CloseButton onClick={onClose}>Close</CloseButton>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
