import { useQuery } from "@tanstack/react-query";
import { getChildren } from "../../children/children.service"

export const onGetChildren = () => {
    return useQuery({
       queryKey: ['children'],
       queryFn: getChildren
    });
}