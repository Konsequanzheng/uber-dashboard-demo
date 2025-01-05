import NetworkMap from "@/components/networkMap";

export const dynamic = "force-dynamic";

export default function NetworkMapPage() {
  return (
    <div className="flex flex-col items-center justify-center min-w-screen h-full p-4">
      <NetworkMap />
    </div>
  );
}
