import React from "react";
import Histogram from "./histogram";
import MobilityPieChart from "./piechart";
const Dashboard = () => {
  return (
    <div>
      <div className="w-[500px]">
        <Histogram />
      </div>
      <div className="w-[500px]">
        <MobilityPieChart />
      </div>
    </div>
  );
};

export default Dashboard;
