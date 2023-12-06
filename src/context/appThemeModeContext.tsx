// DarkModeContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | null;

interface DarkModeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
    children: React.ReactNode;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserPreference = async () => {
            try {
                const defaultTheme: Theme = await window.api.invoke('get-app-theme');
                if (defaultTheme) {
                    setDarkMode(defaultTheme === 'dark');
                    document.body.classList.toggle('dark', darkMode);
                }
            } catch (error) {
                console.error('Error fetching user theme preference:', error);
            }
        };

        fetchUserPreference();
    }, []); // Run once on component mount

    const toggleDarkMode = () => {
        const newTheme = darkMode ? 'light' : 'dark';

        // Update the body class
        document.body.classList.toggle('dark', darkMode);

        // Set the theme using the provided API call
        window.api.invoke('set-app-theme', newTheme);

        // Update the state
        setDarkMode(!darkMode);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = (): DarkModeContextType => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};
