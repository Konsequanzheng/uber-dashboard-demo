"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, CartesianGrid, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useDashboard } from "@/contexts/DashboardContext";
import { Skeleton } from "@/components/ui/skeleton";

interface MobilityData {
  timestamp: string;
  publicTransport: number;
  traffic: number;
  pedestrians: number;
}

const Histogram = () => {
  const { dashboardData, isLoading, error } = useDashboard();
  const [data, setData] = useState<MobilityData[]>([]);

  useEffect(() => {
    const historicalData = dashboardData?.historicalData;
    if (!historicalData) return;
    const formattedData = historicalData.map((item: MobilityData) => ({
      ...item,
      hour: new Date(item.timestamp).getHours(),
    }));
    setData(formattedData);
  }, [dashboardData]);

  const chartConfig = {
    publicTransport: {
      label: "Public Transport",
      color: "hsl(var(--chart-1))",
    },
    traffic: {
      label: "Traffic",
      color: "hsl(var(--chart-2))",
    },
    pedestrians: {
      label: "Pedestrians",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Urban Mobility Overview</CardTitle>
          <CardDescription>Last 5 Hours</CardDescription>
        </CardHeader>
        <CardContent className="h-full flex flex-col justify-center">
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Urban Mobility Overview</CardTitle>
          <CardDescription>Last 5 Hours</CardDescription>
        </CardHeader>
        <CardContent>{error}</CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Urban Mobility Overview</CardTitle>
        <CardDescription>Last 5 Hours</CardDescription>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-center">
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}:00`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              width={30}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="publicTransport"
              stackId="a"
              fill="var(--color-publicTransport)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="pedestrians"
              stackId="a"
              fill="var(--color-pedestrians)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="traffic"
              stackId="a"
              fill="var(--color-traffic)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Histogram;
