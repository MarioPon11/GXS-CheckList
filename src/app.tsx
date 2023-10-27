import { createRoot } from 'react-dom/client';
import MyApp from './Builder/Contents';

function App() {
    return (
        <div className='login'>
            <MyApp />
        </div>
    );
}

const root = createRoot(document.body);
root.render(<App />);