import React, { useEffect, useState } from 'react'
import {Table, Button} from 'reactstrap'
import ViewProductImage from '../components/ViewProductImage'

function CartTable({cart, removeFromCart,cCount}) {

    // const [subTotal, setsubTotal] = useState(0)

    let ttotal = 0 
    cart.forEach(e=> {
        ttotal = ttotal + e.user.total
    });

    const tableStyle = {
        backgroundColor: "white",
        marginTop: '3%'
    }

    return (
        
        <div>            
                <Table hover borderless style={tableStyle}>
                    <thead className="text-center">
                        <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((p) => {
                            // setsubTotal(subTotal + p.user.total)
                            return (
                            <tr>
                                <td>
                                    <div className="row">
                                        <div className="col-3 ml-3"><ViewProductImage proNo={p.productNo} height="100" width="100"/></div>
                                        <div className="col-7 mt-2">
                                            <p>{p.productNo}</p>
                                            <p><strong style={{marginRight: "40%"}}>{p.productName}</strong> Size: <strong>{p.user.size}</strong></p>                                        
                                        </div>                                        
                                    </div>
                                </td>
                                <td className="text-center mt-3">{p.user.quantity}</td>
                                <td className="text-center">Rs. {p.price}</td>
                                <td className="text-center"><strong>{p.user.total}</strong></td>
                                <td>
                                    <Button color="danger" onClick={() => removeFromCart("neww")}> <strong>X Remove</strong> </Button>
                                </td>
                            </tr>
                            )
                        })
                        } 
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <h6><strong>Subtotal - Rs. {ttotal}</strong></h6>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                    </Table>
                    {(cCount == 0) && <h3 className="text-center mt-5">Your Cart is Empty</h3>}               
                    
                    
        
        </div>
    )
}

export default CartTable
