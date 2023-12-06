// SettingsAlertContext.tsx
import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

interface Alert {
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

interface SettingsAlertContextProps {
    alerts: Alert[];
    addAlert: (type: Alert['type'], message: string) => void;
    removeAlert: (id: number) => void;
}

interface SettingsAlertProviderProps {
    children: ReactNode;
}

const SettingsAlertContext = createContext<SettingsAlertContextProps | undefined>(undefined);

export const SettingsAlertProvider: FC<SettingsAlertProviderProps> = ({ children }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const addAlert = (type: Alert['type'], message: string) => {
        const timestamp = Date.now();
        const randomPart = Math.floor(Math.random() * 10000);
        const id = timestamp + randomPart;
        const newAlert = { id, type, message };

        if (alerts.some((alert) => alert.message === message)) {
            return;
        }

        setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);

        setTimeout(() => {
            removeAlert(id);
        }, 10000);
    };

    const removeAlert = (id: number) => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    };

    return (
        <SettingsAlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </SettingsAlertContext.Provider>
    );
};

export const useSettingsAlert = () => {
    const context = useContext(SettingsAlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an SettingsAlertProvider');
    }
    return context;
};
