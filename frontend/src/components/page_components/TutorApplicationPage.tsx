import {ThemeProvider} from "@mui/material"
import LongShortBoxLayout from "components/layout_components/LongShortBoxLayout";
import { useCurrentTheme } from "~/utilities/helperFunctions";
import TutorApplication from "components/content_components/TutorApplicationComponents/TutorApplication";
import InformationBox from "../content_components/TutorApplicationComponents/InformationBox";

export default function TutorApplicationPage() {
    return (
        <ThemeProvider theme={useCurrentTheme()}>
            <LongShortBoxLayout>
                <TutorApplication/>
                <InformationBox/>
            </LongShortBoxLayout>
        </ThemeProvider>
    );
}