import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import HomePage from "components/page_components/HomePage";
import TutorPage from "components/page_components/tutor/TutorPage";
import TuteePage from "components/page_components/tutee/TuteePage";
import CreatePostPage from "components/page_components/tutee/CreatePostPage";
import TutorListPage from "components/page_components/tutee/TutorListPage";
import TutorNotificationsPage from "components/page_components/tutor/TutorNotificationsPage";
import TuteeNotificationsPage from "components/page_components/tutee/TuteeNotificationsPage";
import TuteeProfilePage from "components/page_components/tutee/TuteeProfilePage";
import TutorProfilePage from "components/page_components/tutor/TutorProfilePage";
import RequestAdminPage from "components/page_components/tutee/RequestAdminPage";
import PostsListPage from "components/page_components/tutor/PostsListPage";
import CollaborationPage from "components/page_components/CollaborationPage";
import { useBreakpoints } from "./utilities/helperFunctions";
import TutorApplicationPage from "./components/page_components/TutorApplicationPage";
import Navbar from "./components/layout_components/navbar/Navbar";
import { useAtomValue } from "jotai";
import { userAtom } from "./state/stateStore";
import { Role } from "./types/data_types";

export default function AuthenticatedApp() {
	const widthRightOffset = useBreakpoints().hasScrollbar ? "16px" : "0px";
	const firstLocation = useLocation().pathname.split("/").filter(Boolean);
	const navigate = useNavigate();
	const userState = useAtomValue(userAtom);

	if (!(userState.role?.includes(Role.Enum.Tutee) && userState.role?.includes(Role.Enum.Tutor))) {
		if (userState.role?.includes(Role.Enum.Tutee) && firstLocation[0] !== "tutee") {
			navigate("/tutee");
		} else if (userState.role?.includes(Role.Enum.Tutor) && firstLocation[0] !== "tutor") {
			navigate("/tutor");
		} else {
			navigate("/login");
		}
	}

	return (
		<Box
			sx={{
				height: useBreakpoints().isMobile ? "auto" : "100vh",
				width: useBreakpoints().isMobile ? `calc(100vw - ${widthRightOffset})` : "100vw",
			}}
		>
			<Navbar />

			<Box sx={{ height: "88vh", width: "100%" }}>
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/tutee" element={<TuteePage />} />
					<Route path="/tutee/profile" element={<TuteeProfilePage />} />
					<Route path="/tutee/notifications" element={<TuteeNotificationsPage />} />
					<Route path="/tutee/create-post" element={<CreatePostPage />} />
					<Route path="/tutee/request-admin" element={<RequestAdminPage />} />
					<Route path="/tutee/tutor-list" element={<TutorListPage />} />
					<Route path="/tutee/tutor-application" element={<TutorApplicationPage />} />

					<Route path="/collaboration" element={<CollaborationPage />} />
				</Routes>
			</Box>
		</Box>
	);
}
