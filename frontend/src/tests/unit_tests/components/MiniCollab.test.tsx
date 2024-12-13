import { afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import MiniCollab from "~/components/content_components/MiniCollab";
import { CollaborationState, Subject } from "~/types/data_types";
import { CollaborationType } from "~/types/entity_types";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import tutorTheme from "~/themes/tutorTheme";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={{ tutorTheme }}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
  </ThemeProvider>
);

const mockCollaboration: CollaborationType = {
  id: 1,
  tutorName: "John Doe",
  subject: Subject.Enum.Math,
  tuteeName: "Jane Doe",
  state: CollaborationState.Enum.ESTABLISHED,
  tutorId: 1,
  tuteeId: 2,
  startDate: "2021-10-10",
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
