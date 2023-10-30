import ActionButtons from "./attoms/ButtonAttom";

function MyFunction(){
    console.log('Button was clicked');
}

export default function SubmitBtns() {
    return (<div className="buttons">
        <div id="submitbtn">
            <ActionButtons CompName="Enviar" callback={MyFunction} classNm="Submit" />
            <ActionButtons CompName="" callback={MyFunction} classNm="btn-options" isIcon />
        </div>
        <ActionButtons CompName="Reset" callback={MyFunction} classNm="Reset" />
    </div>);
}