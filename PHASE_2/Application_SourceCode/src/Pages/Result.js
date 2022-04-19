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
import axios from "axios";

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

const Err = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 20px;
`;

const Other = styled.div`
  margin-top: 10px;
  width: 100%;
  padding: 5px;
  border-top: 2px solid ${CONFIG.primaryColor};
  border-bottom: 2px solid ${CONFIG.primaryColor};
  color: ${CONFIG.primaryColor};
  font-size: 20px;
  font-weight: 400;
  text-align: center;
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
  //
  const [data, setData] = useState([]);
  const [other, setOther] = useState([]);
  useEffect(async () => {
    const url =
      CONFIG.BACKEND + "/reports_location_keyterm/" + country + "/" + keyword;
    const res = await axios.get(url, CONFIG.axiosHeader);
    const urlOther = CONFIG.BACKEND + "/reports_keyterm/" + keyword;
    const resOther = await axios.get(urlOther, CONFIG.axiosHeader);
    setData(
      res.data.filter((elem) => {
        console.log(elem.url);
        return validTime(elem.url);
      })
    );
    setOther(
      resOther.data.filter((elem) => {
        return validTime(elem.date_of_publication);
      })
    );
    /* setData([
      {
        id: 12,
        headline: "ACE (Adverse Childhood Experiences)",
        date_of_publication: "April 2, 2021 ",
        url: "https://www.cdc.gov/violenceprevention/aces/index.html",
        main_text: null,
        reports: [5],
      },
      {
        id: 31,
        headline: "Adverse Childhood Experiences (ACE)",
        date_of_publication: "April 2, 2021 ",
        url: "https://www.cdc.gov/violenceprevention/aces/index.html",
        main_text: null,
        reports: [5],
      },
      {
        id: 32,
        headline: "Adverse Drug Events \u2014 see Medication Safety",
        date_of_publication: "June 13, 2014 ",
        url: "https://www.cdc.gov/medicationsafety/",
        main_text: null,
        reports: [5],
      },
      {
        id: 33,
        headline:
          "Adverse Events Following Immunization \u2014 see Vaccine Adverse Event Reporting System",
        date_of_publication: "November 2, 2021 ",
        url: "https://www.cdc.gov/vaccinesafety/ensuringsafety/monitoring/vaers/index.html",
        main_text: null,
        reports: [5],
      },
      {
        id: 1588,
        headline:
          "Reporting Vaccine Reactions \u2014 see Vaccine Adverse Event Reporting System",
        date_of_publication: "November 2, 2021 ",
        url: "https://www.cdc.gov/vaccinesafety/ensuringsafety/monitoring/vaers/index.html",
        main_text: null,
        reports: [5],
      },
      {
        id: 1938,
        headline: "Vaccine Adverse Event Reporting System (VAERS)",
        date_of_publication: "November 2, 2021 ",
        url: "https://www.cdc.gov/vaccinesafety/ensuringsafety/monitoring/vaers/index.html",
        main_text: null,
        reports: [5],
      },
      {
        id: 1955,
        headline: "VAERS (Vaccine Adverse Event Reporting System)",
        date_of_publication: "November 2, 2021 ",
        url: "https://www.cdc.gov/vaccinesafety/ensuringsafety/monitoring/vaers/index.html",
        main_text: null,
        reports: [5],
      },
    ]);*/
  }, []);
  const handleScroll = () => {
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

  // Helper function to determine if a published data is inbetween certain timeframe
  const validTime = (date) => {
    // start || end => 2022-04-05
    // date => January 24, 2014
    const arr = date.split(",");
    const monthDay = arr[0].split(" ");
    const yRegex = /\d{4}/;
    const y = yRegex.exec(arr[1]);
    var month = 1;
    const d = monthDay[1];
    switch (month) {
      case "January":
        month = 1;
        break;
      case "February":
        month = 2;
        break;
      case "March":
        month = 3;
        break;
      case "April":
        month = 4;
        break;
      case "May":
        month = 5;
        break;
      case "June":
        month = 6;
        break;
      case "July":
        month = 7;
        break;
      case "August":
        month = 8;
        break;
      case "September":
        month = 9;
        break;
      case "October":
        month = 10;
        break;
      case "November":
        month = 11;
        break;
      case "December":
        month = 12;
        break;
    }
    const forged = `${y}-${month}-${d}`;
    const forgedDate = new Date(forged);
    console.log(forged);
    if (forgedDate < new Date(end) && new Date(start) < forgedDate) return true;
    return false;
  };
  return (
    <HomeWrapper>
      {data.length === 0 ? (
        <Err>No matching result found</Err>
      ) : (
        <>
          {data.map((elem) => {
            return (
              <ResultEntry
                headline={elem.headline}
                date={elem.date_of_publication}
                url={elem.url}
                main={elem.main_text}
                reports={elem.reports}
                flip={true}
              />
            );
          })}
        </>
      )}

      {other.length === 0 ? (
        <Err>No matching result found</Err>
      ) : (
        <>
          <Other>Other reports you might be interested</Other>
          {other.map((elem) => {
            return (
              <ResultEntry
                headline={elem.headline}
                date={elem.date_of_publication}
                url={elem.url}
                main={elem.main_text}
                reports={elem.reports}
                flip={false}
              />
            );
          })}
        </>
      )}

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
