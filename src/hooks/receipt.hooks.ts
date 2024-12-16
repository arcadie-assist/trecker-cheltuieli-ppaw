import { PrismaReceipt } from "@/types/receipt.types";
import { fetcher } from "@/utils/fetcher";
import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useReceipt = (id: string) => {
  return useSWR<PrismaReceipt & { items: any[] }>(
    id ? `/api/receipts/${id}` : null,
    fetcher
  );
};

export const useTodayReceipts = () => {
  return useSWR<(PrismaReceipt & { items: any[] })[]>("/api/receipts", fetcher);
};

export const useScanReceipt = () => {
  return useSWRMutation(`/api/scan`, (url: string) => axios.post(url));
};

export const useDeleteReceipt = () => {
  return useSWRMutation(
    `/api/receipts`,
    (url: string, { arg }: { arg: { id: number } }) =>
      axios.delete(`${url}/${arg.id}`)
  );
};
