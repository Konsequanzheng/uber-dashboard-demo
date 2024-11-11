"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatTimestamp } from "@/lib/utils";
import { useEffect } from "react";

interface MobilityData {
  mode: string;
  count: number;
  fill: string;
}

const chartConfig = {
  count: {
    label: "Count",
  },
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

export default function MobilityPieChart() {
  const [data, setData] = React.useState<MobilityData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const timestamp = formatTimestamp(new Date().toISOString());

    fetch(`/api/mobility-data?timestamp=${encodeURIComponent(timestamp)}`)
      .then((res) => res.json())
      .then((rawData) => {
        // Take the latest data point
        const latest = rawData[rawData.length - 1];
        const formattedData = [
          {
            mode: "publicTransport",
            count: latest.publicTransport,
            fill: "var(--color-publicTransport)",
          },
          {
            mode: "traffic",
            count: latest.traffic,
            fill: "var(--color-traffic)",
          },
          {
            mode: "pedestrians",
            count: latest.pedestrians,
            fill: "var(--color-pedestrians)",
          },
        ];
        setData(formattedData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const totalCount = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  useEffect(() => {
    if (totalCount > 5000) {
      setStatus("Busy");
    } else if (totalCount > 2000) {
      setStatus("Moderate");
    } else {
      setStatus("Quiet");
    }
  }, [totalCount]);

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
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Urban Mobility Distribution</CardTitle>
        <CardDescription>Last Hour</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square min-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="mode"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          in Transit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col w-full ">
          <div className="text-md text-muted-foreground">Status:</div>
          <div
            className={`text-3xl font-bold ${
              status === "Busy"
                ? "text-red-500"
                : status === "Moderate"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {status}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}