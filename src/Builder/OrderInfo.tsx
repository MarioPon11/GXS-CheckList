import React from 'react';
import { useInputValueContext } from './Context';

export default function OrderInfo() {
    const { account, setAccount, order, setOrder } = useInputValueContext();

    return (
        <div className="order-info">
            <div className="order-input">
                <input type="text" name="account" value={account} placeholder="Account Name" maxLength={50} onChange={(e) => setAccount(e.target.value)} />
                <span className="input1-line"></span>
            </div>
            <div className="order-input">
                <input type="text" name="order" value={order} placeholder="Order #" maxLength={25} onChange={(e) => setOrder(e.target.value)} />
                <span className="input2-line"></span>
            </div>
        </div>
    )
}