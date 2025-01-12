import { ExpenseCreateBody, PrismaExpense } from "@/types/expense.types";
import { fetcher } from "@/utils/fetcher";
import axios from "axios";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { swrConfig } from "@/lib/swr.config";

const EXPENSES_KEY = "/api/expenses";

export const useExpenses = () => {
  return useSWR<PrismaExpense[]>(EXPENSES_KEY, fetcher, {
    ...swrConfig,
    // Override specific config for expenses if needed
    revalidateOnFocus: true,
  });
};

export const useAddExpense = () => {
  return useSWRMutation(
    EXPENSES_KEY,
    async (url: string, { arg }: { arg: ExpenseCreateBody }) => {
      const response = await axios.post(url, arg);
      // Optimistically update the expenses cache
      mutate(
        EXPENSES_KEY,
        (expenses: PrismaExpense[] = []) => [response.data, ...expenses],
        { revalidate: false }
      );
      return response;
    }
  );
};

export const useUpdateExpense = () => {
  return useSWRMutation(
    EXPENSES_KEY,
    async (
      url: string,
      { arg }: { arg: { id: number; data: ExpenseCreateBody } }
    ) => {
      const response = await axios.put(`${url}/${arg.id}`, arg.data);
      // Optimistically update the cache
      mutate(
        EXPENSES_KEY,
        (expenses: PrismaExpense[] = []) =>
          expenses.map((expense) =>
            expense.id === arg.id ? { ...expense, ...arg.data } : expense
          ),
        { revalidate: false }
      );
      return response;
    }
  );
};

export const useDeleteExpense = () => {
  return useSWRMutation(
    EXPENSES_KEY,
    async (url: string, { arg }: { arg: { id: number } }) => {
      const response = await axios.delete(`${url}/${arg.id}`);
      // Optimistically update the cache
      mutate(
        EXPENSES_KEY,
        (expenses: PrismaExpense[] = []) =>
          expenses.filter((expense) => expense.id !== arg.id),
        { revalidate: false }
      );
      return response;
    }
  );
};
