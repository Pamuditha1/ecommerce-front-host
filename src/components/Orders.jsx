import React from 'react'
import { OrdersTable } from './tables/orders/ordersTable'

function Orders() {

    const tableStyle = {
        marginLeft: '-70px',
        marginRight: '-70px',
    }

    return (
        <div style={tableStyle}>
            <h6 style={{backgroundColor: "blueviolet"}} className="pl-5 pt-1 pb-1 mb-5">Orders</h6>
            <OrdersTable />
        </div>
    )
}

export default Orders
