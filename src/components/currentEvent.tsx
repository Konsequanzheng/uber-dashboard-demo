"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboard } from "@/contexts/DashboardContext";
import { useTime } from "@/contexts/TimeContext";
import { formatTimestamp } from "@/lib/utils";

type EventData = {
  event: string;
  timestamp: string;
};

const CurrentEvent = () => {
  const { currentTime } = useTime();
  const { dashboardData, isLoading, error } = useDashboard();
  const [event, setEvent] = useState<EventData | null>(null);
  const [formattedCurrentTime, setFormattedCurrentTime] = useState<
    string | null
  >(null);

  useEffect(() => {
    const formattedTimestamp = formatTimestamp(currentTime.toISOString());
    setFormattedCurrentTime(formattedTimestamp);
  }, [currentTime]);

  useEffect(() => {
    const eventData = dashboardData?.nextEvent;
    if (!eventData) return;
    setEvent(eventData);
  }, [dashboardData]);

  if (isLoading) {
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>{error}</CardContent>
      </Card>
    );
  }

  // Compare timestamps accurate to the hour
  const eventNow =
    event?.timestamp?.slice(0, -9) === formattedCurrentTime?.slice(0, -9);

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Current Event</CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-center items-center">
        <p className="text-6xl">{eventNow ? event?.event : "None"}</p>
      </CardContent>

      <CardFooter>
        <div className="flex flex-row">
          <p className="text-sm text-muted-foreground">
            {eventNow
              ? "Expect higher traffic"
              : `Next Event: ${event?.event} at ${event?.timestamp?.slice(
                  0,
                  -6
                )}`}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CurrentEvent;
