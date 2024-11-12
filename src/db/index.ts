import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { urbanTransportData } from "./migrations/schema";
import { and, ne, sql } from "drizzle-orm";

config({ path: ".env" });

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });

export async function getDashboardData(timestamp: string) {
  // Execute all database queries concurrently as they are independent of each other
  const [currentHourData, historicalData, nextEvent] = await Promise.all([
    // Get current hour data
    db
      .select({
        timestamp: urbanTransportData.timestamp,
        publicTransport: urbanTransportData.publicTransportUsage,
        traffic: urbanTransportData.trafficFlow,
        pedestrians: urbanTransportData.pedestrianCount,
        weatherConditions: urbanTransportData.weatherConditions,
        temperature: urbanTransportData.temperature,
        humidity: urbanTransportData.humidity,
        publicTransportDelay: urbanTransportData.publicTransportDelay,
      })
      .from(urbanTransportData)
      .where(
        sql`date_trunc('hour', ${urbanTransportData.timestamp}::timestamp) = 
            date_trunc('hour', ${timestamp}::timestamp)`
      )
      .limit(1),

    // Get historical data for charts
    db
      .select({
        timestamp: urbanTransportData.timestamp,
        publicTransport: urbanTransportData.publicTransportUsage,
        traffic: urbanTransportData.trafficFlow,
        pedestrians: urbanTransportData.pedestrianCount,
      })
      .from(urbanTransportData)
      .where(
        sql`${urbanTransportData.timestamp}::timestamp BETWEEN 
            ${timestamp}::timestamp - INTERVAL '6 hours' AND 
            ${timestamp}::timestamp - INTERVAL '1 hour'`
      )
      .orderBy(urbanTransportData.timestamp),

    // Get current or next event
    db
      .select({
        timestamp: urbanTransportData.timestamp,
        event: urbanTransportData.event,
      })
      .from(urbanTransportData)
      .where(
        and(
          sql`date_trunc('hour', ${urbanTransportData.timestamp}::timestamp) >= date_trunc('hour', ${timestamp}::timestamp)`,
          ne(urbanTransportData.event, "None")
        )
      )
      .limit(1),
  ]);

  return {
    currentHour: currentHourData[0],
    historicalData,
    nextEvent: nextEvent[0],
  };
}
