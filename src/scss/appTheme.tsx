import { createTheme, PaletteColor } from "@mui/material/styles";

interface CustomPaletteColor extends PaletteColor {
    // Add any custom properties you need
    main: string
}

interface CustomPalette {
    mode: 'light' | 'dark';
    primary: CustomPaletteColor;
    secondary: CustomPaletteColor;
    // Add your custom colors here
    SelectedTab: CustomPaletteColor;
    unSelectedTab: CustomPaletteColor;
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        SelectedTab: {
            main: '#212526',
        },
        unSelectedTab: {
            main: '#202021',
        },
    } as CustomPalette,
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        SelectedTab: {
            main: '#f5f5f5',
        },
        unSelectedTab: {
            main: '#dedcdc',
        },
    } as CustomPalette,
});

export { darkTheme, lightTheme };
