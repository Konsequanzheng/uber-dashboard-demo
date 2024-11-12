"use client";

import React, { createContext, useContext, useState } from "react";

interface TimeContextType {
  currentTime: Date;
  moveTimeForward: () => void;
  moveTimeBackward: () => void;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export function TimeProvider({ children }: { children: React.ReactNode }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  const moveTimeForward = () => {
    setCurrentTime((prev) => {
      const newTime = new Date(prev);
      newTime.setHours(newTime.getHours() + 1);
      return newTime;
    });
  };

  const moveTimeBackward = () => {
    setCurrentTime((prev) => {
      const newTime = new Date(prev);
      newTime.setHours(newTime.getHours() - 1);
      return newTime;
    });
  };

  return (
    <TimeContext.Provider
      value={{ currentTime, moveTimeForward, moveTimeBackward }}
    >
      {children}
    </TimeContext.Provider>
  );
}

export function useTime() {
  const context = useContext(TimeContext);
  if (context === undefined) {
    throw new Error("useTime must be used within a TimeProvider");
  }
  return context;
}
