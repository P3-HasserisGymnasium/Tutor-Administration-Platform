import ShortLongBoxLayout from "components/layout_components/ShortLongBoxLayout";
import { ThemeProvider } from "@mui/material";
import tutorTheme from "~/themes/tutorTheme";
import PostFilter from "~/components/content_components/PostListComponents/PostFilter";
import PostList from "~/components/content_components/PostListComponents/PostList";
import { useState } from "react";
import { PostListFilterType } from "~/types/data_types";
import { useAuth } from "~/api/authentication/useAuth";


export default function PostsListPage() {
  const { userState } = useAuth();

  const [filters, setFilters] = useState<PostListFilterType>({ subjects: userState.tutoring_subjects?userState.tutoring_subjects:[], duration: [0, 12] });

  return (
    <ThemeProvider theme={tutorTheme}>
      <ShortLongBoxLayout>
        <PostFilter setFilters={setFilters}/>
        <PostList filters={filters}/>
      </ShortLongBoxLayout>

    
    </ThemeProvider>
  );
}
