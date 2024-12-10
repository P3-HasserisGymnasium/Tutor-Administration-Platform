import { ThemeProvider, useTheme } from "@emotion/react";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PostList from "~/components/content_components/PostListComponents/PostList";
import tutorTheme from "~/themes/tutorTheme";
import { Theme } from "@mui/material/styles";
import { vi } from "vitest";

const Wrapper = ({ children, theme }: { children: React.ReactNode; theme: Theme }) => (
	<ThemeProvider theme={theme}>
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
	</ThemeProvider>
);

beforeEach(() => {
	vi.mock("@mui/system", () => ({
		useTheme: () => tutorTheme,
	}));
});

describe("PostList", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the PostList component", () => {
		render(
			<ThemeProvider theme={tutorTheme}>
				<PostList />
			</ThemeProvider>
		);
		expect(screen.getByText("Filtered Posts")).toBeInTheDocument();
	});

	it("should render the PostCard component", () => {
		render(
			<Wrapper theme={tutorTheme}>
				<PostList />
			</Wrapper>
		);
		expect(screen.getByTestId("postcard1")).toBeInTheDocument();
	});
});
