import { afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/api/api-client";
import { AuthProvider } from "~/api/authentication/AuthProvider";
import tutorTheme from "~/themes/tutorTheme";
import Forbidden from "~/api/authentication/Forbidden";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider theme={tutorTheme}>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
			</QueryClientProvider>
		</AuthProvider>
	</ThemeProvider>
);

describe("Forbidden", () => {
	afterEach(() => {
		cleanup();
	});
	it("should be rendered", () => {
		render(
			<Wrapper>
				<Forbidden />
			</Wrapper>
		);
		expect(screen.getByText("You do not have permission to view this page")).toBeInTheDocument();
	});
	it("should have a link to go back", () => {
		render(
			<Wrapper>
				<Forbidden />
			</Wrapper>
		);
		expect(screen.getByText("Go back")).toBeInTheDocument();
	});
});
