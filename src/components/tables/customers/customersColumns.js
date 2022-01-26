import { ColumnFilter } from "../common/ColumnFilter";

export const COLUMNS = [
  {
    Header: "Customer Name",
    accessor: "username",
    Filter: ColumnFilter,
  },
  {
    Header: "# of Orders",
    accessor: "orders",
    Filter: ColumnFilter,
    style: {
      width: "30px",
    },
  },
  {
    Header: "# Items Bought",
    accessor: "qutyBought",
    Filter: ColumnFilter,
    style: {
      width: "30px",
    },
  },
  {
    Header: "Email",
    accessor: "email",
    Filter: ColumnFilter,
  },
  {
    Header: "Contact No",
    accessor: "contactNo",
    Filter: ColumnFilter,
  },
  {
    Header: "Address",
    accessor: "address",
    Filter: ColumnFilter,
  },
];
