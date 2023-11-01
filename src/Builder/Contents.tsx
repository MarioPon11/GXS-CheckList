import React, { useState } from 'react';
import CheckList from "./Table";
import OrderInfo from "./OrderInfo";
import AppMenu from "./CheclistMenu";
import { InputValueContextProvider, CheckboxContextProvider } from './Context';

export default function MyApp() {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <div className="title">
                <h3>GXS-Checklist</h3>
                <h3 onClick={() => setMenuVisible(!menuVisible)} className='settings'>
                    <i className='bx bxs-cog'></i>
                </h3>
            </div>
            {menuVisible && (
                <AppMenu closeMenuFunct={setMenuVisible} />
            )}
            <InputValueContextProvider>
                <OrderInfo />
                <CheckboxContextProvider>
                    <CheckList />
                </CheckboxContextProvider>
            </InputValueContextProvider>
        </>
    )
}