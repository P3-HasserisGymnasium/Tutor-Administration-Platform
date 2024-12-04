import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./components/login_and_register_components/Login";
import Register from "./components/login_and_register_components/Register";

export default function UnauthenticatedApp() {
	return (
		<Box sx={{ height: "100vh", width: "100vw" }}>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</Box>
	);
}
