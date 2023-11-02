import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import MyApp from './Builder/Contents';
import LoadBar from './Builder/preloader';
import { AlertContextProvider } from './Builder/Context';


function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <AlertContextProvider>
            <div className='checklist'>
                {
                    isLoading ? <LoadBar /> : <MyApp />
                }
            </div>
        </AlertContextProvider>
    );
}

const root = createRoot(document.body);
root.render(<App />);