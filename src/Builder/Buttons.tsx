import ActionButtons from "./attoms/ButtonAttom";

function MyFunction(){
    console.log('Button was clicked');
}

export default function SubmitBtns() {
    return (<div className="action-btns">
        <div id="submitbtn">
            <ActionButtons CompName="Enviar" callback={MyFunction} isMainAction />
            <ActionButtons CompName="" callback={MyFunction} isMainAction isIcon />
        </div>
        <ActionButtons CompName="Reset" callback={MyFunction} />
    </div>);
}