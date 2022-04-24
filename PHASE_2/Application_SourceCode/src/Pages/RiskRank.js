import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// Import configs
import * as CONFIG from "../Constants/config";
// Import child component
import RiskRankEntry from "../Components/RiskRankEntry";

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

const Explain = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const Level = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const Ranking = styled.div`
  margin-right: 10px;
  text-align: center;
  color: white;
  border-radius: 5px;
  width: auto;
  min-width: 100px;
  padding: 5px;
  font-weight: bold;
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

const RiskRank = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(async () => {
    const url = `${CONFIG.BACKEND}/covid`;
    const res = await axios.get(url, CONFIG.axiosHeader);
    console.log(res.data);
    const temp = [
      {
        Country: "Bahrain",
        Risk: "Covid",
        Ranking: "3",
      },
      {
        Country: "Iraq",
        Risk: "-",
        Ranking: "2",
      },
      {
        Country: "Benin",
        Risk: "Covid",
        Ranking: "1",
      },
      {
        Country: "Australia",
        Risk: "Covid",
        Ranking: "3",
      },
      {
        Country: "Burundi",
        Risk: "Covid",
        Ranking: "4",
      },
      {
        Country: "Azores",
        Risk: "Covid",
        Ranking: "4",
      },
    ];
    //setData(temp);
    //setFilter(temp);
    setData(res.data);
    setFilter(res.data);
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
      <Header>Risk Assessment Level</Header>
      <Filter
        placeholder="Filter by country"
        onChange={(event) => {
          handleFilter(event.target.value.toLowerCase());
        }}
      />
      <Explain>
        <Level>
          <Ranking style={{ backgroundColor: "#d8d826" }}>Low</Ranking>
          <div>
            Make sure you are fully vaccinated before traveling to these
            destinations.
          </div>
        </Level>
        <Level>
          <Ranking style={{ backgroundColor: "orange" }}>Moderate</Ranking>
          <div>
            Make sure you are fully vaccniated before traveling to these
            destinations. Unvaccinated travelers who are at increased risk for
            servere illnes from COVID-19 should avoid nonessential travel to
            these destinations.
          </div>
        </Level>
        <Level>
          <Ranking style={{ backgroundColor: "red" }}>High</Ranking>
          <div>
            Make sure you are fully vaccniated before traveling to these
            destinations. Unvaccinated travelers who are at increased risk for
            servere illnes from COVID-19 should avoid nonessential travel to
            these destinations.
          </div>
        </Level>
        <Level>
          <Ranking style={{ backgroundColor: "brown" }}>Vert High</Ranking>
          <div>
            Avoid travel to these destinations. If you must travel to these
            destinations, make sure ou are fully vaccinated before travel.
          </div>
        </Level>
        <Level>
          <Ranking style={{ backgroundColor: "grey" }}>Unkown</Ranking>
          <div>
            Avoid travel to these destinations. If you must travel to these
            destinations, make sure ou are fully vaccinated before travel.
          </div>
        </Level>
      </Explain>
      {data === [] ? null : (
        <>
          {filter.map((elem) => {
            return (
              <RiskRankEntry country={elem.Country} ranking={elem.level} />
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

export default RiskRank;
