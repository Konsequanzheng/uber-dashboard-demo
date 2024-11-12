"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useDashboard } from "@/contexts/DashboardContext";

type WeatherData = {
  temperature: number;
  humidity: number;
  conditions: string;
};

const weatherEmojis: Record<string, string> = {
  Clear: "☀️",
  Rain: "🌧️",
  Fog: "🌫️",
  Snow: "❄️",
};

const Weather = () => {
  const { dashboardData, isLoading, error } = useDashboard();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const latest = dashboardData?.currentHour;
    if (!latest) return;
    const weatherData: WeatherData = {
      temperature: latest.temperature,
      humidity: latest.humidity,
      conditions: latest.weatherConditions,
    };
    setWeather(weatherData);
  }, [dashboardData]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading weather data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Current Weather</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-center items-center gap-8 h-full">
        <div className="flex flex-col items-center">
          <span className="text-7xl">
            {weather?.conditions ? weatherEmojis[weather.conditions] : ""}
          </span>
          <p className="text-2xl">{weather?.conditions}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-7xl">{Math.trunc(weather?.temperature ?? 0)}°C</p>
          <p className=" text-md text-muted-foreground">
            {weather?.humidity}% Humidity
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Weather;
