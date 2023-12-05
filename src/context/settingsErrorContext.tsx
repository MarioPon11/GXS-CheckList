// AlertContext.tsx
import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

interface Alert {
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

interface AlertContextProps {
    alerts: Alert[];
    addAlert: (type: Alert['type'], message: string) => void;
    removeAlert: (id: number) => void;
}

interface AlertProviderProps {
    children: ReactNode;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const addAlert = (type: Alert['type'], message: string) => {
        const timestamp = Date.now();
        const randomPart = Math.floor(Math.random() * 10000);
        const id = timestamp + randomPart;
        const newAlert = { id, type, message };

        setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);

        setTimeout(() => {
            removeAlert(id);
        }, 10000);
    };

    const removeAlert = (id: number) => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
