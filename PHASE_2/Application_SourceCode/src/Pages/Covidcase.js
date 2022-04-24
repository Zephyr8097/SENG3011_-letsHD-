import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// Import configs
import * as CONFIG from "../Constants/config";
// Import child component
import CovidEntry from "../Components/CovidEntry";

const Wrapper = styled.div`
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

const Header = styled.div`
  color: ${CONFIG.primaryColor};
  font-size: 35px;
  margin-top 20px;
`;

const Filter = styled.input`
  margin-top: 20px;
  width: 80%;
  height: 30px;
  font-size: 25px;
  background-color: lightblue;
  color: black;
  border: 1px solid transparent;
`;

const Declaration = styled.div`
  margin-top: 10px;
  display: flex;
  width: 80%;
  flex-direction: row;
`;

const Category = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 25%;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

const Covidcase = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [chosen, setChosen] = useState("location"); // stores user filter option either location || confirm || death || recover
  var original;
  useEffect(async () => {
    const url = `${CONFIG.COVID}/summary`;
    const res = await axios.get(url, CONFIG.axiosHeader);
    original = res.data.Countries;
    setData(res.data.Countries);
    setFilter(res.data.Countries);
  }, []);

  // Filter according to user preferences
  const handleFilterType = (type) => {
    console.log(data);
    if (type === "location") {
      setFilter(data);
    } else if (type === "confirm") {
      setFilter(filter.sort((a, b) => b.NewConfirmed - a.NewConfirmed));
    } else if (type === "death") {
      setFilter(filter.sort((a, b) => b.NewDeaths - a.NewDeaths));
    } else if (type === "recover") {
      setFilter(filter.sort((a, b) => b.NewRecovered - a.NewRecovered));
    }
  };

  // Filter entries that contains user input
  const handleFilter = (input) => {
    const filtered = data.filter((elem) => {
      const str = elem.Country.toLowerCase();
      return str.includes(input);
    });
    setFilter(filtered);
  };

  return (
    <Wrapper>
      <Header>Covid Daily Updates</Header>
      <Filter
        placeholder="Filter by country"
        onChange={(event) => {
          handleFilter(event.target.value.toLowerCase());
        }}
      />
      <Declaration>
        <Category
          style={{
            backgroundColor: "lightgrey",
            border:
              chosen === "location" ? `2px solid ${CONFIG.primaryColor}` : "",
          }}
        >
          Location (Country)
        </Category>

        <Category
          style={{
            backgroundColor: "#e9c5ca",
            border:
              chosen === "confirm" ? `2px solid ${CONFIG.primaryColor}` : "",
          }}
          onClick={() => {
            setChosen("confirm");
            handleFilterType("confirm");
          }}
        >
          New Confirm
        </Category>

        <Category
          style={{
            backgroundColor: "#b8b9d8",
            border:
              chosen === "death" ? `2px solid ${CONFIG.primaryColor}` : "",
          }}
          onClick={() => {
            setChosen("death");
            handleFilterType("death");
          }}
        >
          New Death
        </Category>

        <Category
          style={{
            backgroundColor: "#a5c8a5",
            border:
              chosen === "recover" ? `2px solid ${CONFIG.primaryColor}` : "",
          }}
          onClick={() => {
            setChosen("recover");
            handleFilterType("recover");
          }}
        >
          New Recover
        </Category>
      </Declaration>
      {data === [] ? null : (
        <>
          {filter.map((elem) => {
            return (
              <CovidEntry
                country={elem.Country}
                confirmed={elem.NewConfirmed}
                death={elem.NewDeaths}
                recovered={elem.NewRecovered}
              />
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

export default Covidcase;
