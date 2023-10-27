function MyButton({ CompName, callback, classNm }: { CompName: string, classNm: string, callback: () => void }) {
    return (<button className={classNm} onClick={callback}>{CompName}</button>);
}

function MyFunction() {
    console.log('Hello world');
}

export default function MyApp() {
    return (<div className="buttons">
        <div id="submitbtn">
            <MyButton CompName="Enviar" callback={MyFunction} classNm="Submit" />
            <MyButton CompName="" callback={MyFunction} classNm="i" />
        </div>
        <MyButton CompName="Reset" callback={MyFunction} classNm="Reset" />
    </div>);
}