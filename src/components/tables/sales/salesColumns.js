import { ColumnFilter } from "../common/ColumnFilter";

export const COLUMNS = [
  {
    Header: "Product No",
    accessor: "productNo",
    Filter: ColumnFilter,
  },
  {
    Header: "Product Name",
    accessor: "productName",
    Filter: ColumnFilter,
    style: {
      width: "20%",
    },
  },
  {
    Header: "Category",
    accessor: "category",
    Filter: ColumnFilter,
  },
  {
    Header: "Total Sales",
    accessor: "sales",
    Filter: ColumnFilter,
  },
  {
    Header: "XS",
    accessor: "XS",
    Filter: ColumnFilter,
  },
  {
    Header: "S",
    accessor: "S",
    Filter: ColumnFilter,
  },
  {
    Header: "M",
    accessor: "M",
    Filter: ColumnFilter,
  },
  {
    Header: "L",
    accessor: "L",
    Filter: ColumnFilter,
  },
  {
    Header: "XL",
    accessor: "XL",
    Filter: ColumnFilter,
  },
  {
    Header: "XXL",
    accessor: "XXL",
    Filter: ColumnFilter,
  },
];
