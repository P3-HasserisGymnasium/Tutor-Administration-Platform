import ShortLongBoxLayout from "components/layout_components/ShortLongBoxLayout";
import Filter from "components/content_components/TutorListComponents/Filter";
import TutorList from "components/content_components/TutorListComponents/TutorList";

export default function TutorListPage() {
    return (
        <ShortLongBoxLayout>
            <Filter/>
            <TutorList/>
        </ShortLongBoxLayout>
    );
};
