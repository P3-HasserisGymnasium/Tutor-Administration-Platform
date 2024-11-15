import { createTheme } from "@mui/material";
import { daDK } from "@mui/material/locale"

const theme = createTheme(
    {
        palette: {
            // type: "light",
            primary: {
                main: 'rgb(0,120,109)',
            },
            secondary: {
                main: '#FFA137',
            },
            error: {
                main: '#D51B21',
            },
        },
        typography: {
            fontFamily: 'Open Sans',
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
    },
    daDK
);

export default theme;