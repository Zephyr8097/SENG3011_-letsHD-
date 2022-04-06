import React, { useState, useEffect } from "react";
import styled from "styled-components";
// Import configs
import * as CONFIG from "../Constants/config";
// Import icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";

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
  flex-direction: column;
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

const Header = styled.div`
  font-size: 20px;
  color: grey;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const DiseaseEntry = ({ name }) => {
  const [expand, setExpand] = useState(false);
  const [info, setInfo] = useState({});
  useEffect(async () => {
    if (expand) {
      const url = `${CONFIG.DISEASE}/${name}`;
      const res = await axios.get(url, CONFIG.axiosHeader);
      console.log(res);
      setInfo(res.data);
    }
  }, [expand]);
  const printArray = (arr) => {
    if (arr === undefined) return "-";
    var str = "";
    arr.forEach((elem) => {
      str = str + elem + ", ";
    });
    return str;
  };
  return (
    <Entries style={{ height: expand ? "auto" : "25px" }}>
      <Top>
        <div>{name}</div>
        <div onClick={() => setExpand(!expand)}>
          {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>
      </Top>
      {expand ? (
        <Bottom>
          <Header>Syndromes:</Header>
          <div>{info === {} ? "loading..." : printArray(info.syndromes)}</div>
          <Header>Locations:</Header>
          <div>{info === {} ? "loading..." : printArray(info.locations)}</div>
        </Bottom>
      ) : null}
    </Entries>
  );
};

export default DiseaseEntry;
