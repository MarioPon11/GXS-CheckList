export default function TableHeader({ HeaderInfo }: { HeaderInfo: Array<string>}) {
    return (<tr>
        {HeaderInfo.map((value, index) => {
            if(value === 'Icon'){
                return (<td className="table-header-cell" key={index}><button className="menu-btn"><i className='bx bx-dots-vertical-rounded'></i></button></td>);
            } else if (value === 'chkbox') {
                return (<td className="table-header-cell" key={index}><input type="checkbox"/></td>);
            } else {
                return(<td className="table-header-cell" key={index}>{value}</td>);
            }
        })}
    </tr>);
}