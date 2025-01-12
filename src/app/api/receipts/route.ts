import { ScanService } from "@/services/scanService";

const scanService = new ScanService();

export async function GET() {
  const user_id = 1;

  try {
    const receipts = await scanService.getReceipts(user_id);
    return Response.json(receipts);
  } catch (error) {
    return Response.json({ error: "FETCH RECEIPTS ERROR" }, { status: 500 });
  }
}
