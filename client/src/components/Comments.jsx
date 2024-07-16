import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import Modal from "./Modal"; // Import the Modal component

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 1rem;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const HeadingComment = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;

const SendButton = styled.button`
  background-color: red};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
`;

const disabledWords = ["frick", "dog", "damn", "hate", "die"];

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentIsBad, setCommentIsBad] = useState(false);
  const [showModal, setShowModal] = useState(false); // State variable to control modal visibility

  const handleNewComment = async (e) => {
    if (!commentIsBad) {
      if (!currentUser) {
        setShowModal(true);
        return;
      }
      try {
        const newComment = {
          desc: comment,
          userId: currentUser._id,
          videoId,
        };
        const res = await axios.post(/comments/, newComment);
        setComments([...comments, res.data]);
        setComment("");
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    } else {
      const commentText = e.target.value;
      disabledWords.every((word) => {
        if (commentText.toLowerCase().includes(word)) {
          setCommentIsBad(true);
          return false;
        }

        setCommentIsBad(false);
        return true;
      });
      setComment(commentText);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      {commentIsBad ? (
        <ErrorMsg>Please be polite in the comments</ErrorMsg>
      ) : null}
      <NewComment>
        {currentUser && currentUser.img ? (
          <Avatar src={currentUser.img} alt="User Avatar" />
        ) : null}
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <SendButton onClick={handleNewComment}>Send</SendButton>
      </NewComment>
      <hr />
      <HeadingComment>Comments</HeadingComment>
      {comments
        ? comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        : null}
      {/* Render the modal component conditionally */}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </Container>
  );
};

export default Comments;
