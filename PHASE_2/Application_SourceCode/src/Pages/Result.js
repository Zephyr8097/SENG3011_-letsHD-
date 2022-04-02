import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
// Import configs
import * as ROUTES from "../Constants/routes";
import * as CONFIG from "../Constants/config";
// Import child components
import ResultEntry from "../Components/ResultEntry";

// Importing icons
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import CoronavirusRoundedIcon from "@mui/icons-material/CoronavirusRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const HomeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 70px);
  overflow-x: hidden;
  overflow-y: auto;
  & ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    display: none;
  }
`;

// None of the css for webkit-scrollbar is working atm, dunno why

const Banner = styled.div`
  background-color: ${CONFIG.primaryColor};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 220px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const DateInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
`;

const TextInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 100%;
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
  border-radius: 20px;
  padding: 10px;
`;

const EntryDisplay = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const Home = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  border-radius: 50%;
  background-color: ${CONFIG.primaryColor};
  width: 60px;
  height: 60px;
`;

const Top = styled.div`
  position: fixed;
  bottom: 100px;
  right: 25px;
  background-color: ${CONFIG.secondaryColor};
  border: 2px solid ${CONFIG.primaryColor};
  border-radius: 50%;
  width: 56px;
  height: 56px;
`;

const Result = ({}) => {
  const params = useParams();
  const [start, setStart] = useState(params.start);
  const [end, setEnd] = useState(params.end);
  const [country, setCountry] = useState(params.country);
  const [city, setCity] = useState(params.city);
  const [keyword, setKeyword] = useState(params.keyword);
  const [validEnd, setValidEnd] = useState(true);
  const [scrolled, setScrolled] = useState(0);

  const handleScroll = () => {
    console.log(window.scrollY);
    setScrolled(window.pageYOffset);
  };

  // Update scroll status
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <HomeWrapper>
      <Banner>
        <DateInput>
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
            sx={{ minWidth: "45%", marginTop: "30px" }}
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
        </DateInput>

        <TextInput>
          <SearchField>
            <LanguageRoundedIcon
              style={{
                fontSize: 30,
                marginTop: 14,
                marginRight: "10px",
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
                marginRight: "10px",
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
                marginRight: "10px",
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
        </TextInput>
      </Banner>
      <ResultEntry />
      <ResultEntry />
      <ResultEntry />
      <ResultEntry />
      <ResultEntry />
      <ResultEntry />
      <ResultEntry />
      <ResultEntry />
      <ResultEntry />
      <ResultEntry />

      <Home>
        <Link to={ROUTES.HOME}>
          <HomeRoundedIcon
            style={{
              color: CONFIG.secondaryColor,
              fontSize: "40px",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />
        </Link>
      </Home>

      {scrolled !== 0 ? (
        <Top
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <ArrowUpwardRoundedIcon
            style={{
              color: CONFIG.primaryColor,
              fontSize: "40px",
              marginLeft: "8px",
              marginTop: "8px",
            }}
          />
        </Top>
      ) : null}
    </HomeWrapper>
  );
};

export default Result;
