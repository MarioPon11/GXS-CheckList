import React from 'react';
import { useInputValueContext, useCheckboxContext, useAlertContext } from './Context';

const SubmitBtns: React.FC = () => {
    const { account, order, setOrder } = useInputValueContext(); // Assuming you also update your custom hook
    const { checkedRows, setCheckedRows } = useCheckboxContext();
    const { activeTab } = useCheckboxContext();
    const { alerts, setAlerts } = useAlertContext();

    const addAlert = (message: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setAlerts([...alerts, { id, message }]);
    };

    const UncheckAllRows = () => {
        // Create a new object with all keys set to false
        const newCheckedRows = Object.keys(checkedRows).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {} as Record<string, boolean>);

        // Update the state
        setCheckedRows(newCheckedRows);
    };

    async function SubmitForm(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log('Send button was clicked');
        console.log('Input Value: ', account, order, checkedRows, activeTab);
        if (order === '' && account === '') {
            addAlert('Please enter an order number and account number');
        } else if (order === '') {
            addAlert('Please enter an order number');
        } else if (account === '') {
            addAlert('Please enter an account number');
        } else {
            const emailResponse = await window.api.invoke('send-email', {
                accountName: account,
                orderNumber: order,
                checkedRows: checkedRows,
                typeOfWork: activeTab
            });
            if (emailResponse === 'Error sending email') {
                addAlert('Error sending email, please try again later');
            } else {
                UncheckAllRows();
                setOrder('');
            }
        }
    }

    function HandleMenu() {
        console.log('Menu button was clicked');
    }

    function handleClearOrder() {
        UncheckAllRows();
        setOrder('');
        console.log('Clear Order button was clicked');
    }

    return (
        <div className="action-btns">
            <div className="submitbtn">
                <button className="lg accent" onClick={SubmitForm}>Send</button>
                <button className="lg accent btn-options" onClick={HandleMenu}><i className="bx bxs-chevron-down"></i></button>
            </div>
            <button className="lg default reset-btn" onClick={handleClearOrder}>Reset</button>
        </div>
    );
};

export default SubmitBtns;