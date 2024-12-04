import { Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "~/state/stateStore";
import Navbar from "~/components/layout_components/navbar/Navbar";
import { Box } from "@mui/material";
import { useBreakpoints } from "~/utilities/helperFunctions";

export default function ProtectedRoute() {
	const widthRightOffset = useBreakpoints().hasScrollbar ? "16px" : "0px";
	const isMobile = useBreakpoints().isMobile;
	const [isAuthenticated] = useAtom(isAuthenticatedAtom);

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}
	return (
		<Box
			sx={{
				height: isMobile ? "auto" : "100vh",
				width: isMobile ? `calc(100vw - ${widthRightOffset})` : "100vw",
			}}
		>
			<Navbar />

			<Box sx={{ height: "88vh", width: "100%" }}>
				<Outlet />
			</Box>
		</Box>
	);
}
