import EvenBoxLayout from "~/components/layout_components/EvenBoxLayout";
import PostCreation from "~/components/content_components/PostCreationComponents/PostCreation";
import PostCreationInfo from "~/components/content_components/PostCreationComponents/PostCreationInfo";

export default function CreatePostPage() {
	return (
        <EvenBoxLayout>
            <PostCreation/>
            <PostCreationInfo/>
        </EvenBoxLayout>
	);
}
