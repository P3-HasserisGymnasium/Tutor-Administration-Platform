// @ts-nocheck
import React from "react";
import { vi, describe, it, expect, afterEach, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TuteePage from "~/components/page_components/tutee/TuteePage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/api/api-client";
import tutorTheme from "~/themes/tutorTheme";
import { AuthProvider } from "~/api/authentication/AuthProvider";
import { MeetingState } from "~/types/data_types";

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
	vi.doMock("react", () => {
		const actualReact = jest.requireActual("react");
		return {
			...actualReact,
			useState: (initialValue: unknown) => [true, actualReact.useState(initialValue)[1]],
		};
	});
	vi.doMock("react-router-dom", async () => {
		return {
			useNavigate: () => vi.fn(),
			useLocation: () => ({
				pathname: "/tutee",
			}),
		};
	});
	vi.mock("~/api/services/tutee-service", () => ({
		useTuteeService: () => ({
			useGetTutees: () => {
				const data = [
					{
						id: 1,
						name: "Test Tutee",
						subject: "Math",
						duration: 2,
					},
				];
				return {
					data: data,
					isError: false,
				};
			},
		}),
	}));
	vi.mock("~/api/services/meeting-service", () => ({
		useMeetingService: () => ({
			useGetMeetings: () => ({
				data: [
					{
						id: 1,
						collaboration: 1,
						start_date: "2023-01-01T10:00:00Z",
						end_date: "2023-01-01T11:00:00Z",
						meeting_state: MeetingState.Enum.ACCEPTED,
						rejection_reason: undefined,
						meeting_description: "This is a test meeting",
						tutee_user_id: 1,
						tutor_user_id: 2,
						tutee_name: "Test Tutee",
						tutor_name: "Test Tutor",
					},
				],
			}),
		}),
	}));
	vi.doMock("react-hook-form", () => ({
		useForm: () => ({
			control: {},
			handleSubmit: (fn: unknown) => fn,
			getValues: (field: string) => {
				if (field === "subjects") return ["Math"];
				if (field === "duration") return [0, 12];
				return [];
			},
		}),
		useWatch: () => { },
		FormProvider: ({ children }: { children: React.ReactNode }) => children,
	}));
	vi.doMock("@hookform/resolvers/zod", () => ({
		zodResolver: () => { },
	}));
});

describe("TuteePage", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the TuteePage component", () => {
		render(
			<Wrapper>
				<TuteePage />
			</Wrapper>
		);
		expect(screen.getByText("Show Calendar")).toBeInTheDocument();
	});

	it("should render the CreateCollaborationDialog", () => {
		const mockUseState = vi.spyOn(React, "useState");
		mockUseState.mockImplementation((initialValue: boolean) => {
			if (initialValue === false) return [true, vi.fn()]; // Force dialogs to be open
			return [initialValue, vi.fn()];
		});

		render(
			<Wrapper>
				<TuteePage />
			</Wrapper>
		);
		expect(screen.getByText("View tutor list")).toBeInTheDocument();
		mockUseState.mockRestore();
	});

	it("should render the ViewCollaborationsDialog", () => {
		const mockUseState = vi.spyOn(React, "useState");
		mockUseState.mockImplementation((initialValue: boolean) => {
			if (initialValue === false) return [true, vi.fn()]; // Force dialogs to be open
			return [initialValue, vi.fn()];
		});
		render(
			<Wrapper>
				<TuteePage />
			</Wrapper>
		);
		expect(screen.getByText("Click on a collaboration to go the respective collaboration page")).toBeInTheDocument();
		mockUseState.mockRestore();
	});

	it("should render the EditPostDialog", () => {
		const mockUseState = vi.spyOn(React, "useState");
		mockUseState.mockImplementation((initialValue: boolean) => {
			if (initialValue === false) return [true, vi.fn()]; // Force dialogs to be open
			return [initialValue, vi.fn()];
		});
		render(
			<Wrapper>
				<TuteePage />
			</Wrapper>
		);
		expect(screen.getByText("Describe your request")).toBeInTheDocument();
		mockUseState.mockRestore();
	});

	it("should render the ViewPostsDialog", () => {
		const mockUseState = vi.spyOn(React, "useState");
		mockUseState.mockImplementation((initialValue: boolean) => {
			if (initialValue === false) return [true, vi.fn()]; // Force dialogs to be open
			return [initialValue, vi.fn()];
		});
		render(
			<Wrapper>
				<TuteePage />
			</Wrapper>
		);
		expect(screen.getByText("Click on a post to edit it")).toBeInTheDocument();
		mockUseState.mockRestore();
	});

	it("should render the Calender component", () => {
		render(
			<Wrapper>
				<TuteePage />
			</Wrapper>
		);
		expect(screen.getByText("today")).toBeInTheDocument();
	});

	it("should render the MiniPostList component", () => {
		render(
			<Wrapper>
				<TuteePage />
			</Wrapper>
		);
		expect(screen.getByText("No posts found.")).toBeInTheDocument();
	});
	it("should render the Calender component", () => {
		/* const mockUseState = vi.spyOn(React, "useState");
		mockUseState.mockImplementation((initialValue: "list" | "calender") => {
			if (initialValue === "calender") return ["list", vi.fn()];
			return [initialValue, vi.fn()];
		}); */

		render(
			<Wrapper>
				<TuteePage />
			</Wrapper>
		);
		expect(screen.getByTestId("mini-calendar")).toBeInTheDocument();
	});
});
