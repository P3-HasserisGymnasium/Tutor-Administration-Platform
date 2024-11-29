import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import StartPage from "components/login_and_register_components/StartPage";
import RegisterPageHandler from "./components/login_and_register_components/RegisterPageHandler";

export default function App() {
	return (
		<Box sx={{ height: "100vh", width: "100vw" }}>
			<Routes>
				<Route path="/start" element={<StartPage />} />
				<Route path="/register" element={<RegisterPageHandler />} />
			</Routes>
		</Box>
	);
}
