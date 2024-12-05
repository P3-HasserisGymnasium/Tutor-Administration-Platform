import ShortLongBoxLayout from "components/layout_components/ShortLongBoxLayout";
import { ThemeProvider } from "@mui/material";
import tutorTheme from "~/themes/tutorTheme";
import PostFilter from "~/components/content_components/PostListComponents/PostFilter";
import PostList from "~/components/content_components/PostListComponents/PostList";

export default function PostsListPage() {
  return (
    <ThemeProvider theme={tutorTheme}>
      <ShortLongBoxLayout>
        <PostFilter />
        <PostList />
      </ShortLongBoxLayout>
    </ThemeProvider>
  );
}
