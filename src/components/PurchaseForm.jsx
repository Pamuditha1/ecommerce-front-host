import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ProductImageUpload from './ProductImageUpload'
import { toast } from "react-toastify";


function PurchaseForm(props) {

    const [customerData, setcustomerData] = useState({
        id: '',
        name: '',
        email: '',
        contact: '',
        address: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect( async () => {
        if(props.userData) {
            setcustomerData({
                id: props.userData._id,
                name: props.userData.username,
                email: props.userData.email,
                contact: props.userData.contactNo,
                address: props.userData.address
            })
        }
    }, [props.userData])

    const onchange = (e) => {
        setcustomerData({
            ...customerData,
            [e.target.name] : e.target.value
        })
        // console.log(customerData)
    }

    const reload = () => {
        window.location.reload(false);
    }

    const submit = (e) => { 
        e.preventDefault()
        setLoading(true)
        props.setcustomer(customerData)
        props.setplaceAccess(true)
        // addProduct(customerData)
        console.log(customerData)
        console.log("Modal Customer", props.customer)
        setLoading(false)     
        
    }

    return (
        <div>
            <form className="container" autoComplete="off">                
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="form-group col-12">
                                <label htmlFor="name" className="col-5">Customer Name</label> 
                                <input onChange={onchange} value={customerData.name} className="form-control col-11 ml-3" type="text" id="name" name="name"/>
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="email" className="col-5">Email</label> 
                                <input onChange={onchange} value={customerData.email} className="form-control col-11 ml-3"  type="text" id="email" name="email" />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="contact" className="col-5">Contact No</label> 
                                <input onChange={onchange} value={customerData.contact} className="form-control col-11 ml-3" type="textarea" rows="4" id="contact" name="contact"/>
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="address" className="col-5">Address</label> 
                                <input onChange={onchange} value={customerData.address} className="form-control col-11 ml-3" type="text" id="address" name="address"/>
                            </div>
                            <div className="form-group col-12">
                                <center>
                                    <button onClick={submit} type="submit" className="btn btn-success">Confirm</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </form> 
        </div>
    )
}

export default PurchaseForm
