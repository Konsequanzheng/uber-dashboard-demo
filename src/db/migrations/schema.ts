import {
  pgTable,
  timestamp,
  bigint,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const urbanTransportData = pgTable("urban_transport_data", {
  timestamp: timestamp({ withTimezone: true, mode: "string" })
    .primaryKey()
    .notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  publicTransportUsage: bigint("public_transport_usage", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  trafficFlow: bigint("traffic_flow", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  bikeSharingUsage: bigint("bike_sharing_usage", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  pedestrianCount: bigint("pedestrian_count", { mode: "number" }),
  weatherConditions: text("weather_conditions"),
  dayOfWeek: text("day_of_week"),
  holiday: text(),
  event: text(),
  temperature: doublePrecision(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  humidity: bigint({ mode: "number" }),
  roadIncidents: text("road_incidents"),
  publicTransportDelay: doublePrecision("public_transport_delay"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  bikeAvailability: bigint("bike_availability", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  pedestrianIncidents: bigint("pedestrian_incidents", { mode: "number" }),
});
