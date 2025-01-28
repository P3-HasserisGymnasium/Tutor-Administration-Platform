


import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useDemoService = () => {

    const useDemoSetup = () => {

        return useMutation({
            mutationKey: ["setupDemo"],
            mutationFn: async () => {
                toast.info("Setting up demo...");
                await apiClient.post("/api/demo/setup");
            },
            onError: (e: AxiosError) => {
                toast.error("Setup failed: " + e?.response?.data);
            },
            onSuccess: () => {
                toast.success("Demo setup complete");
            },
        });
    }

    const useDemoClean = () => {
        return useMutation({
            mutationKey: ["cleanDemo"],
            mutationFn: async () => {
                toast.info("Cleaning database...");
                await apiClient.post("/api/demo/clean");
            },
            onError: (e: AxiosError) => {
                toast.error("Clean failed: " + e?.response?.data);
            },
            onSuccess: () => {
                toast.success("Database clean complete");
            },
        });
    }

    return {
        useDemoSetup,
        useDemoClean
    };
}