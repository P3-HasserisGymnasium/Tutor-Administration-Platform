import { cleanup, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SetSubject from "~/components/content_components/SetSubject";
import { Subject } from "~/types/data_types";
describe("SetSubject", () => {
  beforeEach(() => {
    vi.mock("react-hook-form", () => ({
      useFormContext: () => ({
        getValues: () => [Subject.Enum.Math, Subject.Enum.English, Subject.Enum.Ss, Subject.Enum.Econ],
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
    render(<SetSubject variant="create" />);

    expect(screen.getByTestId("setsubjectcontainer")).toBeInTheDocument();
  });

  it("should render the SetSubject component with 'X' subjects", () => {
    render(<SetSubject variant="edit" />);

    expect(screen.getByTestId("setsubjectcontainer")).toBeInTheDocument();
    const removalXs = screen.getAllByTestId("removesubjectx");
    expect(removalXs).toHaveLength(4);
  });
});
