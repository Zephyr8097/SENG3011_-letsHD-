import React, { useState, useEffect } from "react";
import styled from "styled-components";
// Import configs
import * as CONFIG from "../Constants/config";

const Entries = styled.div`
  position: relative;
  border: 3px solid ${CONFIG.primaryColor};
  width: 80%;
  height: 30px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Body = styled.div``;

const CovidEntry = ({ country, confirmed, death, recovered }) => {
  return (
    <Entries>
      <Title>Country: &nbsp;</Title>
      <Body>{country} &nbsp;</Body>

      <Title>New Confirm: &nbsp;</Title>
      <Body>{confirmed} &nbsp;</Body>

      <Title>New Death: &nbsp;</Title>
      <Body>{death} &nbsp;</Body>

      <Title>New Recovered: &nbsp;</Title>
      <Body>{recovered} &nbsp;</Body>
    </Entries>
  );
};

export default CovidEntry;
