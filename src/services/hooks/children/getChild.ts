import { getChild } from "../../children/children.service"
import { useQuery } from "@tanstack/react-query";

export const useGetChild = (idChild: number) => {
    return useQuery({
       queryKey: ['child', idChild],
       queryFn: () => getChild(idChild)
    });
}