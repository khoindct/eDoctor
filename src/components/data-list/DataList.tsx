import MUIDataTable from "mui-datatables";
import React from "react";
import "./DataList.scss";

interface IDataList {
  data: any[];
  columns: any[];
  title: string;
}

const DataList: React.FC<IDataList> = ({ data, columns, title }) => {
  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={{
        filterType: "textField",
        download: "false",
      }}
    />
  );
};

export default DataList;
