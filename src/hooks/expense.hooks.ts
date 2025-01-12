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

export const useUpdateExpense = () => {
  return useSWRMutation(
    `/api/expenses`,
    (url: string, { arg }: { arg: { id: number; data: ExpenseCreateBody } }) =>
      axios.put(`${url}/${arg.id}`, arg.data)
  );
};

export const useDeleteExpense = () => {
  return useSWRMutation(
    `/api/expenses`,
    (url: string, { arg }: { arg: { id: number } }) =>
      axios.delete(`${url}/${arg.id}`)
  );
};
