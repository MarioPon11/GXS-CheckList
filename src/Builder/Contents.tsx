import React, { useState } from 'react';
import CheckList from "./Table";
import OrderInfo from "./OrderInfo";
import MainAlertBox from './attoms/mainAlert';
import { InputValueContextProvider, CheckboxContextProvider, useAlertContext } from './Context';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import Backdrop from '@mui/material/Backdrop';
import SettingMenu from '../Builder/CheclistMenu';


export default function MyApp() {
    const [open, setOpen] = useState(false);
    const { alerts, setAlerts } = useAlertContext();

    const removeAlert = (id: string) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };

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
            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h4"
                >
                    Checklist
                </Typography>

                <SettingsIcon onClick={() => {
                    setOpen(!open);
                }} fontSize='large' />
            </Box>
            <AppMenu />

            <div className="mainAlertContainer">
                {
                    alerts.map(alert => (
                        <MainAlertBox key={alert.id} message={alert.message} onClose={() => removeAlert(alert.id)} />
                    ))
                }
            </div>

            <InputValueContextProvider>
                <OrderInfo />
                <CheckboxContextProvider>
                    <CheckList />
                </CheckboxContextProvider>
            </InputValueContextProvider>
        </Box>
    )
}