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

export default function SpeedDialMenu() {
	const { logout, userState } = useAuth();
	const { useGetNotifications } = useNotificationService();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const navigate = useNavigate();
	const rolePrefix = useLocation().pathname.includes("tutor") ? "/tutor" : "/tutee";
	const viewingTutor = useLocation().pathname.includes("tutor");
	const viewingTutee = useLocation().pathname.includes("tutee");

	const { data: notifications } = useGetNotifications(userState?.id || 1);

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

	let actions = [
		...staticActions
	];

	if (viewingTutor === false) {
		actions.splice(
			actions.length - 2,
			0,
			{
				icon: <PersonIcon />,
				name: `Go to Tutor page`,
				route: "/tutor",
			},
		);
	}
	if (viewingTutee === false) {
		actions.splice(
			actions.length - 2,
			0,
			{
				icon: <PersonIcon />,
				name: `Go to Tutee page`,
				route: "/tutee",
			},
		);
		
	}

	const zIndex = open ? 1000 : 0;

	return (
		<Box sx={{ height: 730, display: "flex", zIndex: {zIndex}, justifyContent: "end", width: "100px", marginRight: 3 }}>
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
				onClose={handleClose}
				onOpen={handleOpen}
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
							handleClose();
						}}
					/>
				))}
			</SpeedDial>
		</Box>
	);
}
