import { createTheme } from "@mui/material";
import baseTheme from "./baseTheme";
import { darken } from "@mui/material/styles";

const colors = {
    navBarColor: '#082BA2',
    headingTextColor: '#FFFFFF',
    collaborationBackgroundColor: '#27A1F980',
    postBackGroundColor: '#27A1F980',
    buttonColor: '#041758',
}


const tutorTheme = createTheme(baseTheme, {
    palette:{
        primary:{
            main: colors.navBarColor, 
        },
    },
    customColors:{
        buttonColor: colors.buttonColor,
        collaborationBackgroundColor: colors.collaborationBackgroundColor,
        postBackGroundColor: colors.postBackGroundColor,
        headingTextColor: colors.headingTextColor,
    },
    components:{
        MuiTypography:{
            styleOverrides:{
                root:{
                    '&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6':{
                        color: colors.headingTextColor,
                    },
                },
            },
        },
        MuiButton:{
            styleOverrides:{
                root:{
                    backgroundColor: colors.buttonColor,
                    '&:hover':{
                        backgroundColor: darken(colors.buttonColor, 0.1),
                    }
                }
            }
        },
        MuiAutocomplete:{
            styleOverrides:{
                root:{
                    "& .MuiInputLabel-root": {
                      color: colors.headingTextColor,
                      "&.Mui-focused": {
                        color:colors.headingTextColor,
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
    }
})

export default tutorTheme;