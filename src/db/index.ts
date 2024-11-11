import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { urbanTransportData } from "./migrations/schema";
import { and, eq, ne, sql } from "drizzle-orm";

config({ path: ".env" });

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });

export async function getPedestrianCountAt(timestamp: string) {
  const result = await db
    .select({ pedestrianCount: urbanTransportData.pedestrianCount })
    .from(urbanTransportData)
    .where(eq(urbanTransportData.timestamp, timestamp))
    .limit(1);

  return result[0]?.pedestrianCount ?? null;
}

export async function getMobilityDataByTimestamp(timestamp: string) {
  const result = await db
    .select({
      timestamp: urbanTransportData.timestamp,
      publicTransport: urbanTransportData.publicTransportUsage,
      traffic: urbanTransportData.trafficFlow,
      pedestrians: urbanTransportData.pedestrianCount,
    })
    .from(urbanTransportData)
    .where(
      sql`${urbanTransportData.timestamp}::timestamp BETWEEN 
          ${timestamp}::timestamp - INTERVAL '5 hours' AND 
          ${timestamp}::timestamp`
    )
    .orderBy(urbanTransportData.timestamp);

  return result;
}

export async function getWeatherByTimestamp(timestamp: string) {
  const result = await db
    .select({
      conditions: urbanTransportData.weatherConditions,
      temperature: urbanTransportData.temperature,
      humidity: urbanTransportData.humidity,
    })
    .from(urbanTransportData)
    .where(
      sql`${urbanTransportData.timestamp}::timestamp = 
          date_trunc('hour', ${timestamp}::timestamp)`
    )
    .limit(1);
  return result[0];
}

export async function getPublicTransportDelayByTimestamp(timestamp: string) {
  const result = await db
    .select({
      delay: urbanTransportData.publicTransportDelay,
    })
    .from(urbanTransportData)
    .where(
      sql`${urbanTransportData.timestamp}::timestamp = 
          date_trunc('hour', ${timestamp}::timestamp)`
    )
    .limit(1);
  return result[0];
}

export async function getNextEvent(timestamp: string) {
  const result = await db
    .select({
      timestamp: urbanTransportData.timestamp,
      event: urbanTransportData.event,
    })
    .from(urbanTransportData)
    .where(
      and(
        sql`${urbanTransportData.timestamp}::timestamp > ${timestamp}::timestamp`,
        ne(urbanTransportData.event, "None")
      )
    )
    .limit(1);

  return result[0];
}
