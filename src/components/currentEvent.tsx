"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimestamp } from "@/lib/utils";
import { useTime } from "@/contexts/TimeContext";

type EventData = {
  timestamp: string;
  event: string;
};

const CurrentEvent = () => {
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const { currentTime } = useTime();

  useEffect(() => {
    const timestamp = formatTimestamp(currentTime.toISOString());
    fetch(`/api/next-event?timestamp=${encodeURIComponent(timestamp)}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setTimestamp(timestamp);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [currentTime]);

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
  const eventNow = event?.timestamp?.slice(0, -9) === timestamp?.slice(0, -9);

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
