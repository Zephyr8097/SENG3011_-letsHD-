import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// Import configs
import * as CONFIG from "../Constants/config";
// Import child components
import DiseaseEntry from "../Components/DiseaseEntry";

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

const Disease = () => {
  const [diseases, setDiseases] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(async () => {
    const url = `${CONFIG.DISEASE}/names`;
    try {
      const res = await axios.get(url, CONFIG.axiosHeader);
      setDiseases(res.data.diseaseNames);
      setFilter(res.data.diseaseNames);
    } catch {
      setDiseases(["Covid19", "Ebola", "Lasssa Fever"]);
      setFilter(["Covid19", "Ebola", "Lasssa Fever"]);
    }
    // onsole.log(res.data.diseaseNames);
  }, []);

  // Filter entries that contains user input
  const handleFilter = (input) => {
    const filtered = diseases.filter((elem) => {
      const str = elem.toLowerCase();
      return str.includes(input);
    });
    setFilter(filtered);
  };
  return (
    <Wrapper>
      <Header>Disease Information</Header>
      <Filter
        placeholder="Name of disease"
        onChange={(event) => {
          handleFilter(event.target.value.toLowerCase());
        }}
      />
      {filter === [] ? null : (
        <>
          {filter.map((elem) => {
            return <DiseaseEntry name={elem} />;
          })}
        </>
      )}
    </Wrapper>
  );
};

export default Disease;
