import { fetcher } from "@/utils/fetcher";
import { QuickExpense } from "@/types/quick-expense.types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { User } from "@prisma/client";
import { ExpenseCreateBody } from "@/types/expense.types";
export const useQuickExpenses = () => {
  return useSWR<QuickExpense[]>("/api/quick-expenses", fetcher);
};

export const useAddQuickExpense = () => {
  return useSWRMutation(
    `/api/quick-expenses`,
    (
      url: string,
      {
        arg,
      }: {
        arg: {
          userId: User["id"];
          onSuccess?: () => void;
        };
      }
    ) => axios.post(url, arg)
  );
};

export const useUpdateQuickExpense = () => {
  return useSWRMutation(
    `/api/quick-expenses`,
    (url: string, { arg }: { arg: { id: number; data: ExpenseCreateBody } }) =>
      axios.put(`${url}/${arg.id}`, arg.data)
  );
};

export const useDeleteQuickExpense = () => {
  return useSWRMutation(
    `/api/quick-expenses`,
    (url: string, { arg }: { arg: { id: number } }) =>
      axios.delete(`${url}/${arg.id}`)
  );
};
