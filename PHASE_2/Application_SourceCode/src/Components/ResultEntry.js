import React, { useState, useEffect } from "react";
import styled from "styled-components";
// Import configs
import * as CONFIG from "../Constants/config";

const Wrapper = styled.div`
  position: relative;
  border: 3px solid ${CONFIG.primaryColor};
  width: 80%;
  height: auto;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 20px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Bottom = styled.div`
  width: 100%;
  border-top: 1px solid lightblue;
  padding-top: 5px;
`;

const ResultEntry = ({ headline, date, url, reports }) => {
  return (
    <Wrapper>
      <Top>Title: {headline}</Top>
      <Bottom>
        <div>Date of publication: {date}</div>
        <div>Reports: {reports}</div>
        <a href={url}>More info available here</a>
      </Bottom>
    </Wrapper>
  );
};

export default ResultEntry;
