import React, { useState, useEffect } from "react";
import styled from "styled-components";
// Import configs
import * as CONFIG from "../Constants/config";

const Entries = styled.div`
  position: relative;
  border: 3px solid ${CONFIG.primaryColor};
  width: 80%;
  height: 25px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Left = styled.div``;

const Right = styled.div``;

const Ranking = styled.div`
  text-align: center;
  color: white;
  border-radius: 5px;
  width: auto;
  min-width: 100px;
  padding: 5px;
  font-weight: bold;
`;

const checkRisk = (ranking) => {
  switch (ranking) {
    case "0":
      return <Ranking style={{ backgroundColor: "#d8d826" }}>Low</Ranking>;
    case "1":
      return <Ranking style={{ backgroundColor: "orange" }}>Moderate</Ranking>;
    case "2":
      return <Ranking style={{ backgroundColor: "red" }}>High</Ranking>;
    case "3":
      return <Ranking style={{ backgroundColor: "brown" }}>Vert High</Ranking>;
    default:
      return <Ranking style={{ backgroundColor: "grey" }}>Unkown</Ranking>;
  }
};

const RiskRankEntry = ({ country, risk, ranking }) => {
  return (
    <Entries>
      <Left>
        {country}: &nbsp; {risk}
      </Left>
      <Right>{checkRisk(ranking)}</Right>
    </Entries>
  );
};

export default RiskRankEntry;
