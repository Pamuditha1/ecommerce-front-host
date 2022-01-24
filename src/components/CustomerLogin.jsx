import React, {useState} from 'react'
import customerLogin from '../services/customerLoginService'
import {Link} from 'react-router-dom'

function CustomerLogin() {

    const [loginData, setloginData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const onchange = (e) => {
        setloginData({
            ...loginData,
            [e.target.name] : e.target.value
        })
        // console.log(customerData)
    }
    const reload = () => {
        window.location.reload(false);
    }

    const submit = async (e) => { 
        e.preventDefault()
        setLoading(true)
        const jwt = await customerLogin(loginData)
        localStorage.setItem('token', jwt)
        // addProduct(customerData)
        console.log(loginData)
        setLoading(false)     
        
    }

    return (
        <div>
            <center>
                <Link to="/user/login">                                    
                    <button type="button" className="btn btn-light">Not Registered Yet? Register</button>
                </Link>                
            </center>
            <form className="container mt-5">                
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="form-group col-12">
                                <label htmlFor="email" className="col-5">Email</label> 
                                <input onChange={onchange} value={loginData.email} className="form-control col-11 ml-3"  type="text" id="email" name="email" />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="password" className="col-5">Password</label> 
                                <input onChange={onchange} value={loginData.password} className="form-control col-11 ml-3" type="password" id="password" name="password"/>
                            </div>
                            <div className="form-group col-12 mt-3">
                                <center>
                                    <button onClick={submit} type="submit" className="btn btn-success">Login</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </form> 
        </div>
        
    )
    
}

export default CustomerLogin
