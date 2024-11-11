import React from "react";
import Histogram from "./histogram";
import MobilityPieChart from "./piechart";
import Weather from "./weather";
import PublicTransportDelay from "./publicTransportDelay";
import NextEvent from "./nextEvent";

const Dashboard = () => {
  return (
    <div>
      <div className="w-[500px]">
        <Histogram />
      </div>
      <div className="w-[500px]">
        <MobilityPieChart />
      </div>
      <div className="w-[500px]">
        <Weather />
      </div>
      <div className="w-[500px]">
        <PublicTransportDelay />
      </div>
      <div className="w-[500px]">
        <NextEvent />
      </div>
    </div>
  );
};

export default Dashboard;
