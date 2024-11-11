"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, CartesianGrid } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface TransportData {
  timestamp: string;
  publicTransport: number;
  traffic: number;
  bikeSharing: number;
  pedestrians: number;
}

const Histogram = () => {
  const [data, setData] = useState<TransportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d+Z$/, "+00");

    fetch(`/api/mobility-data?timestamp=${encodeURIComponent(timestamp)}`)
      .then((res) => res.json())
      .then((data) => {
        // Format timestamp to show only hours
        const formattedData = data.map((item: TransportData) => ({
          ...item,
          hour: new Date(item.timestamp).getHours(),
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return (
      <Card className="flex flex-col">
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col">
        <CardContent>{error}</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Urban Mobility Overview (last 5 hours)</CardTitle>
      </CardHeader>
      <CardContent>
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
