// @ts-nocheck

import { vi, describe, it, expect, afterEach, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/api/api-client";
import tutorTheme from "~/themes/tutorTheme";
import { AuthProvider } from "~/api/authentication/AuthProvider";
import Register from "~/components/login_and_register_components/Register";
import { Language, Role } from "~/types/data_types";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider theme={tutorTheme}>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
			</QueryClientProvider>
		</AuthProvider>
	</ThemeProvider>
);

beforeEach(() => {
	vi.doMock("@mui/material/styles", () => ({
		useTheme: () => tutorTheme,
		ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
	}));
	vi.doMock("~/api/authentication/useAuth", () => ({
		useAuth: () => ({
			userState: { id: 1, roles: [Role.Enum.Tutor] },
		}),
	}));
	vi.doMock("react-hook-form", () => ({
		useForm: () => ({
			control: {},
			handleSubmit: (fn: unknown) => fn,
			getValues: (field: string) => {
				if (field === "subjects") return ["Math"];
				if (field === "languages") return [Language.Enum.English];
				return [];
			},
		}),
		useWatch: () => {},
		FormProvider: ({ children }: { children: React.ReactNode }) => children,
	}));
	vi.doMock("@hookform/resolvers/zod", () => ({
		zodResolver: () => {},
	}));
});

describe("Register", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the RegisterInformationPage component", () => {
		render(
			<Wrapper>
				<Register />
			</Wrapper>
		);
		expect(screen.getByText("Becoming a student")).toBeInTheDocument();
	});
	it("should navigate to TutorTimeAvailabilityPage", () => {
		const mockUseState = vi.spyOn(React, "useState");
		mockUseState.mockImplementation((initialValue: "primaryRegister" | "tutorTimeAvailability" | "tutorApplication") => {
			if (initialValue === "primaryRegister") return ["tutorTimeAvailability", vi.fn()];
			return [initialValue, vi.fn()];
		});
		render(
			<Wrapper>
				<Register />
			</Wrapper>
		);
		expect(screen.getByText("Time Availability")).toBeInTheDocument();
		mockUseState.mockRestore();
	});

	it("should navigate to TutorApplicationPage", () => {
		const mockUseState = vi.spyOn(React, "useState");
		mockUseState.mockImplementation((initialValue: "primaryRegister" | "tutorTimeAvailability" | "tutorApplication") => {
			if (initialValue === "primaryRegister") return ["tutorApplication", vi.fn()];
			return [initialValue, vi.fn()];
		});
		render(
			<Wrapper>
				<Register />
			</Wrapper>
		);
		expect(screen.getByTestId("tutor_application_page")).toBeInTheDocument();
	});
});
