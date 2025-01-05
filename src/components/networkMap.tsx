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
    stops: [
      [0, "#EFEFFF"],
      [0.67, "#4444FF"],
      [1, "#000022"],
    ],
  },
  series: [
    {
      mapData: mapData,
      name: "Norway",
      data: [
        ["no-mr", 0],
        ["no-st", 1],
        ["no-ho", 2],
        ["no-sf", 42],
        ["no-va", 4],
        ["no-of", 5],
        ["no-nt", 6],
        ["no-ro", 7],
        ["no-bu", 8],
        ["no-vf", 9],
        ["no-fi", 10],
        ["no-no", 11],
        ["no-tr", 12],
        ["no-ak", 13],
        ["no-op", 14],
        ["no-he", 15],
        ["no-os", 16],
        ["no-te", 17],
        ["no-aa", 18],
      ],
    },
  ],
};

const NetworkMap = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"mapChart"}
      options={mapOptions}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default NetworkMap;
