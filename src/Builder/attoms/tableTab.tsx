export default function TableTab({ RowInfo }: { RowInfo: Array<string> }) {
    return (<tr>
        {RowInfo.map((value, index) => {
            return (<td className="table-tab" key={index} onClick={() =>{
                console.log('Switching tab to', index)
            }
            }>{value}</td>);
        })}
    </tr>);
}