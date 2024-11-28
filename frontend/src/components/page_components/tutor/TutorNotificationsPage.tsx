import { ThemeProvider } from "@mui/material";
import EvenBoxLayout from "components/layout_components/EvenBoxLayout";
import tutorTheme from "~/themes/tutorTheme";

export default function TutorNotificationsPage() {
    return (
        <ThemeProvider theme={tutorTheme}>
            <EvenBoxLayout>
                <div>All notifcations here. Use a component that the other notification page also can use</div>
            </EvenBoxLayout>
        </ThemeProvider>
    );
};
