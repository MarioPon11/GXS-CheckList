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
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { useTaskContext } from '../context/tasksContext';
import { useEmailContext } from '../context/emailSettingsContext';
import { useSettingsAlert } from '../context/settingsAlertContext';


type SettingMenuProps = {
    closeMenu: () => void;
};

interface ThemeMenu {
    palette: {
        unSelectedTab: {
            main: string
        },
        SelectedTab: {
            main: string
        }
    }
}

const SettingMenu = ({ closeMenu }: SettingMenuProps) => {
    const [tabValue, setTabValue] = React.useState(0);
    const { emails } = useEmailContext();
    const { tasks } = useTaskContext();
    const { alerts, removeAlert, addAlert } = useSettingsAlert();
    const theme: ThemeMenu = useTheme();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleSaveSettings = () => {
        if (emails.length === 0) {
            addAlert('error', 'Please add at least one email');
            return
        }
        if (tasks.length === 0) {
            addAlert('error', 'Please add at least one task');
            return
        }

        for (let i = 0; i < emails.length; i++) {
            if (!emails[i].endsWith("@gmail.com")) {
                addAlert('error', 'Email ' + emails[i] + 'is not valid');
                return
            }
        }

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].name === "") {
                addAlert('error', 'Tasks must have a name');
                return
            }
            if (tasks[i].values.length < 2) {
                addAlert('error', 'Tasks must have at least two values');
                return
            }
        }
        const data = {
            emails,
            tabs: tasks
        }
        const savingStatus = window.api.invoke('save-settings', data);
        if (savingStatus === 'Success') {
            addAlert('success', 'Settings saved successfully');
            closeMenu();
        } else {
            addAlert('error', savingStatus);
        }
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, width: 400, height: 600 }} onClick={handleMenuClick}>
            <Collapse in={true} sx={{ width: '100%', position: 'absolute', top: '52px', left: 0, zIndex: 1000, paddingLeft: '52px', paddingRight: '52px' }}>
                {alerts.map((alert, index) => (
                    <Alert
                        key={index}
                        sx={{ marginBottom: 1 }}
                        severity={alert.type}
                        variant='filled'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => removeAlert(alert.id)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        onClose={() => removeAlert(alert.id)}
                    >
                        {alert.message}
                    </Alert>
                ))}
            </Collapse>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <Typography variant="h5">Settings</Typography>
                    <IconButton onClick={() => closeMenu()}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Tabs value={tabValue} onChange={handleTabChange} variant='fullWidth' sx={{ backgroundColor: theme.palette.unSelectedTab.main }}>
                    <Tab label="General" sx={tabValue === 0 ? { backgroundColor: theme.palette.SelectedTab.main } : {}} />
                    <Tab label="Emails" sx={tabValue === 1 ? { backgroundColor: theme.palette.SelectedTab.main } : {}} />
                    <Tab label="Tasks" sx={tabValue === 2 ? { backgroundColor: theme.palette.SelectedTab.main } : {}} />
                </Tabs>
                <Box sx={{ flexGrow: 1, marginTop: 2, maxHeight: '400px' }}>
                    {/* Content for each tab goes here */}
                    {tabValue === 0 && <GeneralSettings />}
                    {tabValue === 1 && <EmailSettings />}
                    {tabValue === 2 && <TaskSettings />}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, gap: 1 }}>
                    <Button variant="contained" disableElevation fullWidth onClick={() => handleSaveSettings()}>Save</Button>
                    <Button variant="outlined" disableElevation fullWidth onClick={() => closeMenu()}>Cancel</Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default SettingMenu;
