import { createTheme } from "@mui/material";
import baseTheme from "./baseTheme";
import { darken } from "@mui/material/styles";

const colors = {
    navBarColor: '#082BA2',
    headingTextColor: '#041758',
    collaborationBackgroundColor: '#27A1F980',
    postBackGroundColor: '#FFFFFF',
    buttonColor: '#041758',
}


const unauthenticatedAppTheme = createTheme(baseTheme, {
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
                    '&.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h5, &.MuiTypography-h6': {
                        color: "#FFFFFF"
                    },
                    '&.MuiTypography-h1, &.MuiTypography-h4': {
                        color: colors.headingTextColor,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.navBarColor,
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
    },
    typography: {
        fontFamily: 'Open Sans',
        h1: {
            fontSize: '4rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '3rem',
            fontWeight: 700,
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 300,
        },
    },
})

export default unauthenticatedAppTheme;
