function MyButton({ CompName, callback, classNm, isIcon=false }: { CompName: string, classNm: string, isIcon?:boolean, callback: () => void }) {
    return (<button className={classNm} onClick={callback}>{isIcon ? <i className="bx bxs-chevron-down"></i> : CompName}</button>);
}

function MyFunction() {
    console.log('Hello world');
}

export default function MyApp() {
    return (<div className="buttons">
        <div id="submitbtn">
            <MyButton CompName="Enviar" callback={MyFunction} classNm="Submit" />
            <MyButton CompName="" callback={MyFunction} classNm="btn-options" isIcon/>
        </div>
        <MyButton CompName="Reset" callback={MyFunction} classNm="Reset" />
    </div>);
}