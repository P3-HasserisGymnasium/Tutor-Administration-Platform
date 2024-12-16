import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import HomePage from "components/page_components/HomePage";
import TutorPage from "components/page_components/tutor/TutorPage";
import CreatePostPage from "components/page_components/tutee/CreatePostPage";
import TutorListPage from "components/page_components/tutee/TutorListPage";
import TuteeProfilePage from "./components/page_components/tutee/TuteeProfilePage";
import TutorProfilePage from "./components/page_components/tutor/TutorProfilePage";
import RequestAdminPage from "components/page_components/tutee/RequestAdminPage";
import PostsListPage from "components/page_components/tutor/PostsListPage";
import { useBreakpoints, useRolePrefix } from "./utilities/helperFunctions";
import TutorApplicationPage from "./components/page_components/TutorApplicationPage";
import Navbar from "./components/layout_components/navbar/Navbar";
import { Role } from "./types/data_types";
import NotFound from "./api/authentication/NotFound";
import Forbidden from "./api/authentication/Forbidden";
import { useAuth } from "./api/authentication/useAuth";
import CollaborationPage from "./components/page_components/CollaborationPage";
import TuteePage from "./components/page_components/tutee/TuteePage";
import NotificationsList from "./components/content_components/NotificationsListe";
import AdministratorPage from "./components/page_components/admin/AdministratorPage";

export default function AuthenticatedApp() {
	const { isMobile, hasScrollbar } = useBreakpoints();
	const widthRightOffset = hasScrollbar ? "16px" : "0px";

	const { userState } = useAuth();

	const isTutee = userState.role?.includes(Role.Enum.Tutee);
	const isTutor = userState.role?.includes(Role.Enum.Tutor);
	const isAdmin = userState.is_administrator;
	const rolePrefix = useRolePrefix();
	console.log("userState", userState);
	console.log("rolePrefix", rolePrefix);
	console.log("isTutee", isTutee);
	console.log("isTutor", isTutor);
	console.log("isAdmin", isAdmin);
	return (
		<Box
			sx={{
				height: isMobile ? "auto" : "100vh",
				width: isMobile ? `calc(100vw - ${widthRightOffset})` : "100vw",
			}}
		>
			<Navbar />
			<Box sx={{ height: "calc(100% - 5em)", width: "100%" }}>
				<Routes>
					{/* Common routes */}
					<Route path="/login" element={<HomePage />} />
					<Route path="/notifications" element={<NotificationsList />} />
					<Route
						path="/"
						element={
							(isAdmin && <Navigate to="/admin" />) ||
							(isTutee && isTutor && <HomePage />) ||
							(isTutee && !isTutor && <Navigate to="/tutee" />) ||
							(!isTutee && isTutor && <Navigate to="/tutor" />)
						}
					/>

					{/* Admin routes */}
					{isAdmin ? <Route path="/admin/*" element={<AdministratorPage />} /> : <Route path="/admin/*" element={<Forbidden />} />}

					{/* Tutee routes */}
					{isTutee ? (
						<>
							<Route path="/tutor/*" element={<Forbidden />} />
							<Route path="/tutee/*">
								<Route path="" element={<TuteePage />} />
								<Route path="profile" element={<TuteeProfilePage />} />
								<Route path="notifications" element={<NotificationsList />} />
								<Route path="create-post" element={<CreatePostPage />} />
								<Route path="request-admin" element={<RequestAdminPage />} />
								<Route path="tutor-list" element={<TutorListPage />} />
								{rolePrefix == "/tutee" && <Route path="tutor-application" element={<TutorApplicationPage />} />}
								<Route path="collaboration/*" element={<CollaborationPage />} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</>
					) : null}

					{/* Tutor routes */}
					{isTutor ? (
						<>
							<Route path="/tutee/*" element={<Forbidden />} />
							<Route path="/tutor/*">
								<Route path="" element={<TutorPage />} />
								<Route path="posts-list" element={<PostsListPage />} />
								<Route path="notifications" element={<NotificationsList />} />
								{rolePrefix == "/tutor" && <Route path="tutor-application" element={<TutorApplicationPage />} />}
								<Route path="profile" element={<TutorProfilePage />} />
								<Route path="collaboration/*" element={<CollaborationPage />} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</>
					) : null}

					{/* Catch-all for invalid roles */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Box>
		</Box>
	);
}
