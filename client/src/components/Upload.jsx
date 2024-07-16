import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 2px;
  height: 30px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme, isFormComplete }) =>
    isFormComplete ? theme.success : theme.soft};
  color: ${({ theme, isFormComplete }) =>
    isFormComplete ? theme.soft : theme.soft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen, onClose }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [videoType, setVideoType] = useState("Free"); // Default to Free video
  const [price, setPrice] = useState(0); // Default price
  const [isFormComplete, setIsFormComplete] = useState(false); // Track form completion
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);
  useEffect(() => {
    // Check if all required inputs are filled
    const isComplete =
      inputs.title &&
      inputs.description &&
      inputs.category &&
      ((inputs.videoUrl && videoType === "Free") || videoType === "Paid") &&
      ((inputs.imgUrl && videoType === "Free") || videoType === "Paid");
    setIsFormComplete(isComplete);
  }, [inputs, videoType]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const newPrice = videoType === "Paid" ? price : 0;
    const res = await axios.post("/videos", {
      ...inputs,
      tags,
      videoType,
      price: newPrice,
    });
    await axios.put(`/videos/buyVideo/${res.data._id}/${res.data.userId}`);
    setOpen(false);
    onClose(true); // Close the modal
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  return (
    <Container
    // onClick={() => {
    //   setOpen(true);
    //   onClose(false);
    // }}
    >
      <Wrapper>
        <Close
          onClick={() => {
            setOpen(false);
            onClose(true); // Close the modal
          }}
        >
          X
        </Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => {
              e.stopPropagation();
              setVideo(e.target.files[0]);
            }}
          />
        )}
        <Input
          type="text"
          placeholder="  Title"
          name="title"
          onChange={(e) => {
            e.stopPropagation();
            handleChange(e);
          }}
        />
        <Label>Video Type:</Label>
        <select
          value={videoType}
          onChange={(e) => {
            e.stopPropagation();
            setVideoType(e.target.value);
          }}
          style={{ height: "30px" }}
        >
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
        {videoType === "Paid" && (
          <>
            <Label>Price:</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => {
                e.stopPropagation();
                setPrice(e.target.value);
              }}
            />
          </>
        )}
        <Desc
          placeholder="Description"
          name="description"
          rows={8}
          onChange={(e) => {
            e.stopPropagation();
            handleChange(e);
          }}
        />
        <Label>Category:</Label>
        <select
          value={inputs.category}
          onChange={(e) => {
            e.stopPropagation();
            handleChange(e);
          }}
          name="category"
          style={{ height: "30px" }}
        >
          <option value="">Select a category</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Gaming">Gaming</option>
          <option value="Music">Music</option>
          <option value="News">News</option>
          {/* Add more categories as needed */}
        </select>
        <Input
          type="text"
          placeholder="  Separate the tags with commas."
          onChange={(e) => {
            e.stopPropagation();
            handleTags(e);
          }}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              e.stopPropagation();
              setImg(e.target.files[0]);
            }}
          />
        )}
        <Button onClick={handleUpload} isFormComplete={isFormComplete}>
          Upload
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
