"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteReceipt, useReceipt } from "@/hooks/receipt.hooks";
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

  const handleDelete = async () => {
    try {
      await deleteReceipt({ id: parseInt(params.id as string) });
      toast.success("Receipt discarded successfully");
      router.push("/scan");
    } catch (error) {
      toast.error("Failed to discard receipt");
    }
  };

  const handleConfirm = async () => {
    try {
      toast.success("Receipt confirmed successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to confirm receipt");
    }
  };

  console.log("Receipt", receipt);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !receipt) {
    return <div>Failed to load receipt</div>;
  }

  const total = receipt.items.reduce(
    (sum, item) => sum + item.amount * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link href="/scan">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scanner
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              {receipt.name}
            </div>
            <span className="text-2xl font-bold">
              {formatCurrency(total, receipt.currency)}
            </span>
          </CardTitle>
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
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3">
                <ShoppingCart className="h-4 w-4" />
                Items ({receipt.items.length})
              </h3>
              <div className="space-y-3">
                {receipt.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-0"
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

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>{formatCurrency(total, receipt.currency)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent>
          {/* ... (previous content) */}

          <div className="mt-8 flex gap-4">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Discarding...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Discard Receipt
                </>
              )}
            </Button>
            <Button
              className="flex-1"
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {false ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Confirm Receipt
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
