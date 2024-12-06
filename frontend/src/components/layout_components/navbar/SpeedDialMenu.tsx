import { Backdrop, SpeedDial, SpeedDialAction, Avatar, Box } from "@mui/material";
import { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "~/api/authentication/useAuth";
import { Role } from "~/types/data_types";

export default function SpeedDialMenu() {
  const { logout, userState } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rolePrefix = location.pathname.includes("tutor") ? "/tutor" : "/tutee";

  const isTutee = userState.role?.includes(Role.Enum.Tutee);
  const isTutor = userState.role?.includes(Role.Enum.Tutor);

  const actions = [
    {
      icon: <AccountBoxIcon />,
      name: "Edit Profile",
      route: `${rolePrefix}/profile`,
    },
    { icon: <CircleNotificationsIcon />, name: "View Notifications", route: `${rolePrefix}/notifications` },
    ...(!isTutor ? [
      {
        icon: <SupervisedUserCircleIcon />,
        name: "Apply to become tutor",
        route: `${rolePrefix}/tutor-application`,
      },
    ] : []),
    ...(isTutee && location.pathname != "/tutee" ? [
      {
        icon: <PersonIcon />,
        name: `Go to Tutee page`,
        route: "/tutee",
      }
    ] : []),
    ...(isTutor && location.pathname != "/tutor" ? [
      {
        icon: <PersonIcon />,
        name: `Go to Tutor page`,
        route: "/tutor",
      }
    ] : []),
    ,
    { icon: <LogoutIcon />, name: "Log out", route: "/", logout: true },
  ];

  return (
    <Box sx={{ height: 730, display: "flex", zIndex: 1000, justifyContent: "end", width: "100px", marginRight: 3 }}>
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
        icon={<Avatar variant="circular">P3</Avatar>}
        openIcon={<Avatar variant="circular">P3</Avatar>}
        direction="down"
        hidden={false}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          action != null && //Check value not nul, since may not be tutor or tutee
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
