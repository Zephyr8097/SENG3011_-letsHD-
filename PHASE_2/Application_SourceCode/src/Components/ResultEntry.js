import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
// Import configs
import * as CONFIG from "../Constants/config";

const Wrapper = styled.div`
  position: relative;
  border: 3px solid ${CONFIG.primaryColor};
  width: 80%;
  height: 200px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 20px;
`;

const ResultEntry = ({}) => {
  return (
    <Wrapper>
      <div>test</div>
    </Wrapper>
  );
};

export default ResultEntry;
