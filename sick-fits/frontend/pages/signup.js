import React from "react";
import styled from "styled-components";
import SignUp from "../components/SignUp";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignUpPage = () => {
  return (
    <Columns>
      <SignUp />
      <SignUp />
      <SignUp />
    </Columns>
  );
};

export default SignUpPage;
