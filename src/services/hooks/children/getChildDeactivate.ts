import { useQuery } from "@tanstack/react-query";
import { getChildDeactivate } from "../../children/children.service"

export const onGetChildDeactivate = () => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    return useQuery({
        queryKey: ['child'],
        queryFn: async () => {
            delay(800)
            return await getChildDeactivate()
        }
    });
}