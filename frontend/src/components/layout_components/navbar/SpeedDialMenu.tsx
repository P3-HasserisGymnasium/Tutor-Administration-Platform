import { Backdrop, SpeedDial, SpeedDialAction, Box, Badge } from "@mui/material";
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
import InitialsAvatar from "~/components/content_components/InitialsAvatar";
import { Role } from "~/types/data_types";
export default function SpeedDialMenu() {
  const { logout, userState } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const rolePrefix = useRolePrefix();
  const viewingTutor = useLocation().pathname.includes("tutor");
  const viewingTutee = useLocation().pathname.includes("tutee");

  const { data: tuteeNotifications } = useNotificationService().useGetTuteeNotifications(viewingTutee ? userState.id : null);
  const { data: tutorNotifications } = useNotificationService().useGetTutorNotifications(viewingTutor ? userState.id : null);

  const notifications =
    !viewingTutor && !viewingTutee
      ? [...(tuteeNotifications || []), ...(tutorNotifications || [])]
      : viewingTutor
      ? tutorNotifications || []
      : tuteeNotifications || [];

  const actions = [];
  const zIndex = open ? 1000 : 0;

  if (viewingTutee) {
    actions.push(
      { icon: <AccountBoxIcon />, name: "Edit Profile", route: `${rolePrefix}/profile` },
      { icon: <CircleNotificationsIcon />, name: "View Notifications", route: `${rolePrefix}/notifications` },
      userState.role?.includes(Role.Enum.Tutor)
        ? { icon: <PersonIcon />, name: "Go to Tutor page", route: "/tutor" }
        : { icon: <SupervisedUserCircleIcon />, name: "Apply to become Tutor", route: `${rolePrefix}/tutor-application` },
      { icon: <LogoutIcon />, name: "Log out", route: "/", logout: true }
    );
  } else if (viewingTutor) {
    actions.push(
      { icon: <AccountBoxIcon />, name: "Edit Profile", route: `${rolePrefix}/profile` },
      { icon: <CircleNotificationsIcon />, name: "View Notifications", route: `${rolePrefix}/notifications` },
      { icon: <SupervisedUserCircleIcon />, name: "Apply for more subjects", route: `${rolePrefix}/tutor-application` },
      userState.role?.includes(Role.Enum.Tutee)
        ? { icon: <PersonIcon />, name: "Go to Tutee page", route: "/tutee" }
        : { icon: <PersonIcon />, name: "Become a tutee", route: "/tutee" },
      { icon: <LogoutIcon />, name: "Log out", route: "/", logout: true }
    );
  } else {
    actions.push(
      { icon: <CircleNotificationsIcon />, name: "View all Notifications", route: `${rolePrefix}/notifications` },
      { icon: <PersonIcon />, name: "Go to Tutor page", route: "/tutor" },
      { icon: <PersonIcon />, name: "Go to Tutee page", route: "/tutee" },
      { icon: <LogoutIcon />, name: "Log out", route: "/", logout: true }
    );
  }
  console.log("userState", userState);

  return (
    <Box sx={{ height: 730, display: "flex", zIndex: { zIndex }, justifyContent: "end", width: "100px", marginRight: 3 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: "absolute",
          top: 13,
          zIndex: 0,
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
            <InitialsAvatar fullName={userState.name} />
          </Badge>
        }
        openIcon={<InitialsAvatar fullName={userState.name} />}
        direction="down"
        hidden={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {actions.map(
          (action) =>
            action && (
              <SpeedDialAction
                key={action.name}
                sx={{
                  mb: 1,
                  "& .MuiSpeedDialAction-staticTooltipLabel": {
                    width: "12rem",
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
            )
        )}
      </SpeedDial>
    </Box>
  );
}
