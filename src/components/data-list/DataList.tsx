import { Chip } from "@material-ui/core";
import MUIDataTable, {
  MUIDataTableOptions,
  TableFilterList,
} from "mui-datatables";
import React from "react";
import "./DataList.scss";

interface IDataList {
  data: any[];
  columns: any[];
  title: string;
}

const CustomChip = ({ label, onDelete }: any) => {
  return (
    <Chip
      variant="outlined"
      color="secondary"
      label={label}
      onDelete={onDelete}
      style={{ fontSize: "1.3rem" }}
    />
  );
};

// Here is the custom filter list component that will display
// the custom filter chips:
const CustomFilterList = (props: any) => {
  return <TableFilterList {...props} ItemComponent={CustomChip} />;
};

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
      components={{
        TableFilterList: CustomFilterList,
      }}
    />
  );
};

export default DataList;
