import { afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import MiniCollab from "~/components/content_components/MiniCollab";
import { CollaborationState, Subject } from "~/types/data_types";
import { CollaborationType } from "~/types/entity_types";
import { BrowserRouter } from "react-router-dom";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
);

const mockCollaboration: CollaborationType = {
	id: 1,
	tutor_name: "John Doe",
	subject: Subject.Enum.MATH,
	tutee_name: "Jane Doe",
	state: CollaborationState.enum.ACCEPTED,
	tutor_id: 1,
	tutee_id: 2,
	start_date: "2021-10-10",
	end_date: "2021-10-10",
};

describe("MiniCollab", () => {
	afterEach(() => {
		cleanup();
	});

	it("should be rendered", () => {
		render(
			<Wrapper>
				<MiniCollab collaboration={mockCollaboration} />
			</Wrapper>
		);
		expect(screen.getByTestId("collabwithname")).toBeInTheDocument();
	});

	it("should render the tutor's name", () => {
		render(
			<Wrapper>
				<MiniCollab collaboration={mockCollaboration} />
			</Wrapper>
		);
		expect(screen.getByTestId("collabwithname")).toBeInTheDocument();
		expect(screen.getByTestId("collabwithname")).toHaveTextContent("Collaboration with John Doe");
	});

	it("should render the subject icon", () => {
		render(
			<Wrapper>
				<MiniCollab collaboration={mockCollaboration} />
			</Wrapper>
		);
		expect(screen.getByTestId("subjecticon")).toBeInTheDocument();
	});
});