import { vi, describe, it, expect, afterEach, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PostList from "~/components/content_components/PostListComponents/PostList";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/api/api-client";
import tutorTheme from "~/themes/tutorTheme";
import { AuthProvider } from "~/api/authentication/AuthProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={tutorTheme}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
);

beforeEach(() => {
  vi.doMock("@mui/material/styles", () => ({
    useTheme: () => tutorTheme,
    ThemeProvider: ({ children }) => children,
  }));
  vi.doMock("~/api/authentication/useAuth", () => ({
    useAuth: () => ({
      userState: { id: 1 },
    }),
  }));
  vi.mock("~/api/services/post-service", () => ({
    usePostService: () => ({
      useGetPosts: (filters: any) => {
        const data = [
          {
            id: 1,
            title: "Test Post",
            description: "This is a test post",
            subject: "Math",
            duration: 2,
          },
        ];
        return {
          data: data,
          isError: false,
        };
      },
    }),
  }));
});

describe("PostList", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the PostList component", () => {
    render(
      <Wrapper>
        <PostList loading={false} filters={{ subjects: [], duration: [0, 12] }} />
      </Wrapper>
    );
    expect(screen.getByText("Filtered Posts")).toBeInTheDocument();
  });

  it("should render the PostCard component", () => {
    render(
      <Wrapper>
        <PostList loading={false} filters={{ subjects: [], duration: [0, 12] }} />
      </Wrapper>
    );
    expect(screen.getByTestId("postcard1")).toBeInTheDocument();
  });
});
