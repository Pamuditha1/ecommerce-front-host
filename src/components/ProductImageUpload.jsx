import React, {useState} from 'react'
import axios from 'axios'
import { toast } from "react-toastify";

function ProductImageUpload(props) {

    // const [file, setFile] = useState('')
    // const [filePreview, setFilePreview] = useState('')
    // const [filename, setFilename] = useState('Choose File')

    const onChange = e => {
        props.setFile(e.target.files[0])
        props.setFilename(e.target.files[0].name)
        props.setFilePreview(URL.createObjectURL(e.target.files[0]))
    }

    const resetFile = e => {
        e.preventDefault()
        props.setFilePreview(null)
        props.setFile(null)
        props.setFilename(null)
    }

    // const onSubmit = async e => {
    //     e.preventDefault()
    //     const formData = new FormData()
    //     formData.append('file', file) 
    //     console.log(file)
    //     try{
    //         const res = await axios.post('http://localhost:3001/slaas/api/user/add-profilepic', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         })
    //         console.log(res)
    //         toast.success(res.data) 
    //     } 
    //     catch(err){
    //         console.log(err)
    //         toast.error(err.response.data) 
    //     }
    // }

    return (
        <div className="col-12 mb-2">
            <div className="row">
                <p className="text-center">Product Image</p>
            </div>

            <div className="row mt-3">
                <form onSubmit={props.onImageSubmit} className="col-8">
                    <div className="custom-file">
                        <input type="file" name="image" class="custom-file-input" id="image" onChange={onChange}/>
                        <label className="custom-file-label" htmlFor="image">{props.filename}</label>
                    </div>                   
                </form> 
                
                <div className="col-4">                        
                        {props.filePreview && (
                            <>
                                <div>
                                    <button type="reset" class="btn btn-danger" style={{width : "100%"}} onClick={resetFile}>Remove</button>
                                </div>
                            </>
                        )}
                </div> 
            </div> 
            
            <div className="row mt-5">
                <div className="col-2"></div>                
                <img className="col-8" style={{ width: "100%" }, { height: "auto"}} src={props.filePreview} />
                <div className="col-2"></div> 
            </div>       
        </div>
    )
}

export default ProductImageUpload
