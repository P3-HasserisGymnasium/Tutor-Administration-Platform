import { vi, describe, it, expect, afterEach, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TutorList from "~/components/content_components/TutorListComponents/TutorList";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/api/api-client";
import tutorTheme from "~/themes/tutorTheme";
import { AuthProvider } from "~/api/authentication/AuthProvider";
import TutorListPage from "~/components/page_components/tutee/TutorListPage";
import { Language, Subject, YearGroup } from "~/types/data_types";

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
			userState: { id: 1, tutoring_subjects: ["Math"] },
		}),
	}));
	vi.mock("~/api/services/tutor-service", () => ({
		useTutorService: () => ({
			useGetTutors: () => {
				const data = [
					{
						id: 1,
						name: "Test Tutor",
						subjects: ["Math"],
						experience: 5,
					},
				];
				return {
					data: data,
					isError: false,
				};
			},
		}),
	}));
	vi.mock("~/api/services/role-service", () => ({
		useRoleService: () => ({
			useGetTutors: () => {
				const data = [
					{
						id: "1",
						full_name: "Test Tutor",
						year_group: YearGroup.Enum.IB_1,
						languages: [Language.Enum.Danish],
						tutoring_subjects: [Subject.Enum.German],
						contact_info: [{ username: "test_tutor", communication_medium: "Discord" }],
						time_availability: [{ day: "Monday", start_time: "09:00", end_time: "17:00" }],
						description: "Experienced Math tutor",
					},
				];
				return {
					data: data,
					isPending: false,
					isError: false,
				};
			},
		}),
	}));
	vi.doMock("react-hook-form", () => ({
		useForm: () => ({
			control: {},
			handleSubmit: (fn: unknown) => fn,
			getValues: (field: string) => {
				if (field === "subjects") return ["Math"];
				if (field === "experience") return [0, 10];
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

describe("TutorListPage", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the TutorList component", () => {
		render(
			<Wrapper>
				<TutorListPage />
			</Wrapper>
		);
		expect(screen.getByText("List of Tutors")).toBeInTheDocument();
	});

	it("should render the TutorFilter component", () => {
		render(
			<Wrapper>
				<TutorListPage />
			</Wrapper>
		);
		expect(screen.getByText("Language")).toBeInTheDocument();
	});

	it("should render the TutorCard component", () => {
		render(
			<Wrapper>
				<TutorList filterLoading={false} filters={{ subjects: [], languages: ["Danish"], time_availability: [], year_group: [] }} />
			</Wrapper>
		);
		expect(screen.getByText("Request collaboration")).toBeInTheDocument();
	});
});
