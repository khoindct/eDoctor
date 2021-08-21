import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import React from "react";
import "./DataList.scss";

interface IDataList {
  data: any[];
  columns: any[];
  title: string;
}

const DataList: React.FC<IDataList> = ({ data, columns, title }) => {
  const options: MUIDataTableOptions = {
    filterType: "textField",
    selectableRows: "none",
    download: "false",
  };

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default DataList;
