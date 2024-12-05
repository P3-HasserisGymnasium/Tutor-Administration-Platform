import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import HomePage from "components/page_components/HomePage";
import TutorPage from "components/page_components/tutor/TutorPage";
import TuteePage from "components/page_components/tutee/TuteePage";
import CreatePostPage from "components/page_components/tutee/CreatePostPage";
import TutorListPage from "components/page_components/tutee/TutorListPage";
import TuteeNotificationsPage from "components/page_components/tutee/TuteeNotificationsPage";
import TuteeProfilePage from "components/page_components/tutee/TuteeProfilePage";
import RequestAdminPage from "components/page_components/tutee/RequestAdminPage";
import PostsListPage from "components/page_components/tutor/PostsListPage";
import { useBreakpoints } from "./utilities/helperFunctions";
import TutorApplicationPage from "./components/page_components/TutorApplicationPage";
import Navbar from "./components/layout_components/navbar/Navbar";
import { Role } from "./types/data_types";
import NotFound from "./api/authentication/NotFound";
import Forbidden from "./api/authentication/Forbidden";
import { useAuth } from "./api/authentication/useAuth";

export default function AuthenticatedApp() {
  const { isMobile, hasScrollbar } = useBreakpoints();
  const widthRightOffset = hasScrollbar ? "16px" : "0px";

  const { userState, isAuthenticated } = useAuth();

  const isTutee = userState.role?.includes(Role.Enum.Tutee);
  const isTutor = userState.role?.includes(Role.Enum.Tutor);

  console.log("isAuthenticated is equal to: ", isAuthenticated);
  return (
    <Box
      sx={{
        height: isMobile ? "auto" : "100vh",
        width: isMobile ? `calc(100vw - ${widthRightOffset})` : "100vw",
      }}
    >
      <Navbar />
      <Box sx={{ height: "88vh", width: "100%" }}>
        <Routes>
          {/* Common routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<HomePage />} />

          {/* Tutee routes */}
          {isTutee ? (
            <>
              <Route path="/tutor/*" element={<Forbidden />} />
              <Route path="/tutee/*">
                <Route path="" element={<TuteePage />} />
                <Route path="profile" element={<TuteeProfilePage />} />
                <Route path="notifications" element={<TuteeNotificationsPage />} />
                <Route path="create-post" element={<CreatePostPage />} />
                <Route path="request-admin" element={<RequestAdminPage />} />
                <Route path="tutor-list" element={<TutorListPage />} />
                <Route path="tutor-application" element={<TutorApplicationPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </>
          ) : null}

          {/* Tutor routes */}
          {isTutor ? (
            <>
              <Route path="/tutee/*" element={<Forbidden />} />
              <Route path="/tutor/*">
                <Route path="" element={<TutorPage />} />
                <Route path="posts-list" element={<PostsListPage />} />
                <Route path="tutor-application" element={<TutorApplicationPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </>
          ) : null}

          {/* Catch-all for invalid roles */}
        </Routes>
      </Box>
    </Box>
  );
}
