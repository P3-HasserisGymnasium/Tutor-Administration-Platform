import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { AccountRegisterType, LoginSuccessDataType, LoginType } from "~/types/entity_types";
import { AccountRegisterResponseType } from "~/types/data_types";
import { useNavigate } from "react-router-dom"

export const useAccountService = () => {
	const navigate = useNavigate();
	const useRegisterAccount = () => {
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
				navigate("/login");
				if (data.tutee) {
					toast.success("Your account has been created and you can log in as a tutee!")
				}
				if (data.tutor) {
					toast.info("When an administrator accepts your tutor application, you will be granted access to the system as a tutor")
				}
			},
		});
	}

	const useRemoveAccount = () => {
		return useMutation({
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
		})
	};





	const useLogin = () => {
		return useMutation({
			mutationKey: ["login"],
			mutationFn: async (login_information: LoginType) => {
				const { data } = await apiClient.post<LoginSuccessDataType>(
					"/api/account/login",
					login_information
				);
				return data;
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: () => {
				toast.success("You have been logged in");
			},
		})
	};

	const useLogout = () => {
		return useMutation({
			mutationKey: ["logout"],
			mutationFn: async () => {
				await apiClient.post("/api/account/logout");
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: () => {
				toast.success("You have been logged out");
			},
		})
	}

	return {
		useRegisterAccount,
		useRemoveAccount,
		useLogin,
		useLogout,
	};
};