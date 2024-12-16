import { ExpenseCreateBody, PrismaExpense } from "@/types/expense.types";
import { fetcher } from "@/utils/fetcher";
import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useExpenses = () => {
  return useSWR<PrismaExpense[]>(`/api/expenses`, fetcher);
};

export const useAddExpense = () => {
  return useSWRMutation(
    `/api/expenses`,
    (url: string, { arg }: { arg: ExpenseCreateBody }) => axios.post(url, arg)
  );
};
