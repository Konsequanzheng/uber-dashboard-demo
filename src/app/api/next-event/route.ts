import { getNextEvent } from "@/db";
import { NextRequest } from "next/server";
import { isValidTimestamp } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timestamp = searchParams.get("timestamp");

  if (!timestamp || !isValidTimestamp(timestamp)) {
    console.log("Invalid timestamp format", timestamp);
    return new Response("Invalid timestamp format", { status: 400 });
  }

  try {
    const data = await getNextEvent(timestamp);
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching event data:", error);
    return new Response("Error fetching event data", { status: 500 });
  }
}
