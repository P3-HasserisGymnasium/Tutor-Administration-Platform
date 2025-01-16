import React from "react";
import PrimaryRegisterPage from "./RegisterInformationPage";
import { AccountRegisterType, zodAccountRegisterSchema } from "~/types/entity_types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import TutorTimeAvailabilityPage from "./RegisterTimeAvailabilityPage";
import TutorApplicationPage from "./RegisterApplicationPage";
import { Language, Role, YearGroup } from "~/types/data_types";

export default function Register() {
	const [page, setPage] = React.useState<"primaryRegister" | "tutorTimeAvailability" | "tutorApplication">("primaryRegister");

	const registerFormMethods = useForm<AccountRegisterType>({
		resolver: zodResolver(zodAccountRegisterSchema),
		defaultValues: {
			subjects: [],
			time_availability: [],
			tutor_profile_description: "",
			year_group: YearGroup.Enum.PRE_IB,
			languages: [Language.Enum.English],
			roles: [Role.Enum.Tutor],
		},
	});

	useWatch({ control: registerFormMethods.control });

	return (
		<FormProvider {...registerFormMethods}>
			{page === "primaryRegister" && <PrimaryRegisterPage setPage={setPage} />}
			{page === "tutorTimeAvailability" && <TutorTimeAvailabilityPage setPage={setPage} />}
			{page === "tutorApplication" && <TutorApplicationPage setPage={setPage} />}
		</FormProvider>
	);
}
