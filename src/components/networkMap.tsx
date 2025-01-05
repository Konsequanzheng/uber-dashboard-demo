"use client";

import React, { useRef } from "react";
import * as Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import mapData from "../data/mapData";

const mapOptions = {
  title: {
    text: "",
  },
  colorAxis: {
    min: 0,
    max: 200,
    stops: [
      [0, "#00FF00"],
      [0.5, "#FFFF00"],
      [1, "#FF0000"],
    ],
  },
  series: [
    {
      mapData: mapData,
      data: [
        ["ad", 80], // Andorra
        ["ae", 75], // United Arab Emirates (UAE)
        ["ar", 65], // Argentina
        ["at", 60], // Austria
        ["au", 85], // Australia
        ["bd", 70], // Bangladesh
        ["be", 55], // Belgium
        ["bh", 45], // Bahrain
        ["bo", 80], // Bolivia
        ["br", 75], // Brazil
        ["ca", 65], // Canada
        ["ch", 60], // Switzerland
        ["ci", 85], // Ivory Coast
        ["cl", 70], // Chile
        ["co", 55], // Colombia
        ["cr", 45], // Costa Rica
        ["cz", 80], // Czech Rep
        ["de", 75], // Germany
        ["do", 65], // Dominican Rep
        ["ec", 60], // Ecuador
        ["ee", 85], // Estonia
        ["eg", 70], // Egypt
        ["es", 55], // Spain
        ["fi", 45], // Finland
        ["fr", 80], // France
        ["gb", 75], // Great Britain
        ["gr", 65], // Greece
        ["gt", 60], // Guatemala
        ["hk", 85], // Hong Kong
        ["hn", 70], // Honduras
        ["hr", 55], // Croatia
        ["hu", 45], // Hungary
        ["ie", 80], // Republic of Ireland
        ["in", 75], // India
        ["it", 65], // Italy
        ["jm", 60], // Jamaica
        ["jo", 85], // Jordan
        ["jp", 70], // Japan
        ["ke", 55], // Kenya
        ["kr", 45], // Korea
        ["lb", 80], // Lebanon
        ["lk", 75], // Sri Lanka
        ["lt", 65], // Lithuania
        ["mt", 60], // Malta
        ["mx", 85], // Mexico
        ["ng", 70], // Nigeria
        ["nl", 55], // Netherlands
        ["no", 45], // Norway
        ["nz", 80], // New Zealand
        ["pa", 75], // Panama
        ["pe", 65], // Peru
        ["pl", 60], // Poland
        ["pt", 85], // Portugal
        ["py", 70], // Paraguay
        ["qa", 55], // Qatar
        ["ro", 45], // Romania
        ["sa", 80], // Saudi Arabia
        ["se", 75], // Sweden
        ["sk", 65], // Slovakia
        ["sv", 60], // El Salvador
        ["tr", 85], // Turkey
        ["tw", 70], // Taiwan
        ["tz", 55], // Tanzania
        ["ua", 45], // Ukraine
        ["ug", 80], // Uganda
        ["us", 75], // United States
        ["uy", 65], // Uruguay
        ["za", 60], // South Africa
      ],
      states: {
        hover: {
          color: "#a4edba",
        },
      },
      tooltip: {
        pointFormat: "{point.name}: {point.value}ms",
      },
    },
  ],
};

const NetworkMap = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-2xl font-bold">Mobile network latency</h2>
      <h3>Avg. ping (past 10 min)</h3>
      <HighchartsReact
        containerProps={{
          style: { height: "calc(100vh - 170px)", width: "100%" },
        }}
        highcharts={Highcharts}
        constructorType={"mapChart"}
        options={mapOptions}
        ref={chartComponentRef}
        {...props}
      />
    </div>
  );
};

export default NetworkMap;
