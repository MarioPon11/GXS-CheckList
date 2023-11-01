import React, { useEffect, useState } from 'react';
import BulletTextArea from "./attoms/CheckTextArea";
import InputField from "./attoms/tabName";
import AlertBox from './attoms/alertBox';

interface buttonProps {
    closeMenuFunct: (value?: boolean) => void;
}

const AppMenu: React.FC<buttonProps> = ({ closeMenuFunct }) => {
    const [tabs, setTabs] = useState<any[]>([]);
    const [emails, setEmails] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);

    const addAlert = (message: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setAlerts([...alerts, { id, message }]);
    };

    const removeAlert = (id: string) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await window.api.invoke('get-data');
            setTabs(response);

            const emailResponse = await window.api.invoke('get-emails');
            setEmails(emailResponse); // Default to the first tab's values
        };
        fetchData();
    }, []);

    function removeTabFunc(tabName: string) {
        setTabs(tabs.filter(tab => tab.name !== tabName));
    }

    function saveSettings() {
        const data = { tabs, emails };
        console.log('Saving settings: ', data.tabs, data.emails);
        if (data.tabs.length === 0) {
            addAlert("You must have at least one tab");
            return;
        } else if (data.tabs.some((tab: any) => tab.name === '')) {
            addAlert("You must have a name for each tab");
            return;
        } else if (data.emails.length === 0) {
            addAlert("You must have at least one email");
            return;
        } else if (data.emails.some((email: any) => email === '')) {
            addAlert("You must have an email for each email");
            return;
        } else if (data.tabs.some((tab: any) => tab.values.length === 0)) {
            addAlert("You must have at least one bullet per tab");
            return;
        } else if (data.tabs.some((tab: any) => tab.values.some((value: any) => value === ''))) {
            addAlert("You must have a value for each bullet");
            return;
        } else {
            const response = window.api.invoke('save-settings', data);

            if (response !== 'Success') {
                console.log('Error saving settings: ', response);
            } else {
                closeMenuFunct();
            }
        }
    }
    function CloseMenu() {
        console.log('Button was clicked');
        closeMenuFunct();
    }

    function addNewTab() {
        const newTab = { name: "", values: "" };
        setTabs([...tabs, newTab]);
    }

    function removeEmail(email: string) {
        setEmails(emails.filter(e => e !== email));
    }

    function addNewEmail() {
        setEmails([...emails, ""]);
    }

    const updateEmail = (index: number, newValue: string) => {
        const newEmails = [...emails];
        newEmails[index] = newValue;
        setEmails(newEmails);
    };

    const updateTab = (index: number, newValue: string) => {
        const newTabs = [...tabs];
        newTabs[index].name = newValue;
        setTabs(newTabs);
    };

    const updateTabValues = (index: number, newValue: string) => {
        const lines = newValue.split('\n');
        const cleanedLines = lines.map(line => line.replace('- ', ''));
        console.log('Got lines:', cleanedLines, 'From index', index);

        const newTabs = JSON.parse(JSON.stringify(tabs));

        if (JSON.stringify(newTabs[index].values) !== JSON.stringify(cleanedLines)) {
            newTabs[index].values = cleanedLines;
            setTabs(newTabs);
        }
    };

    return (
        <>
            <div className="curtain" onClick={CloseMenu}></div>
            <div className="menu">
                <h2>Settings:</h2>
                <div className="tabs-info">
                    <div className="tabs">
                        {
                            tabs.map((tab, index) => (
                                <div className="tab">
                                    <div className="tab-control">
                                        <InputField existingData={tab.name} updateParent={updateTab} index={index} />
                                        <span className='tab-control-span'></span>
                                        <button className="remove-tab" onClick={() => removeTabFunc(tab.name)}><i className="bx bx-x"></i></button>
                                    </div>
                                    <BulletTextArea existingData={tab.values} updateParent={updateTabValues} index={index} />
                                </div>
                            ))
                        }
                        <button className="add-tab" onClick={addNewTab}>Add New<i className="bx bx-plus"></i></button>
                    </div>
                </div>

                <h3>Email List:</h3>
                <div className="email-list">
                    {
                        emails.map((email, index) => (
                            <div className="email">
                                <div className="email-control">
                                    <InputField existingData={email} updateParent={updateEmail} index={index} />
                                    <span className='email-control-span'></span>
                                    <button className="remove-email" onClick={() => removeEmail(email)}><i className="bx bx-x"></i></button>
                                </div>
                            </div>
                        ))
                    }
                    <button className="add-email" onClick={addNewEmail}>Add New<i className="bx bx-plus"></i></button>
                </div>

                <div className="menu-btns">
                    <button onClick={saveSettings} className="lg accent">Confirm</button>
                    <button onClick={CloseMenu} className="lg default">Cancel</button>
                </div>
            </div>
            {
                alerts.map(alert => (
                    <AlertBox key={alert.id} message={alert.message} onClose={() => removeAlert(alert.id)} />
                ))
            }
        </>
    );
};

export default AppMenu;