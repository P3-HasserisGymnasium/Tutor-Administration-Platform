import { afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { PostType } from "~/types/entity_types";
import { Subject } from "~/types/data_types";
import { BrowserRouter } from "react-router-dom";
import MiniPost from "~/components/content_components/MiniPost";
import { Theme, ThemeProvider } from "@mui/material";
import tuteeTheme from "~/themes/tuteeTheme";

const Wrapper = ({ children, theme }: { children: React.ReactNode; theme: Theme }) => (
	<ThemeProvider theme={theme}>
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
	</ThemeProvider>
);

const mockPost: PostType = {
	id: 1,
	title: "Sample Post",
	description: "This is a sample post description.",
	subject: Subject.Enum.MATH,
	duration: [2, 4],
	state: "VISIBLE",
};

describe("MiniPost", () => {
	afterEach(() => {
		cleanup();
	});
	it("should be rendered", () => {
		render(
			<Wrapper theme={tuteeTheme}>
				<MiniPost postData={mockPost} />
			</Wrapper>
		);
		expect(screen.getByTestId("posttitle")).toBeInTheDocument();
	});

	it("should render the post title", () => {
		render(
			<Wrapper theme={tuteeTheme}>
				<MiniPost postData={mockPost} />
			</Wrapper>
		);

		expect(screen.getByTestId("posttitle")).toBeInTheDocument();
		expect(screen.getByTestId("posttitle")).toHaveTextContent("Sample Post");
	});

	it("should render the subject chip", () => {
		render(
			<Wrapper theme={tuteeTheme}>
				<MiniPost postData={mockPost} />
			</Wrapper>
		);

		expect(screen.getByTestId("subjectchip")).toBeInTheDocument();
		expect(screen.getByTestId("subjectchip")).toHaveTextContent("MATH");
	});

	/*   it("should open the editPostDialog component", () => {
    render(
      <ThemeProvider theme={tuteeTheme}>
        <BrowserRouter>
          <MiniPost postData={mockPost} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const postContainer = screen.getByTestId("minipostcontainer");
    fireEvent.click(postContainer);
    expect(screen.getByTestId("editpostdialog")).toBeInTheDocument();
  }); */
});