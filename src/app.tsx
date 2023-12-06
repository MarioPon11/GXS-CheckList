import { createRoot } from 'react-dom/client';
import { AlertProvider } from './context/appErrorContext';
import { DarkModeProvider } from './context/appThemeModeContext';
import MainApp from './Builder/main';

function App() {
    return (
        <DarkModeProvider>
            <AlertProvider>
                <MainApp />
            </AlertProvider>
        </DarkModeProvider>
    );
}

const root = createRoot(document.body);
root.render(<App />);