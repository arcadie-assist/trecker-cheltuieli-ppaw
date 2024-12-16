import { User } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useUser = () => {
  return useSWR<User>("/api/user", fetcher);
};
