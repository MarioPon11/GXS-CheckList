import React, { useEffect, useState } from 'react';
interface SubmitBtnsProps {
    UncheckAllRows: () => void;
}

const SubmitBtns: React.FC<SubmitBtnsProps> = ({ UncheckAllRows }) => {
    function MyFunction() {
        console.log('Button was clicked');
        UncheckAllRows(); 
    }

    return (<div className="action-btns">
        <div className="submitbtn">
            <button className="lg accent" onClick={MyFunction}>Send</button>
            <button className="lg accent btn-options" onClick={MyFunction}><i className="bx bxs-chevron-down"></i></button>
        </div>
        <button className="lg default reset-btn" onClick={UncheckAllRows}>Reset</button>
    </div>);
};

export default SubmitBtns;