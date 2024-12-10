import { afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import PostCreation from "~/components/content_components/PostCreationComponents/PostCreation";
import { ThemeProvider } from "@mui/material";
import tuteeTheme from "~/themes/tuteeTheme";
import { BrowserRouter } from "react-router-dom";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider theme={tuteeTheme}>
		<BrowserRouter>{children}</BrowserRouter>
	</ThemeProvider>
);

describe("PostCreation", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the PostCreation component", () => {
		render(
			<Wrapper>
				<PostCreation />
			</Wrapper>
		);
		expect(screen.getByText("Your Post")).toBeInTheDocument();
	});

	it("should render the title input field", () => {
		render(
			<Wrapper>
				<PostCreation />
			</Wrapper>
		);
		expect(screen.getByPlaceholderText("Insert title")).toBeInTheDocument();
	});

	it("should render the description input field", () => {
		render(
			<Wrapper>
				<PostCreation />
			</Wrapper>
		);
		expect(screen.getByPlaceholderText("Which topics do you need help with?")).toBeInTheDocument();
	});

	it("should render the 'Create post' button", () => {
		render(
			<Wrapper>
				<PostCreation />
			</Wrapper>
		);
		expect(screen.getByText("Create post")).toBeInTheDocument();
	});

	it("should disable the 'Create post' button if title and subject are not filled", () => {
		render(
			<Wrapper>
				<PostCreation />
			</Wrapper>
		);
		expect(screen.getByText("Create post")).toBeDisabled();
	});
});
