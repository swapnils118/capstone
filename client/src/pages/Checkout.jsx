import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import VideoImg from "../img/video.png";
import PremiumImg from "../img/premium.png";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { fetchSuccess } from "../redux/videoSlice";

const CheckoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const BoughtItems = styled.div`
  flex: 1;
`;

const CheckoutHeading = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 40px;
  text-align: center;
  margin-bottom: 20px;
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
const Button = styled.button`
  width: 30%;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.success};
  padding: 10px;
  border-radius: 20px;
  font-size: 20px;
  margin-left: 35%;
`;

const Checkout = () => {
  const location = useLocation();
  const [items, setItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const videoId = params.get("videoId");
  const videoUser = params.get("user");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        // Fetch premium membership data
        try {
          // const response = await axios.get("/api/premium");
          setItems({
            name: "Premium Membership",
            price: 29.99,
            img: PremiumImg,
          });
          setTotalPrice(29.99);
        } catch (error) {
          console.error("Error fetching premium membership data:", error);
        }
      } else if (videoId) {
        // Fetch video data
        try {
          const response = await axios.get(`videos/find/${videoId}`);
          const video = response.data;
          setItems({
            name: video.title,
            price: video.price / 100,
            img: VideoImg,
          });
          setTotalPrice(video.price / 100);
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      }
    };

    fetchData();
  }, [location.search]);

  const initPayment = (data) => {
    const options = {
      key: process.env.KEY_SECRET,
      amount: data.amount,
      currency: data.currency,
      name: items.name,
      description: "Test Transaction",
      image: items.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "/payments/verify";
          const { data } = await axios.post(verifyUrl, response);
          alert(data.message);
          redirectAfterSuccessfulPayment();
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const redirectAfterSuccessfulPayment = async () => {
    try {
      if (userId) {
        let response = await axios.put(`/users/${userId}`, {
          membershipType: "Premium",
        });
        if (response.statusText === "OK") {
          console.log(response);
          dispatch(loginSuccess(response.data));
          window.location.href = `/`;
        } else {
          console.log(response);
        }
      }
      if (videoId) {
        let response = await axios.put(
          `/videos/buyVideo/${videoId}/${videoUser}`
        );
        dispatch(fetchSuccess(response.data));
        window.location.href = `video/${videoId}`;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const makePayment = async () => {
    try {
      const orderUrl = "/payments/orders";
      const { data } = await axios.post(orderUrl, { amount: items.price });
      initPayment(data.data);
    } catch (error) {
      console.error("Error creating Checkout Session:", error);
    }
  };

  return (
    <CheckoutWrapper>
      <BoughtItems>
        <CheckoutHeading>C h e c k o u t</CheckoutHeading>
        <TableContainer>
          <thead>
            <tr>
              <TableHeader>Items</TableHeader>
              <TableHeader>Price</TableHeader>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <TableCell>{items.name}</TableCell>
              <TableCell>{items.price}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>Total :</TableHeader>
              <TableHeader>{totalPrice}</TableHeader>
            </TableRow>
          </tbody>
        </TableContainer>
      </BoughtItems>
      <Button onClick={makePayment}>Proceed to Pay !</Button>
    </CheckoutWrapper>
  );
};

export default Checkout;
