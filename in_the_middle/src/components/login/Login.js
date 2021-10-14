import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Login.css";
import { db, auth } from "../../firebase";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, Redirect, Route } from "react-router-dom";

const LoginContainer = styled.div`
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

const LoginHeader = styled.div`
  & h1 {
    font-size: 40px;
  }
`;

const LoginBody = styled.div`
  margin-top: 2em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginInfoInput = styled.input`
  border: none;
  border-bottom: 1px solid lightgray;
  width: 35vw;
  height: 5vh;
  padding: 3px 5px;
  margin-top: 5px;
`;

const LoginOption = styled.div`
  margin-bottom: 1.5em;
`;

const LoginBtn = styled.button`
  width: 35vw;
  border-radius: 20px;
  border: none;
  padding: 10px;
  background: rgb(255, 236, 130);
  color: black;
  cursor: pointer;
`;

// }
const AuthBtns = styled.div`
  display: flex;
  justify-content: center;
  width: 35vw;
`;

const AuthBtn = styled.button`
  width: 2rem;
  background: transparent;
  border: none;
  margin: 0 0.25rem;
  cursor: pointer;

  & .svg-inline--fa {
    font-size: 1.8rem;
    padding: 2px;
    z-index: -1000;
  }
  & .svg-inline--fa:hover {
    color: gray;
  }
`;

// &.totalProjectBox {
//   background-color: #11569a;
//   color: white;
// }

// &:hover {
//   transform: scale(1.02);
// }

const SignUp = styled.div`
  margin-top: 1.5em;
`;

const SignUpBtn = styled.button`
  width: 35vw;
  border-radius: 20px;
  border: none;
  padding: 10px;
  background: black;
  color: white;
  cursor: pointer;
  &:hover {
    color: black;
    background: rgb(255, 236, 130);
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [user, setUser] = useState(null);

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
  // console.log(user);

  // useEffect(() => {
  //   db.collection
  // })

  const onGoogleClick = async (event) => {
    let provider;

    provider = new firebase.auth.GoogleAuthProvider();

    const data = await auth.signInWithPopup(provider);
    // console.log("provider", provider);
    // console.log(data);
  };

  const onGithubClick = async (event) => {
    let provider;
    provider = new firebase.auth.GithubAuthProvider();

    const data = await auth.signInWithPopup(provider);
    // console.log("provider", provider);
    // console.log(data);
  };

  // const signUp = (event) => {
  //   event.preventDefault();
  //   auth
  //     .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
  //     .then((authUser) => {
  //       //update user
  //       return authUser.user.updateProfile({
  //         displayName: signUpEmail,
  //       });
  //     })
  //     .catch((error) => alert(error.message));
  // };

  const loginEvent = (event) => {
    console.log(event.target.name);
    event.preventDefault();

    const data = auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .catch((error) => alert(error.message));
    console.log(data);
  };

  // const onKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     loginEvent();
  //   }
  // };

  return (
    <>
      <LoginContainer>
        <LoginHeader>
          <h1>In the middle</h1>
        </LoginHeader>
        <LoginBody>
          <LoginInfo>
            <p>Email</p>
            <LoginInfoInput
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email Address"
              // onKeyPress={onKeyPress}
            />
          </LoginInfo>
          <LoginInfo>
            <p>Password</p>
            <LoginInfoInput
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
              // onKeyPress={onKeyPress}
            />
          </LoginInfo>
          <LoginOption>
            <LoginBtn name="loginbutton" type="submit" onClick={loginEvent}>
              Login
            </LoginBtn>
          </LoginOption>
          <AuthBtns>
            <AuthBtn name="google" onClick={onGoogleClick}>
              {/* <img src="../../images/google-color.png" alt="googleLogo" /> */}

              {/* Google */}
              <FontAwesomeIcon icon={faGoogle} style={{ zIndex: -10 }} />
            </AuthBtn>
            <AuthBtn name="github" onClick={onGithubClick}>
              <FontAwesomeIcon icon={faGithub} />
            </AuthBtn>
          </AuthBtns>
          <SignUp>
            <Link to="/signup">
              <SignUpBtn>Sign up</SignUpBtn>
            </Link>
          </SignUp>
        </LoginBody>
      </LoginContainer>
    </>
  );
};

export default Login;
