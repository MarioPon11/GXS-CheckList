import TableTab from "./attoms/tableTab";
import TableHeader from "./attoms/tableHeader";
import TableBody from "./attoms/tableRow";


const CheckList = () => {
    return (<table>
        <thead>
            <TableTab RowInfo={['Seps', 'Embroidery', 'PS Seps']} />
        </thead>
        <thead>
            <TableHeader HeaderInfo={['Header1', 'Header2']} />
        </thead>
        <TableBody />
    </table>);
};

export default CheckList;