import ShortLongBoxLayout from "components/layout_components/ShortLongBoxLayout";
import PostFilter from "~/components/content_components/PostListComponents/PostFilter";
import PostList from "~/components/content_components/PostListComponents/PostList";

export default function PostsListPage() {
    return (
            <ShortLongBoxLayout>
                <PostFilter/>
                <PostList/>
            </ShortLongBoxLayout>
    );
};
