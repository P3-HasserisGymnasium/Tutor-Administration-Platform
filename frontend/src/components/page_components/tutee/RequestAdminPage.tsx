import LongShortBoxLayout from "components/layout_components/LongShortBoxLayout";
import InformationBox from "~/components/content_components/RequestAdminComponents/InformationBox";
import RequestAdmin from "~/components/content_components/RequestAdminComponents/RequestAdmin";

export default function RequestAdminPage() {
    return (
        <LongShortBoxLayout>
            <RequestAdmin/>
            <InformationBox/>
        </LongShortBoxLayout>
    );
};
