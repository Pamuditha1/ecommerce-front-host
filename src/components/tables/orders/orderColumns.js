import { ColumnFilter } from "../common/ColumnFilter";

import { deliverOrder } from "../../../services/orders";

export const COLUMNS = [
  {
    Header: "Action",
    Cell: (props) => {
      const orderNo = props.row.original.orderNo;
      let status = props.row.original.status;

      async function onDeliver(orderNo) {
        await deliverOrder(orderNo);
        window.location.reload(false);
        return;
      }

      return status === "Ordered" ? (
        <button
          className="btn btn-outline-warning"
          onClick={() => onDeliver(orderNo)}
        >
          Deliver
        </button>
      ) : (
        <p className="text-success">Delivered</p>
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    Filter: ColumnFilter,
  },
  {
    Header: "Order No",
    accessor: "orderNo",
    Filter: ColumnFilter,
  },
  {
    Header: "Date",
    accessor: "date",
    Filter: ColumnFilter,
  },
  {
    Header: "Time",
    accessor: "time",
    Filter: ColumnFilter,
  },
  {
    Header: "Items",
    accessor: "items",
    Filter: ColumnFilter,
    style: {
      width: "20%",
    },
  },
  {
    Header: "Amount (Rs.)",
    accessor: "subtotal",
    Filter: ColumnFilter,
  },
  {
    Header: "Customer Name",
    accessor: "username",
    Filter: ColumnFilter,
  },
  {
    Header: "Contact No",
    accessor: "contactNo",
    Filter: ColumnFilter,
  },
  {
    Header: "Email",
    accessor: "email",
    Filter: ColumnFilter,
  },
  {
    Header: "Address",
    accessor: "address",
    Filter: ColumnFilter,
    style: {
      width: "20%",
    },
  },
];
