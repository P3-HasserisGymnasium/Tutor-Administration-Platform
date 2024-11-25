import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { AccountRegisterType } from "~/types/entity_types";

export const useAccountService = () => {
	const registerAccount = useMutation({
		mutationKey: ["registerAccount"],
		mutationFn: async (account: AccountRegisterType) => {
			const { data } = await apiClient.post<AccountRegisterType>(
				"/api/account_service",
				account
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Bruger oprettet");
		},
	});

	const removeAccount = useMutation({
		mutationKey: ["removeAccount"],
		mutationFn: async (accountId: number) => {
			await apiClient.delete(`/api/account_service/${accountId}`);
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Bruger slettet");
		},
	});

	return {
		registerAccount,
		removeAccount,
	};
};
