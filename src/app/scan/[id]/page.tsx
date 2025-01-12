"use client";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  useDeleteReceipt,
  useReceipt,
  useApproveReceipt,
  useTodayReceipts,
} from "@/hooks/receipt.hooks";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  Loader2,
  Receipt,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ReceiptDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { data: receipt, isLoading, error } = useReceipt(params.id as string);
  const { trigger: deleteReceipt, isMutating: isDeleting } = useDeleteReceipt();
  const { trigger: approveReceipt, isMutating: isApproving } =
    useApproveReceipt();
  const { mutate: refreshReceipts } = useTodayReceipts();

  const handleDelete = async () => {
    try {
      await deleteReceipt({ id: parseInt(params.id as string) });
      refreshReceipts();
      toast.success("Receipt discarded successfully");
      router.push("/scan");
    } catch (error) {
      toast.error("Failed to discard receipt");
    }
  };

  const handleConfirm = async () => {
    try {
      await approveReceipt({ id: parseInt(params.id as string) });
      refreshReceipts();
      toast.success("Receipt confirmed successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to confirm receipt");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <PageHeader
          title="Receipt Details"
          description="Review and confirm your scanned receipt"
        />
        <div className="animate-pulse space-y-4">
          <div className="h-[400px] bg-muted rounded-lg border border-border" />
        </div>
      </div>
    );
  }

  if (error || !receipt) {
    return (
      <div className="p-8">
        <PageHeader
          title="Receipt Details"
          description="Review and confirm your scanned receipt"
        />
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Failed to load receipt</h3>
          <p className="text-muted-foreground">
            There was an error loading the receipt details
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/scan")}
          >
            Back to Scanner
          </Button>
        </div>
      </div>
    );
  }

  const total = receipt.items.reduce(
    (sum, item) => sum + item.amount * item.quantity,
    0
  );

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="Receipt Details"
          description="Review and confirm your scanned receipt"
        />

        <div className="rounded-lg border border-border bg-card">
          {/* Header Info */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{receipt.name}</h2>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {receipt.market}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(receipt.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-500">
              {formatCurrency(total, receipt.currency)}
            </div>
          </div>

          {/* Items List */}
          <div>
            <h3 className="flex p-4 border-b gap-2 items-center font-semibold">
              <ShoppingCart className="h-4 w-4" />
              Items ({receipt.items.length})
            </h3>
            <div>
              {receipt.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-4 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} {item.unit} ×{" "}
                      {formatCurrency(item.amount, receipt.currency)}
                    </p>
                  </div>
                  <div className="font-semibold">
                    {formatCurrency(
                      item.amount * item.quantity,
                      receipt.currency
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center p-4 border-t font-bold text-lg">
            <span>Total</span>
            <span className="text-blue-500">
              {formatCurrency(total, receipt.currency)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {receipt.approved ? "Deleting..." : "Discarding..."} Receipt
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                {receipt.approved ? "Delete" : "Discard"} Receipt
              </>
            )}
          </Button>
          <Button
            className="flex-1"
            onClick={handleConfirm}
            disabled={isApproving}
          >
            <Check className="mr-2 h-4 w-4" />
            {receipt.approved ? "Confirm" : "Approve"} Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}
