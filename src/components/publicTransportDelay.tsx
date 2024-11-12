"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useDashboard } from "@/contexts/DashboardContext";
import { Skeleton } from "@/components/ui/skeleton";

const PublicTransportDelay = () => {
  const { dashboardData, isLoading, error } = useDashboard();
  const [delay, setDelay] = useState<number | null>(null);

  useEffect(() => {
    const latest = dashboardData?.currentHour;
    if (!latest) return;
    setDelay(latest.publicTransportDelay);
  }, [dashboardData]);

  const getDelayColor = (delay: number) => {
    if (delay <= 5) return "text-green-500";
    if (delay <= 10) return "text-yellow-500";
    return "text-red-500";
  };

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Average Public Transport Delay</CardTitle>
          <CardDescription>Past hour</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-full">
          <Skeleton className="h-24 w-48" />
        </CardContent>
      </Card>
    );
  }
  if (error)
    return (
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Average Public Transport Delay</CardTitle>
          <CardDescription>Past hour</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
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
