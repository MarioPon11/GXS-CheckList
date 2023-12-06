import Box from '@mui/material/Box';
import LoadBar from './preloader';
import MyApp from './Contents';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from '../context/appThemeModeContext';
import { darkTheme, lightTheme } from '../scss/appTheme';
import Paper from '@mui/material/Paper';

const MainApp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { darkMode } = useDarkMode();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Box sx={{ width: '100%', height: '101%', display: 'flex', flexDirection: 'column', padding: '35px' }} component={Paper}>
                {
                    isLoading ? <LoadBar /> : <MyApp />
                }
            </Box>
        </ThemeProvider>
    )
}

export default MainApp;