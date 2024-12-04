import { Navigate, Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "~/state/stateStore";
import { Role } from "~/types/data_types";

export default function TuteeProtectedRoutes() {
	const user = useAtomValue(userAtom);

	return user.role?.includes(Role.Enum.Tutee) ? <Outlet /> : <Navigate to="/" />;
}
