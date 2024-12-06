import { Box, Button, TextField, Theme, Typography, useTheme } from "@mui/material";
import TutorlyLogoBlue from "src/assets/TutorlyLogoBlue.svg";
import TutorlyIconWhite from "src/assets/TutorlyIconWhite.svg";
import { useNavigate } from "react-router-dom";
import { useAccountService } from "~/api/services/account-service";
import { LoginType, UserState, zodLoginSchema } from "~/types/entity_types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "~/api/authentication/useAuth";
import { Role, Subject } from "~/types/data_types";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme<Theme>();
  const loginMutation = useAccountService().useLogin();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginType>({
    resolver: zodResolver(zodLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = (values: LoginType) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        const userState = {
          id: data.id,
          name: data.name,
          role: data.role?.map((role) => Role.Enum[role as keyof typeof Role.Enum]) || null,
          email: data.email,
          year_group: data.year_group as UserState["year_group"],
          tutoring_subjects:
            data.tutoring_subjects?.map((subject) => Subject.Enum[subject as keyof typeof Subject.Enum]) || null,
          is_administrator: data.is_administrator,
        };
        login(userState, data.token);
        navigate("/");
      },
    });
  };

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.customColors.postBackGroundColor,
        }}
      >
        <img src={TutorlyIconWhite} style={{ width: "25%" }}></img>
        <Typography variant="h1">
          <strong>
            <strong>Sign in</strong>
          </strong>
        </Typography>
        <TextField
          {...register("email")}
          sx={{ marginTop: 8, width: "30%" }}
          id="email"
          label="Enter email"
          variant="outlined"
          error={Boolean(errors.email)}
          helperText={(errors.email?.message as string) || ""}
        />
        <TextField
          {...register("password")}
          sx={{ marginTop: 2, width: "30%" }}
          id="password"
          label="Enter password"
          variant="outlined"
          type="password"
          error={Boolean(errors.password)}
          helperText={(errors.password?.message as string) || ""}
        />
        <Box sx={{ flexDirection: "row", marginTop: 2 }}>
          <Button
            onClick={handleSubmit(handleLogin)}
            sx={{ margin: 1, backgroundColor: theme.palette.primary.main }}
            variant="contained"
          >
            Log in
          </Button>
          <Button onClick={() => navigate("/register")} sx={{ margin: 1 }} variant="contained">
            Register
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "primary.main",
        }}
      >
        <img src={TutorlyLogoBlue} style={{ width: "35%" }}></img>
        <Typography variant="h3" width={"85%"}>
          <br></br>
          <strong>Features:</strong>
          <br></br>
          <ul>
            <li>Become a tutor or tutee</li>
            <li>Create collaborations</li>
            <li>Receive and offer help to other students</li>
          </ul>
          <br></br>
          Have fun!
        </Typography>
      </Box>
    </Box>
  );
}
