import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import MyApp from './Builder/Contents';
import LoadBar from './Builder/preloader';
import { AlertProvider } from './context/settingsErrorContext';


function App() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <AlertProvider>
            <div className='checklist'>
                {
                    isLoading ? <LoadBar /> : <MyApp />
                }
            </div>
        </AlertProvider>
    );
}

const root = createRoot(document.body);
root.render(<App />);