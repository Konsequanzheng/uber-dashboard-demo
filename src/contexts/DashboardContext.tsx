"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTime } from "./TimeContext";
import { formatTimestamp } from "@/lib/utils";

interface DashboardData {
  currentHour: {
    timestamp: string;
    publicTransport: number;
    traffic: number;
    pedestrians: number;
    weatherConditions: string;
    temperature: number;
    humidity: number;
    event: string;
    publicTransportDelay: number;
  };
  historicalData: {
    timestamp: string;
    publicTransport: number;
    traffic: number;
    pedestrians: number;
  }[];
  nextEvent: {
    timestamp: string;
    event: string;
  };
}

interface DashboardContextType {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentTime } = useTime();

  useEffect(() => {
    const timestamp = formatTimestamp(currentTime.toISOString());

    fetch(`/api/dashboard-data?timestamp=${encodeURIComponent(timestamp)}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [currentTime]);

  return (
    <DashboardContext.Provider
      value={{ dashboardData: data, isLoading, error }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
