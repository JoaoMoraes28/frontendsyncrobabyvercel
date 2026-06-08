import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { patchNotificationRead } from "../../notification/notification.service";
import type { JSONPatchNotification } from "../../notification/notification.service";

export const usePatchNotificationRead = () => {
    return useMutation({
        mutationFn: (data: JSONPatchNotification) => patchNotificationRead(data),

        onSuccess: (response) => {
            return response
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}