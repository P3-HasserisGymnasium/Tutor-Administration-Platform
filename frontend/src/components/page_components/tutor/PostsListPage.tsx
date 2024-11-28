import ShortLongBoxLayout from "components/layout_components/ShortLongBoxLayout";
import { ThemeProvider } from "@mui/material";
import tutorTheme from "~/themes/tutorTheme";

export default function PostsListPage() {
    return (
        <ThemeProvider theme={tutorTheme}>
            <ShortLongBoxLayout>
                <div>Put filters here</div>
                <div>Put posts here</div>
            </ShortLongBoxLayout>
        </ThemeProvider>
    );
};
