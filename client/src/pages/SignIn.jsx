import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${"" /* height: calc(100vh - 56px); */}
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  height: 500px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 2rem;
  gap: 2rem;
`;
const SignUpDiv = styled.div`
  width: 50%;
`;
const SignInDiv = styled.div`
  width: 50%;
  border-right: 1px solid ${({ theme }) => theme.soft};
  padding-right: 2rem;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 100px; /* Set a fixed width for labels */
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 10px;
  background-color: transparent;
  width: 100%;
  margin: 17px;
  margin-left: -10px;
  color: ${({ theme }) => theme.text};
  transition: border-color 0.3s ease; /* Add transition for smooth effect */

  &:focus {
    border-color: ${({ theme }) =>
      theme.primary}; /* Change border color on focus */
  }
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  width: 100%;
  margin: 0.5rem 0rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signUpErrors, setSignUpErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      // Determine if the input is an email or a username
      const isEmail = email.includes("@");
      const data = isEmail ? { email, password } : { name, password };
      const res = await axios.post("/auth/signin", data);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      setSignInError("Invalid username or password.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Check if any field is empty
    const errors = {};
    if (!name) {
      errors.name = "Username is required.";
    }
    if (!email) {
      errors.email = "Email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password validation regex
    const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/;
    // Check individual field validations
    if (!emailRegex.test(email)) {
      setSignUpErrors({ ...signUpErrors, email: "Invalid email address." });
      return;
    }
    // if (!passwordRegex.test(password)) {
    //   setSignUpErrors({
    //     ...signUpErrors,
    //     password:
    //       "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
    //   });
    //   return;
    // }
    try {
      const res = await axios.post("/auth/signup", {
        name: name,
        email: email,
        password: password,
      });
      // dispatch(loginStart(res.data));
      // dispatch(loginSuccess(res.data));
      navigate("/");
      alert("Account Created Successfully :\nClick on Sign-in Button to Login");
    } catch (err) {
      setSignUpErrors({
        ...signUpErrors,
        global: "Failed to sign up. Please try again.",
      });
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
        setSignInError("Google sign-in failed.");
      });
  };

  return (
    <Container>
      <Wrapper>
        {/* Sign in section */}
        <SignInDiv>
          <Title>Sign in</Title>
          <SubTitle>to continue to Watcher</SubTitle>
          <Label htmlFor="signin-username">Username or Email:</Label>
          <Input
            id="signin-username"
            placeholder="Enter your username"
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="signin-password">Password:</Label>
          <Input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {signInError && <Error>{signInError}</Error>}
          <Button onClick={handleLogin}>Sign in</Button>
          <SubTitle>or</SubTitle>
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        </SignInDiv>
        <SignUpDiv>
          {" "}
          <Title>Sign up</Title>
          <SubTitle>to create a new account</SubTitle>
          <Label htmlFor="signup-username">Username:</Label>
          <Input
            id="signup-username"
            placeholder="Enter your username"
            onChange={(e) => setName(e.target.value)}
          />
          {signUpErrors.name && <Error>{signUpErrors.name}</Error>}
          <Label htmlFor="signup-email">Email:</Label>
          <Input
            id="signup-email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {signUpErrors.email && <Error>{signUpErrors.email}</Error>}
          <Label htmlFor="signup-password">Password:</Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {signUpErrors.password && <Error>{signUpErrors.password}</Error>}
          {signUpErrors.global && <Error>{signUpErrors.global}</Error>}
          <Button onClick={handleSignUp}>Sign up</Button>
        </SignUpDiv>
      </Wrapper>
      {/* More section */}
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
