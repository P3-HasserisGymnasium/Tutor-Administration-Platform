import LongShortBoxLayout from "components/layout_components/LongShortBoxLayout";
import TutorApplication from "components/content_components/TutorApplicationComponents/TutorApplication";
import InformationBox from "../content_components/TutorApplicationComponents/InformationBox";

export default function TutorApplicationPage() {
    return (
            <LongShortBoxLayout>
                <TutorApplication/>
                <InformationBox/>
            </LongShortBoxLayout>
    );
}