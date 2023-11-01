import React, { useState, useEffect } from 'react';

interface InputFieldProps {
    existingData?: string;
    updateParent: (index: number, newValue: string) => void;
    index: number;
}

const InputField: React.FC<InputFieldProps> = ({ existingData, updateParent, index }) => {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (existingData) {
            setInputValue(existingData);
        }
    }, [existingData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        updateParent(index, e.target.value);
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder='Tab Name'
        />
    );
};

export default InputField;