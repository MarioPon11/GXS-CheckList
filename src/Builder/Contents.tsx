import SubmitBtns from "./Buttons";
import CheckList from "./Table";
import OrderInfo from "./OrderInfo";


export default function MyApp() {
    return (
        <div className="App">
            <div className="title">
                <h1>GXS - Checklist</h1>
                <button className="settings"><i className='bx bxs-cog' ></i></button>
            </div>
            <OrderInfo />
            <CheckList />
            <SubmitBtns />
        </div>
    )
}