// EmailContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EmailContextProps {
    children: ReactNode;
}

interface EmailContextValue {
    emails: string[]; // Replace 'string[]' with the actual type of your tasks
    setEmails: React.Dispatch<React.SetStateAction<string[]>>; // Replace 'string[]' accordingly
}

const EmailContext = createContext<EmailContextValue | undefined>(undefined);

const EmailProvider: React.FC<EmailContextProps> = ({ children }) => {
    const [emails, setEmails] = useState<string[]>([]); // Replace 'string[]' accordingly

    return (
        <EmailContext.Provider value={{ emails, setEmails }}>
            {children}
        </EmailContext.Provider>
    );
};

const useEmailContext = (): EmailContextValue => {
    const context = useContext(EmailContext);
    if (!context) {
        throw new Error('useEmailContext must be used within a EmailProvider');
    }
    return context;
};

export { EmailProvider, useEmailContext };
