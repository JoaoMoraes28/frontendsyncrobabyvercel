import { getChild } from "../../children/children.service"
import { useQuery } from "@tanstack/react-query";

export const useGetChild = (idChild: number) => {
    return useQuery({
       queryKey: ['child'],
       queryFn: () => getChild(idChild)
    });
}