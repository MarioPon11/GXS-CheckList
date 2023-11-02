import React, { useEffect } from 'react';

interface AlertBoxProps {
    message: string;
    onClose: () => void;
    duration?: number;
}

const MainAlertBox: React.FC<AlertBoxProps> = ({ message, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="mainAlert" onClick={onClose}>
            <i className="bx bxs-error"></i>
            <p>{message}</p>
        </div>
    );
};

export default MainAlertBox;
