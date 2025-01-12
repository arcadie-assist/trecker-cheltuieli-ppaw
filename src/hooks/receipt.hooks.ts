import { PrismaReceipt, PrismaReceiptItem } from "@/types/receipt.types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

async function fetchReceipt(id: string) {
  const response = await fetch(`/api/receipts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch receipt");
  return response.json();
}

async function approveReceipt(url: string, { arg }: { arg: { id: number } }) {
  const response = await fetch(`/api/receipts/${arg.id}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to approve receipt");
  return response.json();
}

async function fetchTodayReceipts() {
  const response = await fetch("/api/receipts");
  if (!response.ok) throw new Error("Failed to fetch receipts");
  return response.json();
}

async function deleteReceipt(url: string, { arg }: { arg: { id: number } }) {
  const response = await fetch(`/api/receipts/${arg.id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete receipt");
  return response.json();
}

async function scanReceipt(url: string) {
  const response = await fetch("/api/scan", {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to scan receipt");
  return response.json();
}

export function useReceipt(id: string) {
  return useSWR<PrismaReceipt & { items: PrismaReceiptItem[] }>(
    id ? `/api/receipts/${id}` : null,
    () => fetchReceipt(id)
  );
}

export function useTodayReceipts() {
  return useSWR<(PrismaReceipt & { items: PrismaReceiptItem[] })[]>(
    "/api/receipts",
    fetchTodayReceipts
  );
}

export function useDeleteReceipt() {
  return useSWRMutation("/api/receipts/delete", deleteReceipt);
}

export function useScanReceipt() {
  return useSWRMutation("/api/scan", scanReceipt);
}

export function useApproveReceipt() {
  return useSWRMutation("/api/receipts/approve", approveReceipt);
}
