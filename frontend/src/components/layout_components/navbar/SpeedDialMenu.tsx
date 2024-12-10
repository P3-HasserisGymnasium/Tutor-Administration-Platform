import { Backdrop, SpeedDial, SpeedDialAction, Avatar, Box, Badge } from "@mui/material";
import { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "~/api/authentication/useAuth";
import { useNotificationService } from "~/api/services/notification-service";
import { useRolePrefix } from "~/utilities/helperFunctions";

export default function SpeedDialMenu() {
	const { logout, userState } = useAuth();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const rolePrefix = useRolePrefix();
	const viewingTutor = useLocation().pathname.includes("tutor");
	const viewingTutee = useLocation().pathname.includes("tutee");
	const staticActions = [
		{
			icon: <AccountBoxIcon />,
			name: "Edit Profile",
			route: `${rolePrefix}/profile`,
		},
		{ icon: <CircleNotificationsIcon />, name: "View Notifications", route: `${rolePrefix}/notifications` },
		{ icon: <SupervisedUserCircleIcon />, name: "Apply to become tutor", route: `${rolePrefix}/tutor-application` },
		{ icon: <LogoutIcon />, name: "Log out", route: "/", logout: true },
	];

	const { data: tuteeNotifications } = useNotificationService().useGetTuteeNotifications(
		viewingTutee ? userState.id : null
	);
	const { data: tutorNotifications } = useNotificationService().useGetTutorNotifications(
		viewingTutor ? userState.id : null
	);

	const notifications =
		!viewingTutor && !viewingTutee
			? [...(tuteeNotifications || []), ...(tutorNotifications || [])]
			: viewingTutor
			? tutorNotifications || []
			: tuteeNotifications || [];

	const actions = [...staticActions];

	if (viewingTutor === false) {
		actions.splice(actions.length - 2, 0, {
			icon: <PersonIcon />,
			name: `Go to Tutor page`,
			route: "/tutor",
		});
	}
	if (viewingTutee === false) {
		actions.splice(actions.length - 2, 0, {
			icon: <PersonIcon />,
			name: `Go to Tutee page`,
			route: "/tutee",
		});
	}

	const zIndex = open ? 1000 : 0;

	return (
		<Box
			sx={{ height: 730, display: "flex", zIndex: { zIndex }, justifyContent: "end", width: "100px", marginRight: 3 }}
		>
			{" "}
			<Backdrop open={open} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				sx={{
					position: "absolute",
					top: 13,

					"& .MuiSpeedDial-fab": {
						backgroundColor: "white",
						"&:hover": {
							backgroundColor: "white",
						},
					},

					"& .MuiSpeedDialIcon-openIcon": {
						backgroundColor: "white",
					},

					"& .MuiAvatar-root": {
						backgroundColor: "white",
						color: "black",
						"&:hover": {
							backgroundColor: "white",
						},
					},
				}}
				FabProps={{ size: "large" }}
				icon={
					<Badge
						anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
						sx={{
							"& .MuiBadge-badge": {
								width: "30px",
								fontSize: "1.25rem",
								height: "30px",
								borderRadius: "50%",
								backgroundColor: "red",
								"&:hover": {
									backgroundColor: "#dd0000",
								},
							},
						}}
						badgeContent={notifications?.length}
						color="success"
						onClick={() => navigate(`${rolePrefix}/notifications`)}
					>
						<Avatar variant="circular">P3</Avatar>
					</Badge>
				}
				openIcon={<Avatar variant="circular">P3</Avatar>}
				direction="down"
				hidden={false}
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						sx={{
							mb: 1,
							"& .MuiSpeedDialAction-staticTooltipLabel": {
								width: "11rem",
								color: "black",
								fontWeight: "bold",
							},
						}}
						FabProps={{
							size: "large",
							sx: {
								"& .MuiSvgIcon-root": {
									height: "1.5em",
									width: "1.5em",
								},
							},
						}}
						icon={action.icon}
						tooltipTitle={action.name}
						tooltipOpen
						onClick={() => {
							if (action.logout) {
								logout();
								navigate("/login");
								return;
							}
							navigate(action.route);
							setOpen(false);
						}}
					/>
				))}
			</SpeedDial>
		</Box>
	);
}
