import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { AccountRegisterType, LoginSuccessDataType, LoginType } from "~/types/entity_types";
import { AccountRegisterResponseType } from "~/types/data_types";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "~/utilities/helperFunctions";

export const useAccountService = () => {
	const navigate = useNavigate();
	const useRegisterAccount = () => {
		return useMutation({
			mutationKey: ["registerAccount"],
			mutationFn: async (account: AccountRegisterType) => {
				const { data } = await apiClient.post<AccountRegisterResponseType>("/api/account/", account);
				return data;
			},
			onError: (e: AxiosError) => {
				toast.error("Creation of account failed: " + e?.response?.data);
			},
			onSuccess: (data) => {
				navigate("/login");
				if (data.tutee) {
					toast.success("Your account has been created and you can log in as a tutee!");
				}
				if (data.tutor) {
					toast.info(
						"When an administrator accepts your tutor application, you will be granted access to the system as a tutor"
					);
				}
			},
		});
	};

	const useRemoveAccount = () => {
		return useMutation({
			mutationKey: ["removeAccount"],
			mutationFn: async (userId: string) => {
				await apiClient.delete(`/api/account/${userId}`);
			},
			onError: (e: AxiosError) => {
				toast.error("Failed to remove account: " + e?.response?.data);
			},
			onSuccess: () => {
				toast.success("Bruger slettet");
				deleteCookie("Bearer");
				deleteCookie("user");
				deleteCookie("isAuthenticated");
			},
		});
	};

	const useLogin = () => {
		return useMutation({
			mutationKey: ["login"],
			mutationFn: async (login_information: LoginType) => {
				const { data } = await apiClient.post<LoginSuccessDataType>("/api/account/login", login_information);
				return data;
			},
			onError: (e: AxiosError) => {
				if (e.message === "Network Error") {
					toast.error("Login failed: Network Error: connection to server not established");
				} else {
					toast.error("Login failed" + (e?.response?.data ? ": " + e.response.data : ""));
				}
			},
			onSuccess: () => {
				toast.success("You have been logged in");
			},
		});
	};

	const useLogout = () => {
		return useMutation({
			mutationKey: ["logout"],
			mutationFn: async () => {
				await apiClient.post("/api/account/logout");
			},
			onError: (e: AxiosError) => {
				toast.error("Logout failed: " + e?.response?.data);
			},
			onSuccess: () => {
				toast.success("You have been logged out");
			},
		});
	};

	return {
		useRegisterAccount,
		useRemoveAccount,
		useLogin,
		useLogout,
	};
};
