export default function OrderInfo() {
    return (
        <div className="order-info">
            <div className="order-input">
                <input type="text" name="account" id="account" placeholder="Account Name" maxLength={50}/>
                <span className="input1-line"></span>
            </div>
            <div className="order-input">
                <input type="text" name="order" id="order" placeholder="Order #" maxLength={25} />
                <span className="input2-line"></span>
            </div>
        </div>
    )
}