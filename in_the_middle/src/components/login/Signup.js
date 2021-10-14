import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db, auth } from "../../firebase";
import firebase from "firebase";
import "./Signup.css";
import { Link, Redirect, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SignUpContainer = styled.div`
  width: 50%;
  margin: 1em auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1.5em 3em;
  height: 80%;
  align-items: center;
  justify-content: center;
`;

const SignUpHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  width: 100%;

  & h1 {
    font-size: 40px;
  }
`;

const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const InputDetail = styled.input`
  border: none;
  border-bottom: 1px solid lightgray;
  margin-bottom: 25px;
  width: 35vw;
  height: 5vh;
  padding: 3px 5px;
  margin-top: 5px;
`;

const SubmitBtn = styled.button`
  margin-top: 10px;
  width: 35vw;
  border-radius: 20px;
  border: none;
  padding: 10px;
  background-color: rgb(255, 236, 130);
  border: 1px solid lightgray;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const LinkLogin = styled.div`
  display: inline;
  color: red;
  cursor: pointer;
  font-size: 12px;
  text-decoration: none;
  margin-left: 5px;
  padding: 5px;
`;

const BackToLogin = styled.span`
  display: inline;
  color: red;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  margin-left: 5px;
  padding: 5px;

  &:hover {
    background-color: lightgoldenrodyellow;
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const unsubscriobe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user login
        setUser(authUser);
      } else {
        //user log out
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup action
      unsubscriobe();
    };
  }, [user]);
  console.log(user);

  // useEffect(() => {
  //   db.collection
  // })

  // const onSocialClick = async (event) => {
  //   const {
  //     target: { name },
  //   } = event;
  //   let provider;
  //   if (name === "google") {
  //     provider = new firebase.auth.GoogleAuthProvider();
  //   } else if (name === "github") {
  //     provider = new firebase.auth.GithubAuthProvider();
  //   }
  //   const data = await auth.signInWithPopup(provider);
  //   console.log(data);
  // };

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then((authUser) => {
        //update user
        return authUser.user.updateProfile({
          displayName: signUpEmail,
        });
      })
      .catch((error) => alert(error.message));
    history.push("/");
  };

  const login = (event) => {
    event.preventDefault();

    const data = auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .catch((error) => alert(error.message));
    console.log(data);
  };

  return (
    <SignUpContainer>
      <SignUpHeader>
        <h1>SIGN UP</h1>
      </SignUpHeader>
      <InputContainer>
        <InputLabel for="email">
          Email
          <InputDetail
            type="email"
            value={signUpEmail}
            placeholder="Email"
            onChange={(e) => setSignUpEmail(e.target.value)}
            id="email"></InputDetail>
        </InputLabel>
        <InputLabel for="username">
          Username
          <InputDetail type="text" placeholder="Username" id="username"></InputDetail>
        </InputLabel>
        <InputLabel for="password">
          Password
          <InputDetail
            type="password"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
            placeholder="Password"
            id="password"></InputDetail>
        </InputLabel>
      </InputContainer>
      {/* <InputDetail type="submit" onClick={signUp}> */}
      <SubmitBtn onClick={signUp}>Sign up</SubmitBtn>
      <LinkLogin>
        Already have been an account?
        <Link to="/">
          <BackToLogin> Login</BackToLogin>
        </Link>
      </LinkLogin>
    </SignUpContainer>
  );
};

export default Signup;
