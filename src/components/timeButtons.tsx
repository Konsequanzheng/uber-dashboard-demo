"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTime } from "@/contexts/TimeContext";
import { cn } from "@/lib/utils";

const TimeButtons = ({ className }: { className?: string }) => {
  const { currentTime, moveTimeBackward, moveTimeForward } = useTime();

  return (
    <div className={cn("flex flex-row gap-4 items-center", className)}>
      <div className="text-lg text-center font-bold leading-5">
        <p>
          {currentTime.toLocaleString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
          <br />
          {currentTime.toLocaleString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <Button onClick={moveTimeBackward} variant="secondary">
          -1h
        </Button>
        <Button onClick={moveTimeForward} variant="secondary">
          +1h
        </Button>
      </div>
    </div>
  );
};

export default TimeButtons;
