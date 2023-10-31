import React, { useEffect, useState } from 'react';
import BulletTextArea from "./attoms/CheckTextArea";
import InputField from "./attoms/tabName";

interface buttonProps {
    buttonF: (value?: boolean) => void;
}

const AppMenu: React.FC<buttonProps> = ({ buttonF }) => {
    const [tabs, setTabs] = useState<any[]>([]);
    const [emails, setEmails] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await window.api.invoke('get-data', 'Account Name');
            setTabs(response);

            const emailResponse = window.api.invoke('get-emails', '');
            setEmails(emailResponse); // Default to the first tab's values
        };
        fetchData();
    }, []);

    function handleTabClick(tabName: string) {
        const selectedTab = tabs.find((tab) => tab.name === tabName);
        if (selectedTab) {
            console.log('Tab close was clicked');
        }
    }

    function ButtonFunction() {
        console.log('Button was clicked');
        buttonF();
    }

    function CloseMenu() {
        console.log('Button was clicked');
        buttonF();
    }

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
                                        <InputField existingData={tab.name} />
                                        <span className='tab-control-span'></span>
                                        <button className="remove-tab" onClick={handleTabClick(tab.name)}><i className="bx bx-x"></i></button>
                                    </div>
                                    <BulletTextArea existingData={tab.values} />
                                </div>
                            ))
                        }
                        <button className="add-tab">Add New<i className="bx bx-plus"></i></button>
                    </div>
                </div>

                <h3>Email List:</h3>
                <div className="email-list">
                    <div className="email-container">
                        <InputField existingData='Email' />
                        <span className='tab-control-span'></span>
                    </div>
                    <button className="add-email">Add New<i className="bx bx-plus"></i></button>
                </div>

                <div className="menu-btns">
                    <button onClick={ButtonFunction} className="lg accent">Confirm</button>
                    <button onClick={CloseMenu} className="lg default">Cancel</button>
                </div>
            </div>
        </>
    );
};

export default AppMenu;