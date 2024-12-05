import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { AccountRegisterType } from "~/types/entity_types";
import { AccountRegisterResponseType } from "~/types/data_types";
import { useNavigate } from "react-router-dom"

export const useAccountService = () => {
	const navigate = useNavigate();
	const registerAccount = () => {
		return useMutation({
			mutationKey: ["registerAccount"],
			mutationFn: async (account: AccountRegisterType) => {
				console.log(account);
				const { data } = await apiClient.post<AccountRegisterResponseType>(
					"/api/account/",
					account
				);
				return data;
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: (data) => {
				navigate("/start");
				if (data.tutee) {
					toast.success("Your account has been created and you can log in as a tutee!")
				}
				if (data.tutor) {
					toast.info("When an administrator accepts your tutor application, you will be granted access to the system as a tutor")
				}
			},
		});
	}

	const removeAccount = useMutation({
		mutationKey: ["removeAccount"],
		mutationFn: async (accountId: number) => {
			await apiClient.delete(`/api/account/${accountId}`);
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