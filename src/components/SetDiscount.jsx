import React, {useState} from 'react'
import addDiscount from '../services/addDiscount'

function SetDiscount({discount, setDis, id}) {

    const [dis, setdis] = useState('')
    
    const submitDiscount = async () => {
        setDis(dis)
        let discountData = {
            id: id,
            discount: dis
        }
        console.log(discountData)
        await addDiscount(discountData)
    }

    return (
        <div className="col-12">
            <label htmlFor="productNo" className="col-4">Discount : </label> 
            <input value={dis} onChange={(e) => setdis(e.target.value)}  className="form-control col-5 ml-3" type="text" id="productNo" name="productNo"/>
            <div className="col-2">
                <button onClick={submitDiscount} className="btn btn-success">Set</button>
            </div>
            
        </div>
    )
}

export default SetDiscount
