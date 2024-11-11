-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "urban_transport_data" (
	"timestamp" timestamp with time zone PRIMARY KEY NOT NULL,
	"public_transport_usage" bigint,
	"traffic_flow" bigint,
	"bike_sharing_usage" bigint,
	"pedestrian_count" bigint,
	"weather_conditions" text,
	"day_of_week" text,
	"holiday" text,
	"event" text,
	"temperature" double precision,
	"humidity" bigint,
	"road_incidents" text,
	"public_transport_delay" double precision,
	"bike_availability" bigint,
	"pedestrian_incidents" bigint
);
--> statement-breakpoint
ALTER TABLE "urban_transport_data" ENABLE ROW LEVEL SECURITY;
*/