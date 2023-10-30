import { useState } from 'react';

type RowInfoType = {
  CheckBox: boolean;
  Info: string;
  TimeStamp: string;
};

const RowInfo: RowInfoType[] = [
  { CheckBox: true, Info: 'Row1', TimeStamp: '10:25 AM' },
  { CheckBox: true, Info: 'Row2', TimeStamp: '10:30 AM' },
  { CheckBox: true, Info: 'Row3', TimeStamp: '11:00 AM' },
];

export default function TableBody() {
  const [states, setStates] = useState<number[]>(new Array(RowInfo.length).fill(0));

  const toggleState = (index: number) => {
    const newStates = [...states];
    newStates[index] = (newStates[index] + 1) % 3;
    setStates(newStates);
  };

  return (
    <tbody>
      {RowInfo.map((Row, i) => (
        <tr key={i}>
          <td>
            <div className="checkbox-container" onClick={() => toggleState(i)}>
              {states[i] === 0 && <input type="checkbox" />}
              {states[i] === 1 && <input type="checkbox" checked />}
              {states[i] === 2 && <div className="crossed">X</div>}
            </div>
          </td>
          <td>{Row.Info}</td>
          <td>{Row.TimeStamp}</td>
          <td><i className='bx bx-dots-vertical-rounded'></i></td>
        </tr>
      ))}
    </tbody>
  );
}
