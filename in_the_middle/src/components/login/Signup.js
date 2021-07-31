import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import firebase from "firebase";
import "./Signup.css";
import { Link, Redirect, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
    <div className="signUpcontainer">
      <div className="signUpHeader">
        <h1>SIGN UP</h1>
      </div>
      <div className="inputContainer">
        <label className="inputLabel" for="email">
          Email
          <input
            type="email"
            value={signUpEmail}
            placeholder="Email"
            onChange={(e) => setSignUpEmail(e.target.value)}
            id="email"
          />
        </label>
        <label className="inputLabel" for="username">
          Username
          <input
            type="text"
            // value={signUpEmail}
            placeholder="Username"
            // onChange={(e) => setSignUpEmail(e.target.value)}
            id="username"
          />
        </label>
        <label className="inputLabel" for="password">
          Password
          <input
            type="password"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
            placeholder="Password"
            id="password"
          />
        </label>
      </div>
      <button className="submitBtn" type="submit" onClick={signUp}>
        Sign up
      </button>
      <div className="linkLogin">
        Already have been an account?
        <Link to="/">
          <span className="backToLogin"> Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
