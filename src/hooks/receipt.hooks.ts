import { PrismaReceipt } from "@/types/receipt.types";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { swrConfig } from "@/lib/swr.config";
import { fetcher } from "@/utils/fetcher";

const RECEIPTS_KEY = "/api/receipts";
const SCAN_KEY = "/api/scan";

export const useReceipt = (id: string) => {
  return useSWR<PrismaReceipt>(id ? `${RECEIPTS_KEY}/${id}` : null, fetcher, {
    ...swrConfig,
    // Keep receipt data cached for 10 minutes
    dedupingInterval: 600000,
  });
};

export const useTodayReceipts = () => {
  return useSWR<PrismaReceipt[]>(RECEIPTS_KEY, fetcher, {
    ...swrConfig,
    // Revalidate receipts more frequently
    refreshInterval: 3000,
  });
};

export const useApproveReceipt = () => {
  return useSWRMutation(
    RECEIPTS_KEY,
    async (url: string, { arg }: { arg: { id: number } }) => {
      const response = await fetch(`${url}/${arg.id}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to approve receipt");

      // Update both receipt and receipts list cache
      await mutate(`${RECEIPTS_KEY}/${arg.id}`);
      await mutate(RECEIPTS_KEY);

      return response.json();
    }
  );
};

export const useDeleteReceipt = () => {
  return useSWRMutation(
    RECEIPTS_KEY,
    async (url: string, { arg }: { arg: { id: number } }) => {
      const response = await fetch(`${url}/${arg.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete receipt");

      // Optimistically update the cache
      mutate(
        RECEIPTS_KEY,
        (receipts: PrismaReceipt[] = []) =>
          receipts.filter((receipt) => receipt.id !== arg.id),
        { revalidate: false }
      );

      return response.json();
    }
  );
};

export const useScanReceipt = () => {
  return useSWRMutation(
    SCAN_KEY,
    async (url: string) => {
      const response = await fetch(url, {
        method: "POST",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to scan receipt");
      }

      // After successful scan, revalidate receipts list
      await mutate(RECEIPTS_KEY);

      return response.json();
    },
    {
      // Override default config for scanning
      throwOnError: true,
    }
  );
};
