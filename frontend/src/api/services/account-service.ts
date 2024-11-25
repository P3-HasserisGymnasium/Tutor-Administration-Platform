import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { YearGroup, Language, Subject, TimeSlot } from "~/types/enums";

type AccountRegisterType = {
	// Requried
	full_name: string;
	email: string;
	password: string;

	//Optional stuff
	year_group?: YearGroup;
	languages?: Language[];
	tutoring_subjects?: Subject[];
	tutor_profile_description?: string;
	tutor_timeslots?: TimeSlot[];
};

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
