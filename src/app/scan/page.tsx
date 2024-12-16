"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScanReceipt } from "@/hooks/receipt.hooks";
// import { useScanReceipt } from "@/hooks/receipts.hooks";
import {
  Upload,
  Receipt,
  Camera,
  Loader2,
  ImagePlus,
  ScanLine,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ScanPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const { trigger, isMutating } = useScanReceipt();

  const handleScan = async () => {
    try {
      const response = await trigger();
      toast.success("Receipt scanned successfully!");
      // Redirect to the receipt details page
      router.push(`/scan/${response.data.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to scan receipt");
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
    // Trigger scan when file is dropped
    handleScan();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Receipt className="h-8 w-8" />
          Receipt Scanner
        </h1>
        <p className="text-muted-foreground">
          Upload your receipt and we'll extract all items automatically
        </p>
      </div>

      <Card
        className={`p-8 ${
          isDragging ? "border-primary border-2" : ""
        } transition-all`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Drag and drop your receipt
            </h2>
            <p className="text-muted-foreground mb-4">
              or use one of the options below
            </p>
          </div>

          <div className="grid gap-4 max-w-sm mx-auto">
            <Button
              className="w-full"
              onClick={() => handleScan()}
              disabled={isMutating}
            >
              {isMutating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Upload Receipt
                </>
              )}
            </Button>

            <Button variant="outline" className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <ScanLine className="h-5 w-5" />
          Scanning Tips
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Ensure the receipt is flat and well-lit</li>
          <li>• Capture the entire receipt in the frame</li>
          <li>• Avoid shadows and glare on the receipt</li>
          <li>• Make sure the text is clearly visible</li>
        </ul>
      </div>
    </div>
  );
}
