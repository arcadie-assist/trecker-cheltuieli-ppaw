import { ScanService } from "@/services/scanService";

const scanService = new ScanService();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user_id = 1;

  try {
    const receipt = await scanService.getReceiptById(
      parseInt(params.id),
      user_id
    );

    if (!receipt) {
      return Response.json({ error: "Receipt not found" }, { status: 404 });
    }

    return Response.json(receipt);
  } catch (error) {
    return Response.json({ error: "GET RECEIPT ERROR" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user_id = 1;

  try {
    await scanService.softDeleteReceipt(parseInt(params.id), user_id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "DELETE RECEIPT ERROR" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user_id = 1;

  try {
    const receipt = await scanService.approveReceipt(
      parseInt(params.id),
      user_id
    );
    return Response.json(receipt);
  } catch (error) {
    return Response.json({ error: "APPROVE RECEIPT ERROR" }, { status: 500 });
  }
}
