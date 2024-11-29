import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import { ThemeProvider } from "@mui/material";
import tutorTheme from "~/themes/tutorTheme";

export default function TutorPage() {
    return (
        <ThemeProvider theme={tutorTheme}>
            <MediumShortOnShortBoxLayout>
                <div>Put calendar / Meeting overview here</div>
                <div>Put list of posts here</div>
                <div>Put active collaborations here</div>
            </MediumShortOnShortBoxLayout>
        </ThemeProvider>
    );
};
