import React from 'react';

type TableHeaderProps = {
  headers: string[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header, index) => (
        <th key={index}>{header}</th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
