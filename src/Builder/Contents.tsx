import React, { useEffect, useState } from 'react';
import CheckList from "./Table";
import OrderInfo from "./OrderInfo";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import Backdrop from '@mui/material/Backdrop';
import SettingMenu from '../Builder/CheclistMenu';
import { useAlert } from '../context/settingsErrorContext';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function MyApp() {
    const [open, setOpen] = useState(false);
    const { alerts, removeAlert, addAlert } = useAlert();

    const alertsOpen = alerts.length > 0 ? true : false;

    const AppMenu = () => {
        const closeMenu = () => {
            setOpen(false);
        }

        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <SettingMenu closeMenu={closeMenu} />
            </Backdrop>
        )
    }

    return (
        <Box width={"100%"} height={"100%"}>
            {alertsOpen && (
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                    {alerts.map((alert, index) => (
                        <Collapse key={index} in={true} sx={{ width: '100%' }}>
                            <Alert
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
                        </Collapse>
                    ))}
                </Box>
            )}

            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h4"
                >
                    Checklist
                </Typography>
                <IconButton onClick={() => {
                    setOpen(!open);
                }}>
                    <SettingsIcon fontSize='large' />
                </IconButton>
            </Box>
            <AppMenu />

            <OrderInfo />
            <CheckList />
        </Box>
    )
}