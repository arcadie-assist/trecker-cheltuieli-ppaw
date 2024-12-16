import { fetcher } from "@/utils/fetcher";
import { Membership, User } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useMemberships = () => {
  return useSWR<Membership[]>("/api/memberships", fetcher);
};

export const useChooseMembership = () => {
  return useSWRMutation(
    `/api/memberships`,
    (
      url: string,
      {
        arg,
      }: {
        arg: {
          userId: User["id"];
          membershipId: Membership["id"];
          onSuccess?: () => void;
        };
      }
    ) => axios.post(url, arg)
  );
};
