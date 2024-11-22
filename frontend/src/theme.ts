import { createTheme } from "@mui/material";
import { daDK } from "@mui/material/locale"

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#041758',
                light: '#FFFFFF',
                dark: '#6A79AA',
                contrastText: ''
            },
            secondary: {
                main: '#FFA552',
                light: '#FFFFFF',
                dark: '#1E212B',
                contrastText: ''
            },
            error: {
                main: '#D51B21',
            },
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