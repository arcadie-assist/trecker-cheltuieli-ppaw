"use client";

import { useScanReceipt, useTodayReceipts } from "@/hooks/receipt.hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Receipt, Upload, AlertCircle, CreditCard } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useUser } from "@/hooks/user.hooks";
import { Button } from "@/components/ui/button";

export default function ScanPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const { trigger, isMutating } = useScanReceipt();
  const { data: user } = useUser();

  const handleScan = async () => {
    try {
      const response = await trigger();

      if (response.error) {
        toast.error(response.error);
        if (response.error === "No scans remaining") {
          router.push("/memberships");
        }
        return;
      }

      toast.success("Receipt scanned successfully!");
      router.push(`/scan/${response.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to scan receipt");
      if (error.response?.data?.error === "No scans remaining") {
        router.push("/memberships");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleScan();
  };

  if (!user?.scans_remaining) {
    return (
      <div className="p-8">
        <PageHeader
          title="Receipt Scanner"
          description="Upload your receipt and we'll extract all items automatically"
        />

        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
            <CreditCard className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-center mb-6">
            <p className="mb-1 text-lg font-medium">No Scans Remaining</p>
            <p className="text-sm text-muted-foreground">
              Purchase a membership to continue scanning receipts
            </p>
          </div>
          <Button
            onClick={() => router.push("/memberships")}
            className="flex items-center gap-2"
          >
            View Memberships
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Receipt Scanner"
        description="Upload your receipt and we'll extract all items automatically"
      />

      <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10">
        <span className="text-sm font-medium text-blue-500">
          {user.scans_remaining} scan{user.scans_remaining !== 1 ? "s" : ""}{" "}
          remaining
        </span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Upload Section */}
        <div
          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-all
            ${
              isDragging
                ? "border-blue-500 bg-blue-500/5"
                : "border-border hover:border-blue-500/20 hover:bg-blue-500/5"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleScan}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
            <Upload className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-center">
            <p className="mb-1 text-base font-medium">Drop receipt here</p>
            <p className="text-sm text-muted-foreground">
              or click to select a file
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 rounded-lg border p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
              <Receipt className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Supported Formats</h3>
              <p className="text-sm text-muted-foreground">
                We support JPG, PNG and PDF files up to 10MB
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
              <AlertCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Processing Time</h3>
              <p className="text-sm text-muted-foreground">
                Processing usually takes 10-15 seconds depending on the receipt
                size
              </p>
            </div>
          </div>

          {isMutating && (
            <div className="rounded-lg bg-blue-500/5 p-4 text-sm text-blue-500">
              Processing your receipt... This might take a few seconds.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
