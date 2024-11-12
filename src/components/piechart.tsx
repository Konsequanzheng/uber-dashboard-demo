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
import { useEffect } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [status, setStatus] = React.useState<string | null>(null);
  const [data, setData] = React.useState<MobilityData[]>([]);
  const { dashboardData, isLoading, error } = useDashboard();

  useEffect(() => {
    const latest = dashboardData?.currentHour;
    if (!latest) return;

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
  }, [dashboardData]);

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

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Urban Mobility Distribution</CardTitle>
          <CardDescription>Last Hour</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row items-center gap-4 lg:pb-0 h-full">
          <Skeleton className="h-[200px] w-[200px] rounded-full" />
          <div className="flex flex-col pl-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Urban Mobility Distribution</CardTitle>
          <CardDescription>Last Hour</CardDescription>
        </CardHeader>
        <CardContent>{error}</CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="items-start pb-0">
        <CardTitle>Urban Mobility Distribution</CardTitle>
        <CardDescription>Last Hour</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row items-center lg:pb-0 h-full">
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
        <div className="flex flex-col ">
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
