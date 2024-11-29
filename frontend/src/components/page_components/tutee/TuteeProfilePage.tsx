import LongShortBoxLayout from "components/layout_components/LongShortBoxLayout";
import { ThemeProvider } from "@mui/material";
import tuteeTheme from "~/themes/tuteeTheme";

export default function TuteeProfilePage() {
    return (
        <ThemeProvider theme={tuteeTheme}>
            <LongShortBoxLayout>
                <div>Preview and edit</div>
                <div>History</div>
            </LongShortBoxLayout>
        </ThemeProvider>
    );
};
