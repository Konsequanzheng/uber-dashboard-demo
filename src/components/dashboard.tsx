import React from "react";
import Histogram from "./histogram";
import MobilityPieChart from "./piechart";
import Weather from "./weather";
import PublicTransportDelay from "./publicTransportDelay";
import CurrentEvent from "./currentEvent";
import AppInfo from "./appInfo";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-4 w-full grid-rows-6 p-4 max-w-[1100px]">
      <div className="col-span-12 md:col-span-6 row-span-2 md:row-span-3">
        <Histogram />
      </div>
      <div className="col-span-12 md:col-span-6 row-span-2 md:row-span-3 md:row-start-4">
        <MobilityPieChart />
      </div>
      <div className="col-span-12 md:col-span-6 row-span-1 md:row-span-2">
        <Weather />
      </div>
      <div className="col-span-12 md:col-span-6 row-span-2">
        <PublicTransportDelay />
      </div>

      <div className="col-span-12 md:col-span-6 row-span-2">
        <CurrentEvent />
      </div>
      <AppInfo />
    </div>
  );
};

export default Dashboard;
