import React from "react";
import BulletTextArea from "./attoms/CheckTextArea";
import InputField from "./attoms/tabName";

interface buttonProps {
    buttonF: (value?: boolean) => void;
}

const AppMenu: React.FC<buttonProps> = ({ buttonF }) => {
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
                        <div className="tab">
                            <div className="tab-control">
                                <InputField existingData='Tab Name' />
                                <span className='tab-control-span'></span>
                                <button className="remove-tab"><i className="bx bx-x"></i></button>
                            </div>
                            <BulletTextArea existingData={['Random', 'Data', 'Here']} />
                        </div>
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