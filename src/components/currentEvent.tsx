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
import { Skeleton } from "@/components/ui/skeleton";

type EventData = {
  event: string;
  timestamp: Date;
};

const CurrentEvent = () => {
  const { currentTime } = useTime();
  const { dashboardData, isLoading, error } = useDashboard();
  const [event, setEvent] = useState<EventData | null>(null);

  useEffect(() => {
    // Skip if timestamp is undefined
    if (!dashboardData?.nextEvent?.timestamp) return;

    const eventData = {
      event: dashboardData?.nextEvent?.event,
      timestamp: new Date(dashboardData.nextEvent.timestamp),
    };
    setEvent(eventData);
  }, [dashboardData]);

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Current Event</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex flex-col justify-center items-center">
          <Skeleton className="h-24 w-48" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-[250px]" />
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Current Event</CardTitle>
        </CardHeader>
        <CardContent>{error}</CardContent>
      </Card>
    );
  }

  // Compare timestamps accurate to the hour
  const eventNow =
    event?.timestamp.toISOString().slice(0, 13) ===
    currentTime.toISOString().slice(0, 13);

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
              : `Next Event: ${
                  event?.event
                } at ${event?.timestamp.toLocaleString()}`}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CurrentEvent;
