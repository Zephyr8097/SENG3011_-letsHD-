import React, { useState } from "react";
import styled from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// Import configs
import * as CONFIG from "../Constants/config";
// Import child components
import HomeTop from "../Components/HomeTop";
import HomeBottom from "../Components/HomeBottom";

const HomeWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Top = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  background-color: ${CONFIG.primaryColor};
`;

const Bottom = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  background-color: ${CONFIG.secondaryColor};
`;

const Expand = styled.div`
  display: flex;
  position: relative;
  z-index: 3;
  justify-content: center;
  margin-top: 0;
  width: 100px;
  height: 25px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: ${CONFIG.secondaryColor};
  padding-top: 5px;
`;

const Home = ({}) => {
  const [expand, setExpand] = useState(false);
  // styled component

  return (
    <HomeWrapper>
      <Top style={{ height: expand ? "90%" : "40%" }}>
        <HomeTop expand={expand} />
      </Top>
      <Expand
        onClick={() => setExpand(!expand)}
        style={{
          transform: expand ? "" : "rotate(180deg)",
          marginTop: expand ? "-30px" : "0",
          backgroundColor: expand ? "" : CONFIG.primaryColor,
        }}
      >
        <KeyboardArrowUpIcon
          sx={{
            color: expand ? CONFIG.primaryColor : CONFIG.secondaryColor,
            fontSize: 30,
          }}
        />
      </Expand>
      <Bottom style={{ height: expand ? "10%" : "calc(60% - 25px)" }}>
        <HomeBottom expand={expand} />
      </Bottom>
    </HomeWrapper>
  );
};

export default Home;
