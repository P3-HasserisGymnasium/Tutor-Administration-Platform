import { afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { PostType } from "~/types/entity_types";
import { Subject } from "~/types/data_types";
import { BrowserRouter } from "react-router-dom";
import MiniPost from "~/components/content_components/MiniPost";
import { ThemeProvider } from "@mui/material";
import tuteeTheme from "~/themes/tuteeTheme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/api/api-client";
import { AuthProvider } from "~/api/authentication/AuthProvider";
import tutorTheme from "~/themes/tutorTheme";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={tutorTheme}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
);

const mockPost: PostType = {
  id: 1,
  title: "Sample Post",
  description: "This is a sample post description.",
  subject: Subject.Enum.Math,
  duration: [2, 4],
  state: "VISIBLE",
};

beforeEach(() => {
  vi.doMock("@mui/material/styles", () => ({
    useTheme: () => tutorTheme,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  }));
  vi.doMock("~/api/authentication/useAuth", () => ({
    useAuth: () => ({
      userState: { id: 1 },
    }),
  }));
  vi.mock("~/api/services/post-service", () => ({
    usePostService: () => ({
      useEditPost: vi.fn(),
    }),
  }));
});

describe("MiniPost", () => {
  afterEach(() => {
    cleanup();
  });
  it("should be rendered", () => {
    render(
      <Wrapper>
        <MiniPost postData={mockPost} />
      </Wrapper>
    );
    expect(screen.getByTestId("posttitle")).toBeInTheDocument();
  });

  it("should render the post title", () => {
    render(
      <Wrapper>
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
    expect(screen.getByTestId("subjectchip")).toHaveTextContent("Math");
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
