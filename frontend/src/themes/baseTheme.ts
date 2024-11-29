import { createTheme } from "@mui/material/styles";
import { daDK } from "@mui/material/locale";
import {Subject} from "../types/data_types";

const colors = {
    buttonTextColor: '#FFFFFF',
    successColor: '#88B971',
    errorColor: '#FF0000',
    subjectChipTextColor: '#FFFFFF',
}

const baseTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        error: {
            main: colors.errorColor,
            contrastText: colors.buttonTextColor,
        },
        success: {
            main: colors.successColor,
            contrastText: colors.buttonTextColor,
        },
    },
    customColors:{
        buttonColor: colors.buttonTextColor,
        collaborationBackgroundColor: '#000000',
        postBackGroundColor: '#000000',
        headingTextColor: '#000000',
        subjectColors: {
            [Subject.Enum.Music]: { background: "#b2c9e0"},
            [Subject.Enum.Math]: { background: "#ffcccb"},
            [Subject.Enum.Ess]: { background: "#c1e1c5"},
            [Subject.Enum.English]: { background: "#ffd700"},
            [Subject.Enum.Danish]: { background: "#FF4141"},
            [Subject.Enum.German]: { background: "#87EB8E"},
            [Subject.Enum.French]: { background: "#1B76FF"},
            [Subject.Enum.Biology]: { background: "#98fb98"},
            [Subject.Enum.Chemistry]: { background: "#dcdcdc"},
            [Subject.Enum.Pe]: { background: "#ffa07a"},
            [Subject.Enum.Va]: { background: "#ffdead"},
            [Subject.Enum.Psychology]: { background: "#dda0dd"},
            [Subject.Enum.Econ]: { background: "#add8e6"},
            [Subject.Enum.Ss]: { background: "#f0e68c"},
            [Subject.Enum.Physics]: { background: "#ff6347"},
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1280,
            lg: 1670,
            xl: 1815,
        },
    },
    typography: {
        fontFamily: 'Inter',
        h1:{
            fontSize: '2rem',
            fontWeight: 700,
        },
        h2:{
            fontSize: '1.5rem',
            fontWeight: 700,
        },
        h3:{
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h4:{
            fontSize: '1rem',
            fontWeight: 400,
        },
        body1:{
            fontSize: '1rem',
            fontWeight: 300,
        },
    },
    components: {
        MuiAutocomplete:{
            defaultProps:{
                size: 'small',
            }
        },
        MuiButton: {
            defaultProps: {
                size: 'medium',
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '1rem',
                    color: colors.buttonTextColor,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '1rem',
                    color: colors.subjectChipTextColor,
                },
            },
        },
        /*
        MuiDesktopTimePicker: {
            styleOverrides: {
                root: {
                "& .MuiInputBase-root": {
                    fontSize: "0.875rem", // Small font size for the input
                    padding: "8px", // Adjust padding to make it compact
                },
                },
            },
        },*/

    },
    },
    daDK,
    
);

export default baseTheme;