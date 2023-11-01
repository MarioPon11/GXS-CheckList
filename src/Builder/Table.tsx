import React, { useEffect, useState } from 'react';
import SubmitBtns from "./Buttons";
import { useCheckboxContext } from './Context';

const CheckList: React.FC = () => {
    const { tabs, setTabs } = useCheckboxContext();
    const { currentTabValues, setCurrentTabValues } = useCheckboxContext();
    const { checkedRows, setCheckedRows } = useCheckboxContext();


    useEffect(() => {
        const fetchData = async () => {
            const response = await window.api.invoke('get-data');
            setTabs(response);
            setCurrentTabValues(response[0].values); // Default to the first tab's values
        };
        fetchData();
    }, []);

    const handleTabClick = (tabName: string) => {
        const selectedTab = tabs.find((tab) => tab.name === tabName);
        if (selectedTab) {
            setCurrentTabValues(selectedTab.values);
        }
    };

    const handleRowClick = (value: string) => {
        setCheckedRows(prevState => ({
            ...prevState,
            [value]: !prevState[value]
        }));
    };

    return (
        <>
            <div className='table-container'>
                {/* Tabs */}
                <div className="tabs">
                    {tabs.map((tab, index) => (
                        <button key={index} onClick={() => handleTabClick(tab.name)}>
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Task Name</th>
                            <th>Time Stamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTabValues.map((value, index) => (
                            <tr key={index} onClick={() => handleRowClick(value)}>
                                <td><input type="checkbox" checked={checkedRows[value] || false} readOnly /></td>
                                <td>{value}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Buttons */}
            <SubmitBtns />
        </>
    );
};

export default CheckList;
