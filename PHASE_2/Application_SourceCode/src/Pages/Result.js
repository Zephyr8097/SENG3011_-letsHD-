import React, { useState } from "react";
import styled from "styled-components";
// Import configs
import * as CONFIG from "../Constants/config";
// Import child components

const HomeWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Result = ({}) => {
  return (
    <HomeWrapper>
      <div>test</div>
    </HomeWrapper>
  );
};

export default Result;
