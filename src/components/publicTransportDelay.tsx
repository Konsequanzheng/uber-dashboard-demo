"use client";

import { formatTimestamp } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const PublicTransportDelay = () => {
  const [delay, setDelay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timestamp = formatTimestamp(new Date().toISOString());

    fetch(
      `/api/public-transport-delay?timestamp=${encodeURIComponent(timestamp)}`
    )
      .then((res) => res.json())
      .then((data) => setDelay(data.delay))
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, []);

  const getDelayColor = (delay: number) => {
    if (delay <= 5) return "text-green-500";
    if (delay <= 10) return "text-yellow-500";
    return "text-red-500";
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Average Public Transport Delay</CardTitle>
          <CardContent>Loading...</CardContent>
        </CardHeader>
      </Card>
    );
  }
  if (error)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Average Public Transport Delay</CardTitle>
          <CardContent>{error}</CardContent>
        </CardHeader>
      </Card>
    );

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Average Public Transport Delay</CardTitle>
        <CardDescription>Past hour</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-full">
        <p className={`text-7xl ${getDelayColor(delay ?? 0)}`}>
          {Math.trunc(delay ?? 0)}
          <span className="text-2xl"> minutes</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default PublicTransportDelay;
