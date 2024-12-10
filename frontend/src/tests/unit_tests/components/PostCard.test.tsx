import { afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import PostCard from "~/components/content_components/PostListComponents/PostCard";
import { ThemeProvider } from "@mui/material";
import tuteeTheme from "~/themes/tuteeTheme";
import { BrowserRouter } from "react-router-dom";
import { PostType } from "~/types/entity_types";
import { Subject } from "~/types/data_types";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider theme={tuteeTheme}>
		<BrowserRouter>{children}</BrowserRouter>
	</ThemeProvider>
);

const mockPost: PostType = {
	title: "Sample Post",
	subject: Subject.Enum.MATH,
	duration: [1, 2],
	description: "This is a sample post description.",
};

describe("PostCard", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the PostCard component", () => {
		render(
			<Wrapper>
				<PostCard post={mockPost} />
			</Wrapper>
		);
		expect(screen.getByText("Sample Post")).toBeInTheDocument();
	});

	it("should render the subject chip", () => {
		render(
			<Wrapper>
				<PostCard post={mockPost} />
			</Wrapper>
		);
		expect(screen.getByText("Math")).toBeInTheDocument();
	});

	it("should render the duration", () => {
		render(
			<Wrapper>
				<PostCard post={mockPost} />
			</Wrapper>
		);
		expect(screen.getByText("Duration: 6 months")).toBeInTheDocument();
	});

	it("should render the description", () => {
		render(
			<Wrapper>
				<PostCard post={mockPost} />
			</Wrapper>
		);
		expect(screen.getByText("This is a sample post description.")).toBeInTheDocument();
	});

	it("should render the 'Request Collaboration' button", () => {
		render(
			<Wrapper>
				<PostCard post={mockPost} />
			</Wrapper>
		);
		expect(screen.getByText("Request Collaboration")).toBeInTheDocument();
	});
});
