import ShortLongBoxLayout from "components/layout_components/ShortLongBoxLayout";
import Filter from "components/content_components/TutorListComponents/Filter";
import TutorList from "components/content_components/TutorListComponents/TutorList";
import { ThemeProvider } from "@mui/material";
import tuteeTheme from "~/themes/tuteeTheme";

export default function TutorListPage() {
    return (
        <ThemeProvider theme={tuteeTheme}>
            <ShortLongBoxLayout>
                <Filter/>
                <TutorList/>
            </ShortLongBoxLayout>
        </ThemeProvider>
    );
};
