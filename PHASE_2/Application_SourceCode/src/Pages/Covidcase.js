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

const Covidcase = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(async () => {
    const url = `${CONFIG.COVID}/summary`;
    const res = await axios.get(url, CONFIG.axiosHeader);
    setData(res.data.Countries);
    setFilter(res.data.Countries);
  }, []);

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
