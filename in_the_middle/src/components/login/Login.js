import React, { useEffect, useState } from "react";
import "./Login.css";
import { db, auth } from "../../firebase";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
// import googleImg from "../../images/googleImg.png";
import { Link, Redirect, Route } from "react-router-dom";

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
  console.log(user);

  // useEffect(() => {
  //   db.collection
  // })

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebase.auth.GithubAuthProvider();
    }
    const data = await auth.signInWithPopup(provider);
    console.log(data);
  };

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
  };

  const login = (event) => {
    event.preventDefault();

    const data = auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .catch((error) => alert(error.message));
    console.log(data);
  };

  return (
    <>
      <div className="loginContainer">
        <div className="header">
          <h1>In the middle</h1>
        </div>
        <div className="body">
          <div className="loginInfo">
            <p>Email</p>
            <input
              className="loginInfo__input"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="loginInfo">
            <p>Password</p>
            <input
              className="loginInfo__input"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="loginOption">
            <button className="loginBtn" type="submit" onClick={login}>
              Login
            </button>
          </div>
          <div className="authBtns">
            <button onClick={onSocialClick} name="google" className="authBtn">
              {/* <img src="../../images/google-color.png" alt="googleLogo" /> */}
              <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button onClick={onSocialClick} name="github" className="authBtn">
              <FontAwesomeIcon icon={faGithub} />
            </button>
          </div>
          <div className="signup">
            <Link to="/signup">
              <button className="signsUpBtn">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
