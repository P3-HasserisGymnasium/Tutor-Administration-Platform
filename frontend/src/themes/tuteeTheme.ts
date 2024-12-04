import { createTheme } from "@mui/material";
import baseTheme from "./baseTheme";
import { darken } from "@mui/system";

const colors = {
  navBarColor: '#FFA551',
  headingTextColor: '#041758',
  collaborationBackgroundColor: '#FFAE5E80',
  postBackGroundColor: '#F6CBA080',
  firstHeadingTextColor: '#FFFFFF',
  buttonColor: '#C0752F',

}



const tuteeTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: colors.navBarColor,
    },
  },
  customColors: {
    buttonColor: colors.buttonColor,
    collaborationBackgroundColor: colors.collaborationBackgroundColor,
    postBackGroundColor: colors.postBackGroundColor,
    headingTextColor: colors.headingTextColor,
    boxBorderColor: colors.headingTextColor,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6': {
            color: colors.headingTextColor,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.buttonColor,
          '&:hover': {
            backgroundColor: darken(colors.buttonColor, 0.1),
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: colors.headingTextColor,
            "&.Mui-focused": {
              color: colors.headingTextColor,
            },
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.headingTextColor,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.headingTextColor,
            },
          },
        },
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: colors.headingTextColor,
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: colors.headingTextColor,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.headingTextColor,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.headingTextColor,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.headingTextColor, // Default label color
          "&.Mui-focused": {
            color: colors.headingTextColor, // Label color when focused
          },
        },
      },
    },

  }
})

export default tuteeTheme;
