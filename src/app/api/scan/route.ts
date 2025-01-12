import { ScanService } from "@/services/scanService";

const scanService = new ScanService();

export async function POST() {
  const user_id = 1; // In a real app, this would come from authentication

  try {
    const result = await scanService.processReceipt(user_id);
    return Response.json(result.receipt);
  } catch (error) {
    console.error("Scan error:", error);
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ error: "SCAN ERROR" }, { status: 500 });
  }
}
