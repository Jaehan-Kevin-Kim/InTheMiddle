import React from "react";
import Header from "./../header/Header";
import "./MyAccount.css";
import styled from "styled-components";

const AcountMain = styled.div`
  margin: 20px;
`;

const MyAccount = () => {
  return (
    <>
      <div className="account__body">
        <Header />
        <AcountMain>
          <h1 style={{ marginBottom: "15px" }}>My Account</h1>
          <label htmlFor="userName">User Name</label>
          <input type="text" name="userName" disabled="true" />
          <br />
          <label htmlFor="Email">Email</label>
          <input type="text" name="Email" disabled="true" />
          {/* <label htmlFor="Password">Password</label>
        <input type="text" name="Password" disabled="true" /> */}
        </AcountMain>
      </div>
    </>
  );
};

export default MyAccount;
