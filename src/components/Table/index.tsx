import { ReactNode, useEffect, useState } from 'react';
import { default as BSTable } from 'react-bootstrap/Table';
import { v4 } from 'uuid';
import s from './styles.module.scss';

type TColumn = {
  id: string;
  config?: any;
  render: {
    [x: string]: ReactNode;
  };
};

type Props = {
  data?: TColumn[];
  tableHead: ReactNode[];
};

const Table = ({ tableHead = [], data }: Props) => {
  const [tableData, setTableData] = useState<TColumn[]>();

  const TableHeads = () => {
    return (
      <thead className={s.tableHead}>
        <tr>
          {tableHead?.length > 0 &&
            tableHead.map(label => (
              <th key={`thead-${v4()}`} className={s.tableHead_item}>
                {label}
              </th>
            ))}
        </tr>
      </thead>
    );
  };

  const TableData = ({ rowData }: { rowData: TColumn }) => {
    return (
      <tr {...rowData.config} className={s.tableData}>
        {rowData.render &&
          Object.values(rowData.render).map(value => (
            <td key={`tdata-${v4()}`} className={s.tableData_item}>
              {value}
            </td>
          ))}
      </tr>
    );
  };

  const TableBody = () => {
    return (
      <tbody>
        {tableData &&
          tableData?.length > 0 &&
          tableData.map(row => (
            <TableData rowData={row} key={`trowData-${v4()}`} />
          ))}
      </tbody>
    );
  };

  useEffect(() => {
    if (data) setTableData(data);
  }, [data]);

  if (!data || data?.length === 0) return null;

  return (
    <BSTable bordered className={s.table}>
      <TableHeads />
      <TableBody />
    </BSTable>
  );
};

export default Table;
