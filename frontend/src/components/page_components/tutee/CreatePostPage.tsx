import { ThemeProvider } from "@mui/material";
import LongShortBoxLayout from "components/layout_components/LongShortBoxLayout";
import tuteeTheme from "~/themes/tuteeTheme";

export default function CreatePostPage() {
    return (
        <ThemeProvider theme={tuteeTheme}>
            <LongShortBoxLayout>
                <div>Put input fields and stuff for the post creation here</div>
                <div>Put information here</div>
            </LongShortBoxLayout>
        </ThemeProvider>
    );
};
