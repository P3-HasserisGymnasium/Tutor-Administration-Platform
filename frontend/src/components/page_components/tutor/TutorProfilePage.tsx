import LongShortBoxLayout from "components/layout_components/LongShortBoxLayout";
import { ThemeProvider } from "@mui/material";
import tutorTheme from "~/themes/tutorTheme";


export default function TutorProfilePage() {
    return (
        <ThemeProvider theme={tutorTheme}>
            <LongShortBoxLayout>
                <div>Preview and edit</div>
                <div>History</div>
            </LongShortBoxLayout>
        </ThemeProvider>
    );
};
