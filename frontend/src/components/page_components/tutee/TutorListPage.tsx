import ShortLongBoxLayout from "components/layout_components/ShortLongBoxLayout";
import TutorListFilter from "components/content_components/TutorListComponents/Filter";
import TutorList from "components/content_components/TutorListComponents/TutorList";
import { useState } from "react";
import { tutorListFilterType } from "~/types/data_types";

export default function TutorListPage() {

    const [filters, setFilters] = useState<tutorListFilterType>({ subjects: [], time_availability: [], year_group: [], languages: [] });
    const [loading, setLoading] = useState(false);

    return (
            <ShortLongBoxLayout>
                <TutorListFilter setFilters={setFilters} setLoading={setLoading}/>
                <TutorList filters={filters} filterLoading={loading}/>
            </ShortLongBoxLayout>
    );
};
