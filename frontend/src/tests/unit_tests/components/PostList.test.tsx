import { cleanup, render, screen } from "@testing-library/react";
import PostList from "~/components/content_components/PostListComponents/PostList";

describe("PostList", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the PostList component", () => {
		render(<PostList />);
		expect(screen.getByText("Filtered Posts")).toBeInTheDocument();
	});
});
