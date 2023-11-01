import React from 'react';
import { useInputValueContext, useCheckboxContext } from './Context';

const SubmitBtns: React.FC = () => {
    const { account, order, setOrder } = useInputValueContext(); // Assuming you also update your custom hook
    const { checkedRows, setCheckedRows } = useCheckboxContext();
    const { currentTabValues } = useCheckboxContext();

    const UncheckAllRows = () => {
        // Create a new object with all keys set to false
        const newCheckedRows = Object.keys(checkedRows).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {} as Record<string, boolean>);

        // Update the state
        setCheckedRows(newCheckedRows);
    };

    function MyFunction() {
        console.log('Send button was clicked');
        console.log('Input Value: ', account, order, currentTabValues, checkedRows);
    }

    function handleClearOrder() {
        UncheckAllRows();
        setOrder('');
        console.log('Clear Order button was clicked');
    }

    return (
        <div className="action-btns">
            <div className="submitbtn">
                <button className="lg accent" onClick={MyFunction}>Send</button>
                <button className="lg accent btn-options" onClick={MyFunction}><i className="bx bxs-chevron-down"></i></button>
            </div>
            <button className="lg default reset-btn" onClick={handleClearOrder}>Reset</button>
        </div>
    );
};

export default SubmitBtns;