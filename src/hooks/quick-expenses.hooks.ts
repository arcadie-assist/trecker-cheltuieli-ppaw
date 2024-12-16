import { fetcher } from "@/utils/fetcher";
import { QuickExpense } from "@/types/quick-expense.types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { User } from "@prisma/client";
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
