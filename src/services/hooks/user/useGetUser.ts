import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../user/user.service"; 
import type { ResponseUser } from "../../user/user.service";

export const useGetUser = () => {
  return useQuery<ResponseUser>({
    queryKey: ["user"],
    queryFn: async () => {
      return getUser()
    },
    enabled: false
  });
};
