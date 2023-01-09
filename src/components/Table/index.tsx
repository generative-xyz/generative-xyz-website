import React, { ReactNode } from 'react';
import { default as BSTable } from 'react-bootstrap/Table';
import s from './styles.module.scss';
import { v4 } from 'uuid';

type TColumn = {
  id: string;
  config?: any;
  render: ReactNode[];
};

type Props = {
  data: TColumn[];
  tableHead: ReactNode[];
};

const Table = ({ tableHead = [], data }: Props) => {
  // if (!data || data?.length === 0) return null;

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
        {rowData.render?.length > 0 &&
          rowData.render.map(value => (
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
        {data?.length > 0 &&
          data.map(row => <TableData rowData={row} key={`trowData-${v4()}`} />)}
      </tbody>
    );
  };

  return (
    <BSTable bordered className={s.table}>
      <TableHeads />
      <TableBody />
    </BSTable>
  );
};

export default Table;
