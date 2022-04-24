import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
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

/*
const markers = [
  {
    markerOffset: -15,
    name: "Buenos Aires",
    coordinates: [-58.3816, -34.6037],
  },
  { markerOffset: -15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
  { markerOffset: 25, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 25, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: 25, name: "Bogota", coordinates: [-74.0721, 4.711] },
  { markerOffset: 25, name: "Quito", coordinates: [-78.4678, -0.1807] },
  { markerOffset: -15, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
  { markerOffset: -15, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
  { markerOffset: 25, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
  { markerOffset: 25, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
  { markerOffset: -15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
  { markerOffset: -15, name: "Lima", coordinates: [-77.0428, -12.0464] },
];*/

const DiseaseEntry = ({ name }) => {
  const [expand, setExpand] = useState(false);
  const [info, setInfo] = useState({});
  const [markers, setMarkers] = useState([]);
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  useEffect(async () => {
    var arr = [];
    const url = `${CONFIG.DISEASE}/${name}`;
    const res = await axios.get(url, CONFIG.axiosHeader);
    setInfo(res.data);
    const newMarkers = [];
    res.data.locations.map(async (index) => {
      const geo = await axios.get(
        `https://geocode.maps.co/search?q=${index}`,
        CONFIG.axiosHeader
      );
      const coord = [geo.data[0].lon, geo.data[0].lat];
      const mark = {
        markerOffset: 10,
        name: index,
        coordinates: coord,
      };
      arr.push(mark);
    });
    setMarkers(arr);
  }, []);
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
          <div style={{ width: "100%", height: "100%" }}>
            <ComposableMap>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                  ))
                }
              </Geographies>
              {markers === [] ? null : (
                <>
                  {markers.map(({ name, coordinates, markerOffset }) => {
                    return (
                      <Marker key={name} coordinates={coordinates}>
                        <circle r={10} fill="#F00" stroke="#fff" />
                        <text
                          textAnchor="middle"
                          style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                        >
                          {name}
                        </text>
                      </Marker>
                    );
                  })}
                </>
              )}
            </ComposableMap>
          </div>
        </Bottom>
      ) : null}
    </Entries>
  );
};

export default DiseaseEntry;
