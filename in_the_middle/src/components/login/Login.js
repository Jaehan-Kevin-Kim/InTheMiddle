import React, { useEffect, useState } from "react";
import "./Login.css";
import { db, auth } from "../../firebase";
import firebase from "firebase";

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
    <div className="login">
      <div className="loginWithEmail">
        <input
          type="email"
          value={loginEmail}
          placeholder="Email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          value={loginPassword}
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit" onClick={login}>
          Login
        </button>
      </div>
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github
        </button>
      </div>
      <div className="signUp">
        <input
          type="email"
          value={signUpEmail}
          placeholder="Email"
          onChange={(e) => setSignUpEmail(e.target.value)}
        />
        <input
          type="password"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
          placeholder="Password"
        />
        <button type="submit" onClick={signUp}>
          sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
