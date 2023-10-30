import SubmitBtns from "./Buttons";
import CheckList from "./Table";
import OrderInfo from "./OrderInfo";


export default function MyApp() {
    return (
        <>
            <div className="title">
                <h3>GXS-Checklist</h3>
                <button className="settings"><i className='bx bxs-cog' ></i></button>
            </div>
            <OrderInfo />
            <CheckList />
            <SubmitBtns />
        </>
    )
}