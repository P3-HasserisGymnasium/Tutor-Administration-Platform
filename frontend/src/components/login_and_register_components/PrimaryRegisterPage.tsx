import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Theme, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TutorlyLogoBlue from "src/assets/TutorlyLogoBlue.svg";
import { useAccountService } from "~/api/services/account-service";
import { Language, Role, RoleType, YearGroup } from "~/types/data_types";
import { AccountRegisterType } from "~/types/entity_types";

interface PrimaryRegisterPageProps {
  setPage: (page: "primaryRegister" | "tutorTimeAvailability" | "tutorApplication") => void;
}

const PrimaryRegisterPage: React.FC<PrimaryRegisterPageProps> = ({ setPage }) => {
  const theme = useTheme<Theme>();
  const formMethods = useFormContext<AccountRegisterType>();

  const registerMutation = useAccountService().useRegisterAccount();
  const {
    getValues,
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  const navigate = useNavigate();

  const verifyRoles = (values: AccountRegisterType) => {
    const roles: RoleType[] = getValues("roles");

    const isTutor = roles.includes("Tutor");
    const isTutee = roles.includes("Tutee");

    if (isTutor) {
      setPage("tutorTimeAvailability");
    } else if (isTutee) {
      registerMutation.mutate(values, {
        onSuccess: (/*data*/) => {
          navigate("/start");
        },
        onError: (/*error*/) => {
          // Måske giv en fejl besked?
        },
      });
    }
  };

  const verifyPassword = () => {
    const values = getValues();
    if (values.password !== values.confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match.",
      });
      return;
    }
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
        <Box sx={{ width: "65%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h1" color="primary.main">
            <strong>
              <strong>Register</strong>
            </strong>
          </Typography>

          <TextField
            {...register("fullName")}
            sx={{ marginTop: 8, width: "100%" }}
            id="full_name"
            label="Enter full name"
            variant="outlined"
            error={Boolean(errors.fullName)}
            helperText={(errors.fullName?.message as string) || ""}
          />
          <TextField
            {...register("email", { required: true })}
            sx={{ marginTop: 1, width: "100%" }}
            id="email"
            label="Enter email"
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={(errors.email?.message as string) || ""}
          />
          <TextField
            {...register("password")}
            sx={{ marginTop: 1, width: "100%" }}
            id="password"
            label="Enter password"
            variant="outlined"
            error={Boolean(errors.password)}
            helperText={(errors.password?.message as string) || ""}
          />
          <TextField
            {...register("confirmPassword", {
              onBlur() {
                verifyPassword();
              },
            })}
            sx={{ marginTop: 1, width: "100%" }}
            id="confirm_password"
            label="Confirm password"
            variant="outlined"
            error={Boolean(errors.confirmPassword)}
            helperText={(errors.confirmPassword?.message as string) || ""}
          />

          <Box
            sx={{ gap: 1, marginTop: 2, width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-start" }}
          >
            <Controller
              name="yearGroup"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Year group</InputLabel>
                  <Select
                    {...field}
                    label="Year Group"
                    value={field.value || []} // Ensure it reads the current value correctly
                    onChange={(e) => field.onChange(e.target.value)} // Properly handle value updates
                    input={<OutlinedInput label="Year group" />}
                    error={Boolean(errors.yearGroup)}
                  >
                    {YearGroup.options.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.yearGroup && (
                    <Typography
                      sx={{
                        color: "#D51B21",
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Corrected the font-family value
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        lineHeight: 1.66,
                        letterSpacing: "0.03333em",
                        textAlign: "left",
                        marginTop: "3px",
                        marginLeft: "14px",
                        marginRight: "14px",
                        marginBottom: 0,
                      }}
                    >
                      {(errors.yearGroup?.message as string) || ""}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="languages"
              control={control}
              defaultValue={[]} // Ensures the initial value is an empty array
              render={({ field }) => (
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Languages</InputLabel>
                  <Select
                    {...field}
                    label="Languages"
                    multiple
                    value={field.value || []} // Ensure it reads the current value correctly
                    onChange={(e) => field.onChange(e.target.value)} // Properly handle value updates
                    input={<OutlinedInput label="Languages" />}
                    error={Boolean(errors.languages)}
                  >
                    {Language.options.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.languages && (
                    <Typography
                      sx={{
                        color: "#D51B21",
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Corrected the font-family value
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        lineHeight: 1.66,
                        letterSpacing: "0.03333em",
                        textAlign: "left",
                        marginTop: "3px",
                        marginLeft: "14px",
                        marginRight: "14px",
                        marginBottom: 0,
                      }}
                    >
                      {(errors.languages?.message as string) || ""}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Box>

          <Controller
            name="roles"
            control={control}
            defaultValue={[]} // Ensures the initial value is an empty array
            render={({ field }) => (
              <FormControl sx={{ marginTop: 2, width: "50%" }}>
                <InputLabel>Roles</InputLabel>
                <Select
                  {...field}
                  label="Roles"
                  multiple
                  value={field.value || []} // Ensure it reads the current value correctly
                  onChange={(e) => field.onChange(e.target.value)} // Properly handle value updates
                  input={<OutlinedInput label="Roles" />}
                  error={Boolean(errors.roles)}
                >
                  {Role.options.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
                {errors.roles && (
                  <Typography
                    sx={{
                      color: "#D51B21",
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Corrected the font-family value
                      fontWeight: 400,
                      fontSize: "0.75rem",
                      lineHeight: 1.66,
                      letterSpacing: "0.03333em",
                      textAlign: "left",
                      marginTop: "3px",
                      marginLeft: "14px",
                      marginRight: "14px",
                      marginBottom: 0,
                    }}
                  >
                    {(errors.roles?.message as string) || ""}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Box sx={{ marginTop: 2, width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Button onClick={() => navigate("/start")} sx={{ margin: 1, backgroundColor: theme.customColors.headingTextColor }} variant="contained">
              Go back
            </Button>
            <Button
              onClick={handleSubmit(verifyRoles)}
              type="submit"
              sx={{ margin: 1, backgroundColor: theme.palette.primary.main }}
              variant="contained"
            >
              Continue
            </Button>
          </Box>
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
        <Typography variant="h3" color="primary.light" width={"85%"}>
          <br></br>
          <strong>Becoming a student</strong>
          <br></br>
          <br></br>A tutee can establish collaborations by creating a post, finding a tutor or requesting an administrator for help.
          <br></br>
          <br></br>A tutor can view and accept posts to create collaborations.
          <br></br>
          <br></br>
          Within a collaboration, meetings can be created.
        </Typography>
      </Box>
    </Box>
  );
};

export default PrimaryRegisterPage;
