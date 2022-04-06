import React, { useState, useEffect } from "react";
import styled from "styled-components";
// Import configs
import * as CONFIG from "../Constants/config";

const Entries = styled.div`
  position: relative;
  width: 80%;
  height: auto;
  margin: auto;
  background-color: #eaeaea;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid lightgrey;
`;

const Field = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  width: 25%;
`;

const CovidEntry = ({ country, confirmed, death, recovered }) => {
  return (
    <Entries>
      <Field
        style={{ backgroundColor: "lightgrey", borderTop: "1px solid #eaeaea" }}
      >
        {country} &nbsp;
      </Field>
      <Field>{confirmed} &nbsp;</Field>
      <Field>{death} &nbsp;</Field>
      <Field>{recovered} &nbsp;</Field>
    </Entries>
  );
};

export default CovidEntry;
