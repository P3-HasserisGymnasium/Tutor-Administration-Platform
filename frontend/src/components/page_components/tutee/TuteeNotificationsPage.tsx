import { ThemeProvider } from "@mui/material";
import EvenBoxLayout from "components/layout_components/EvenBoxLayout";
import tuteeTheme from "~/themes/tuteeTheme";

export default function TuteeNotificationsPage() {
    return (
        <ThemeProvider theme={tuteeTheme}>
            <EvenBoxLayout>
                <div>All notifcations here. Use a component that the other notification page also can use</div>
            </EvenBoxLayout>
        </ThemeProvider>
    );
};
