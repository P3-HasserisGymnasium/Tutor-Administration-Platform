import { afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { PostType } from "~/types/entity_types";
import { Subject } from "~/types/data_types";
import { BrowserRouter } from "react-router-dom";
import MiniPost from "~/components/content_components/MiniPost";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/api/api-client";
import { AuthProvider } from "~/api/authentication/AuthProvider";
import tutorTheme from "~/themes/tutorTheme";
import Forbidden from "~/api/authentication/Forbidden";
import Loading from "~/api/authentication/Loading";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider theme={tutorTheme}>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
			</QueryClientProvider>
		</AuthProvider>
	</ThemeProvider>
);

describe("Loading", () => {
	afterEach(() => {
		cleanup();
	});
	it("should be rendered", () => {
		render(
			<Wrapper>
				<Loading size={150} />
			</Wrapper>
		);
		expect(screen.getByTestId("loading")).toBeInTheDocument();
	});
});
