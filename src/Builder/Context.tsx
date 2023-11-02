import React, { createContext, useContext, useState } from 'react';

// Checkbox Context
interface CheckboxContextProps {
    rowNames: string[];
    setRowNames: React.Dispatch<React.SetStateAction<string[]>>;
    checkedRows: Record<string, boolean>;
    setCheckedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    tabs: any[];
    setTabs: React.Dispatch<React.SetStateAction<any[]>>;
    currentTabValues: string[];
    setCurrentTabValues: React.Dispatch<React.SetStateAction<string[]>>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const CheckboxContext = createContext<CheckboxContextProps | undefined>(undefined);

export const CheckboxContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rowNames, setRowNames] = useState<string[]>([]);
    const [checkedRows, setCheckedRows] = useState<Record<string, boolean>>({});
    const [tabs, setTabs] = useState<any[]>([]);
    const [currentTabValues, setCurrentTabValues] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string>('');

    return (
        <CheckboxContext.Provider value={{ rowNames, setRowNames, checkedRows, setCheckedRows, tabs, setTabs, currentTabValues, setCurrentTabValues, activeTab, setActiveTab }}>
            {children}
        </CheckboxContext.Provider>
    );
};

// Input Value Context
interface InputValueContextProps {
    account: string;
    setAccount: React.Dispatch<React.SetStateAction<string>>;
    order: string;
    setOrder: React.Dispatch<React.SetStateAction<string>>;
}

const InputValueContext = createContext<InputValueContextProps | undefined>(undefined);

export const InputValueContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string>('');
    const [order, setOrder] = useState<string>('');

    return (
        <InputValueContext.Provider value={{ account, setAccount, order, setOrder }}>
            {children}
        </InputValueContext.Provider>
    );
};

interface AlertContextProps {
    alerts: any[];
    setAlerts: React.Dispatch<React.SetStateAction<any[]>>;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alerts, setAlerts] = useState<any[]>([]);

    return (
        <AlertContext.Provider value={{ alerts, setAlerts }}>
            {children}
        </AlertContext.Provider>
    );
}

// Custom Hooks for easy access
export const useCheckboxContext = () => {
    const context = useContext(CheckboxContext);
    if (!context) {
        throw new Error('useCheckboxContext must be used within a CheckboxContextProvider');
    }
    return context;
};

export const useInputValueContext = () => {
    const context = useContext(InputValueContext);
    if (!context) {
        throw new Error('useInputValueContext must be used within an InputValueContextProvider');
    }
    return context;
};

export const useAlertContext = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlertContext must be used within an AlertContextProvider');
    }
    return context;
};


