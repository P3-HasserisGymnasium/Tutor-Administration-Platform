import { ThemeProvider } from "@emotion/react";
import LongShortBoxLayout from "components/layout_components/LongShortBoxLayout";
import tuteeTheme from "~/themes/tuteeTheme";

export default function RequestAdminPage() {
    return (
        <ThemeProvider theme={tuteeTheme}>
            <LongShortBoxLayout>
                <div>Information input about the request</div>
                <div>Information view</div>
            </LongShortBoxLayout>
        </ThemeProvider>
    );
};
