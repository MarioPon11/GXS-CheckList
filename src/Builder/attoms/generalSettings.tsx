import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useEffect, useState } from 'react';
import { useDarkMode } from '../../context/appThemeModeContext';

const BoxStyles = {
    overflowY: 'scroll',
    paddingRight: 1,
    '&::-webkit-scrollbar': {
        width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '10px',
    },
}

const GeneralSettings = () => {
    const [selTheme, setSelTheme] = useState('light');
    const { darkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
        setSelTheme(darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const handleThemeChange = (event: React.MouseEvent<HTMLElement>, newTheme: string) => {
        if (newTheme !== null) {
            setSelTheme(newTheme);
            toggleDarkMode();
        }
    };

    return (
        <Box maxHeight={'395px'} sx={BoxStyles}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginBottom={2}>
                <Typography>App theme</Typography>
                <ToggleButtonGroup size='small' value={selTheme} exclusive onChange={handleThemeChange} color='primary'>
                    <ToggleButton value="light" aria-label='light'><LightModeIcon /></ToggleButton>
                    <ToggleButton value="dark" aria-label='dark'><DarkModeIcon /></ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Typography sx={{ marginBottom: 1 }}>Settings Management</Typography>
            <Box display={'flex'} gap={1} marginBottom={2}>
                <Button fullWidth variant='contained' startIcon={<DownloadIcon />} sx={{ marginBottom: 1 }}>Import</Button>
                <Button fullWidth variant='outlined' startIcon={<FileUploadIcon />} sx={{ marginBottom: 1 }}>Export</Button>
            </Box>
            <Typography sx={{ marginBottom: 1 }}>Need help?</Typography>
            <Button fullWidth variant='outlined' sx={{ marginBottom: 1 }}>Contact Support</Button>
        </Box >
    )
}

export default GeneralSettings;