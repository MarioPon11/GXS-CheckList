import { createRoot } from 'react-dom/client';
import MyApp from './Builder/Contents';

function App() {
    return (
        <div className='checklist'>
            <MyApp />
        </div>
    );
}

const root = createRoot(document.body);
root.render(<App />);