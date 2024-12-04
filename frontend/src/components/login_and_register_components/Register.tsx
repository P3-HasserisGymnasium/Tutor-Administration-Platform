import { useState } from "react";
import PrimaryRegisterPage from "./RegisterInformationPage";
import { AccountRegisterType, zodAccountRegisterSchema } from "~/types/entity_types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import TutorTimeAvailabilityPage from "./RegisterTimeAvailabilityPage";
import TutorApplicationPage from "./RegisterApplicationPage";

export default function RegisterPageHandler() {
	const [page, setPage] = useState<"primaryRegister" | "tutorTimeAvailability" | "tutorApplication">(
		"primaryRegister"
	);

	const registerFormMethods = useForm<AccountRegisterType>({
		resolver: zodResolver(zodAccountRegisterSchema),
		defaultValues: {
			subjects: [],
			time_availability: [],
			tutorProfileDescription: "",
		},
	});

	return (
		<FormProvider {...registerFormMethods}>
			{page === "primaryRegister" && <PrimaryRegisterPage setPage={setPage} />}
			{page === "tutorTimeAvailability" && <TutorTimeAvailabilityPage setPage={setPage} />}
			{page === "tutorApplication" && <TutorApplicationPage setPage={setPage} />}
		</FormProvider>
	);
}
