import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
// Importing configs
import * as ROUTES from "../Constants/routes";
import * as CONFIG from "../Constants/config";
// Importing icons
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import CoronavirusRoundedIcon from "@mui/icons-material/CoronavirusRounded";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SlogainContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;
  height: 85%;
`;

const Slogan1 = styled.div`
  color: #fff;
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  margin-top: -60px;
`;

const Slogan2 = styled.div`
  color: ${CONFIG.secondaryColor};
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  margin-top: 60px;
  margin-left: -50px;
`;

const Expandprompt = styled.div`
  margin-top: auto;
  margin-bottom: 20px;
  color: lightgrey;
  font-size: 20;
  font-weight: 400;
`;

// Below expanded styled componenets

const SearchTitle = styled.div`
  margin-top: 5%;
  font-size: 30px;
  color: ${CONFIG.secondaryColor};
`;

const SearchFieldContainer = styled.div`
  margin-top: 20px;
  width: 70%;
  justify-content: center;
  align-items: center;
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
  margin-top: 20px;
  border-radius: 20px;
  padding: 10px;
`;

const SearchBtnWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 80px;
  padding: 4px;
  width: 250px;
  height: 60px;
  border-radius: 24px;
  background-color: ${CONFIG.secondaryColor};
`;

const SearchBtn = styled.button`
  width: 250px;
  height: 60px;
  border: 2px solid ${CONFIG.primaryColor};
  background-color: ${CONFIG.secondaryColor};
  border-radius: 20px;
  color: ${CONFIG.primaryColor};
  font-size: 25px;
  &:hover {
    opacity: 0.5;
  }
`;

const HomeTop = ({ expand }) => {
  if (expand) return <ExpandedHomeTop />;
  else return <CollapsedHomeTop />;
};

const CollapsedHomeTop = () => {
  return (
    <Wrapper>
      <SlogainContainer>
        <Slogan1>We put in the HARDWORK for you</Slogan1>
        <Slogan2>So you can travel SAFE</Slogan2>
      </SlogainContainer>
      <Expandprompt>Expand to begin your search</Expandprompt>
    </Wrapper>
  );
};

const formateDate = (date) => {
  const y = date.getUTCFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${d}/${m}/${y}`;
};

const ExpandedHomeTop = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");

  const [validEnd, setValidEnd] = useState(true);
  // update validEnd date var when a new end date is chosen
  useEffect(() => {
    // Bypass the frist entry where start and end are both not set
    if (start === "" && end === "") return;
    const s = new Date(start);
    const e = new Date(end);
    if (e >= s) setValidEnd(true);
    else setValidEnd(false);
  }, [end]);
  return (
    <Wrapper>
      <SearchTitle>Search for you trip now!</SearchTitle>
      <SearchFieldContainer>
        <SearchField style={{}}>
          <AccessTimeRoundedIcon
            style={{
              fontSize: 30,
              marginTop: 14,
              color: CONFIG.secondaryColor,
            }}
          />
          <TextField
            label="Starting date of your trip"
            defaultValue={start}
            onChange={(e) => {
              setStart(e.target.value);
            }}
            type={"date"}
            sx={{ minWidth: "45%" }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Ending date of your trip"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            type={"date"}
            sx={{ minWidth: "45%" }}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={start === ""}
            helperText={
              validEnd ? "" : "End date cannot come before start date"
            }
            error={!validEnd}
            required
          />
        </SearchField>
        <SearchField>
          <LanguageRoundedIcon
            style={{
              fontSize: 30,
              marginTop: 14,
              color: CONFIG.secondaryColor,
            }}
          />
          <TextField
            error={false}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            label="The country you wish to travel"
            placeholder="Austrailia"
            sx={{ minWidth: "90%" }}
            helperText=""
            required
          />
        </SearchField>
        <SearchField>
          <LocationCityRoundedIcon
            style={{
              fontSize: 30,
              marginTop: 14,
              color: CONFIG.secondaryColor,
            }}
          />
          <TextField
            error={false}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            label="The city you wish to travel"
            placeholder="Sydney"
            sx={{ minWidth: "90%" }}
            helperText=""
            required
          />
        </SearchField>
        <SearchField>
          <CoronavirusRoundedIcon
            style={{
              fontSize: 30,
              marginTop: 14,
              color: CONFIG.secondaryColor,
            }}
          />
          <TextField
            error={false}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            label="Optional keyword"
            placeholder="Covid-19"
            sx={{ minWidth: "90%" }}
            helperText=""
          />
        </SearchField>
      </SearchFieldContainer>
      <SearchBtnWrapper>
        <Link to={ROUTES.RESULT}>
          <SearchBtn onClick={() => {}}>Search</SearchBtn>
        </Link>
      </SearchBtnWrapper>
    </Wrapper>
  );
};

export default HomeTop;
