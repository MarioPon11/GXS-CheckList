import React, { useState } from 'react';
import CheckList from "./Table";
import OrderInfo from "./OrderInfo";
import AppMenu from "./CheclistMenu";
import MainAlertBox from './attoms/mainAlert';
import { InputValueContextProvider, CheckboxContextProvider, useAlertContext } from './Context';

export default function MyApp() {
    const [menuVisible, setMenuVisible] = useState(false);
    const { alerts, setAlerts } = useAlertContext();

    const removeAlert = (id: string) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };


    return (
        <>
            <div className="title">
                <h3>GXS-Checklist</h3>
                <h3 onClick={() => setMenuVisible(!menuVisible)} className='settings'>
                    <i className='bx bxs-cog'></i>
                </h3>
            </div>
            {menuVisible && (
                <AppMenu closeMenuFunct={setMenuVisible} />
            )}
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
        </>
    )
}