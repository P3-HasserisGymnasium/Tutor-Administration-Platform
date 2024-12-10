import { cleanup, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SetSubject from "~/components/content_components/SetSubject";
import { Subject } from "~/types/data_types";
describe("SetSubject", () => {
  beforeEach(() => {
    vi.mock("react-hook-form", () => ({
      useFormContext: () => ({
        getValues: () => [Subject.Enum.MATH, Subject.Enum.ENGLISH, Subject.Enum.SS, Subject.Enum.ECON],
      }),
    }));

    vi.mock("@mui/material/styles", () => ({
      useTheme: () => ({
        customColors: {
          boxBorderColor: "black",
          collaborationBackgroundColor: "white",
        },
      }),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should render the SetSubject component", () => {
    render(<SetSubject />);

    expect(screen.getByTestId("setsubjectcontainer")).toBeInTheDocument();
  });

  it("should render the SetSubject component with 'X' subjects", () => {
    render(<SetSubject />);

    expect(screen.getByTestId("setsubjectcontainer")).toBeInTheDocument();
    const removalXs = screen.getAllByTestId("removesubjectx");
    expect(removalXs).toHaveLength(4);
  });
});
