import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CloseIcon from '@mui/icons-material/Close';
import GeneralSettings from './attoms/generalSettings';
import TaskSettings from './attoms/taskSettings';
import EmailSettings from './attoms/emailSettings';
import Button from '@mui/material/Button';


type SettingMenuProps = {
    closeMenu: () => void;
};

const SettingMenu = ({ closeMenu }: SettingMenuProps) => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, width: 400, height: 600 }} onClick={handleMenuClick}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <Typography variant="h5">Settings</Typography>
                    <IconButton onClick={() => closeMenu()}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Tabs value={tabValue} onChange={handleTabChange} variant='fullWidth' sx={{ backgroundColor: '#dedcdc' }}>
                    <Tab label="General" sx={tabValue === 0 ? { backgroundColor: '#f5f5f5' } : {}} />
                    <Tab label="Emails" sx={tabValue === 1 ? { backgroundColor: '#f5f5f5' } : {}} />
                    <Tab label="Tasks" sx={tabValue === 2 ? { backgroundColor: '#f5f5f5' } : {}} />
                </Tabs>
                <Box sx={{ flexGrow: 1, marginTop: 2, maxHeight: '400px' }}>
                    {/* Content for each tab goes here */}
                    {tabValue === 0 && <GeneralSettings />}
                    {tabValue === 1 && <EmailSettings />}
                    {tabValue === 2 && <TaskSettings />}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, gap: 1 }}>
                    <Button variant="contained" fullWidth onClick={() => closeMenu()}>Save</Button>
                    <Button variant="outlined" fullWidth onClick={() => closeMenu()}>Cancel</Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default SettingMenu;
