import { ColumnFilter } from '../common/ColumnFilter'
import deliverOrder from '../../../services/updateOrderStatus'

export const COLUMNS = [

    {
        Header: 'Action',
        Cell : props => {
            const orderNo = props.row.original.orderNo
            let status = props.row.original.status

            async function onDeliver(orderNo){
                console.log(orderNo)
                await deliverOrder(orderNo)
                return
            }
            // async function getBackOnClick(memberID){
            //     console.log(memberID)
            //     await getMembershipBack(memberID)
            //     return
            // }


            return (  
                (status == "Ordered") ? 
                    <button className="btn btn-outline-warning" 
                    onClick={() => onDeliver(orderNo)}
                    >Deliver</button>
                    
                :
                   <p className="text-success">Delivered</p>    
                
            )
        }
        
    },
    {
        Header: 'Status',
        accessor: 'status',
        Filter: ColumnFilter,
        
    },
    {
        Header: 'Order No',
        accessor: 'orderNo',
        Filter: ColumnFilter,
        
    },
    {
        Header: 'Date',
        accessor: 'date',
        Filter: ColumnFilter,
        
    },
    {
        Header: 'Time',
        accessor: 'time',
        Filter: ColumnFilter,
        
    },
    {
        Header: 'Items',
        accessor: 'items',
        Filter: ColumnFilter,
        style: {
            width: '20%'
        }
        
    },   
    {
        Header: 'Amount (Rs.)',
        accessor: 'subtotal',
        Filter: ColumnFilter,
        
    }, 
    {
        Header: 'Customer Name',
        accessor: 'username',
        Filter: ColumnFilter
    },
    {
        Header: 'Contact No',
        accessor: 'contactNo',
        Filter: ColumnFilter
    },
    {
        Header: 'Email',
        accessor: 'email',
        Filter: ColumnFilter
    },
    {
        Header: 'Address',
        accessor: 'address',
        Filter: ColumnFilter,
        style: {
            width: '20%'
        }
    },
    // {
    //     Header: 'Total Sales',
    //     accessor: 'sales',
    //     Filter: ColumnFilter
    // },
    // {
    //     Header: 'XS',
    //     accessor: 'XS',
    //     Filter: ColumnFilter
    // },    
    // {
    //     Header: 'S',
    //     accessor: 'S',
    //     Filter: ColumnFilter
    // },
    // {
    //     Header: 'M',
    //     accessor: 'M',
    //     Filter: ColumnFilter
    // },
    // {
    //     Header: 'L',
    //     accessor: 'L',
    //     Filter: ColumnFilter
    // },
    // {
    //     Header: 'XL',
    //     accessor: 'XL',
    //     Filter: ColumnFilter,
    // },
    // {
    //     Header: 'XXL',
    //     accessor: 'XXL',
    //     Filter: ColumnFilter,
    // }

]

// export const GROUPED_COLUMNS = [
    
//     {
//         Header: 'Name',
//         columns: [
//             {
//                 Header: 'Title',
//                 accessor: 'title',
//                 Filter: ColumnFilter
//             },
//             {
//                 Header: 'Name with Initials',
//                 accessor: 'nameWinitials',
//                 Filter: ColumnFilter
//             },
//             {
//                 Header: 'Full Name',
//                 accessor: 'fullName',
//                 Filter: ColumnFilter
//             },
//             {
//                 Header: 'First Name',
//                 accessor: 'commonFirst',
//                 Filter: ColumnFilter
//             },
//             {
//                 Header: 'Last Name',
//                 accessor: 'commomLast',
//                 Filter: ColumnFilter
//             }
//         ]
//     },
//     {
//         Header: 'Gender',
//         accessor: 'gender',
//         Filter: ColumnFilter,
//     },
//     {
//         Header: 'Date of Birth',
//         accessor: 'dob',
//         Filter: ColumnFilter,
//     },
//     {
//         Header: 'NIC',
//         accessor: 'nic',
//         Filter: ColumnFilter,
//     },
//     {
//         Header: 'Contact Information',
//         columns: [
//             {
//                 Header: 'Email',
//                 accessor: 'email',
//                 Filter: ColumnFilter
//             },
//             {
//                 Header: 'Mobile No',
//                 accessor: 'mobileNo',
//                 Filter: ColumnFilter
//             },
//             {
//                 Header: 'Fixed No',
//                 accessor: 'fixedNo',
//                 Filter: ColumnFilter
//             },
//             {
//                 Header: 'Residence Address',
//                 accessor: 'resAddrs',
//                 Filter: ColumnFilter
//             },
//             {
//                 Header: 'Permanent Address',
//                 accessor: 'perAddrs',
//                 Filter: ColumnFilter
//             }
//         ]
        
//     }
// ]