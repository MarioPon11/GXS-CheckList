import React, { useState, useEffect } from 'react';

interface InputFieldProps {
    existingData?: string;
}

const InputField: React.FC<InputFieldProps> = ({ existingData }) => {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (existingData) {
            setInputValue(existingData);
        }
    }, [existingData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
        />
    );
};

export default InputField;