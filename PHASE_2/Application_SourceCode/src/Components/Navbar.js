import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import * as CONFIG from "../Constants/config";
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px;
  justify-content: space-between;
  background-color: ${CONFIG.primaryColor};
`;

const Left = styled.div`
  padding-top: 20px;
  padding-left: 10px;
  width: 30%;
  font-size: 23px;
  font-weight: bold;
  font-style: italic;
  color: ${CONFIG.secondaryColor};
`;

const Right = styled.div`
  width: 70%;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
`;

const Features = styled.div`
  height: 50px;
  width: 120px;
  justify-content: center;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  font-size: 20px;
  color: ${CONFIG.secondaryColor};
  &:hover {
    background-color: lightblue;
    color: grey;
  }
`;

const Navbar = () => {
  return (
    <Wrapper>
      <Left>Search for Safety</Left>

      <Right>
        <Link to={`/riskrank`} style={{ textDecoration: "none" }}>
          <Features>Risk Ranking</Features>
        </Link>
        <Link to={`/covidcase`} style={{ textDecoration: "none" }}>
          <Features>Covid Cases</Features>
        </Link>
        <Link to={`/disease`} style={{ textDecoration: "none" }}>
          <Features>Diseasae Info</Features>
        </Link>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <Features>Home</Features>
        </Link>
      </Right>
    </Wrapper>
  );
};

export default Navbar;
