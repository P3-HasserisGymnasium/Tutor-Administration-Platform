import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import { ThemeProvider } from "@mui/material";
import tuteeTheme from "~/themes/tuteeTheme";

export default function TuteePage() {
    return (
        <ThemeProvider theme={tuteeTheme}>
            <MediumShortOnShortBoxLayout>
                <div>Put calendar / Meeting overview here</div>
                <div>Put your active posts here</div>
                <div>Put active collaborations here</div>
            </MediumShortOnShortBoxLayout>
        </ThemeProvider>
    );
};
