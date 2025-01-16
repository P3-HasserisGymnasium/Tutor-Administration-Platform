import { describe, it, expect } from "vitest";
import { apiClient } from "~/api/api-client";
import { Language, Role, Subject, YearGroup } from "~/types/data_types";
import { AccountRegisterType } from "~/types/entity_types";
import { faker } from "@faker-js/faker";

describe("API Account Service Integration Tests", () => {
	const email = faker.internet.email();
	const password = faker.internet.password();
	it("register an account", async () => {
		const accountData: AccountRegisterType = {
			full_name: "Joqdqwdhn Doe",
			email: email,
			password: password,
			confirm_password: password,
			year_group: YearGroup.Enum.IB_1,
			roles: [Role.Enum.Tutor],
			languages: [Language.Enum.English],
			subjects: [Subject.Enum.Math, Subject.Enum.Physics],
			tutor_profile_description: "Experienced tutor in Math and Physics.",
			time_availability: [
				{
					day: "Monday",
					time: [
						{
							start_time: "10:00",
							end_time: "12:00",
						},
					],
				},
				{
					day: "Wednesday",
					time: [
						{
							start_time: "14:00",
							end_time: "16:00",
						},
					],
				},
			],
		};

		const response = await apiClient.post("/api/account/", accountData);

		expect(response.status).toBe(201);
	});

	it("Log in with account", async () => {
		const loginData = {
			email: email,
			password: password,
		};

		const response = await apiClient.post("/api/account/login", loginData);

		expect(response.status).toBe(200);
	});
});
