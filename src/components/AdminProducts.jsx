import React, {useState, useEffect} from 'react'
import getAllProductsAdmin from '../services/getAllProductsAdmin'
import ViewProductImage from './ViewProductImage.jsx';
import ProductModal from './modals/ProductModal.jsx';
import AdminProductModal from './modals/AdminProductModal.jsx';
import {Link, Route, Switch} from 'react-router-dom'
import { Button, Modal} from 'reactstrap';




function AdminProducts(props) {

    const [allProducts, setallProducts] = useState([])
    const [isModalOpen, setisModalOpen] = useState(false)
    const [modalProduct, setmodalProduct] = useState({})

    useEffect(() => {
        // setIsLoading(true) 
        async function fetchAllProducts() {
            const products = await getAllProductsAdmin();
            console.log("products", products)
            setallProducts(products)
            console.log('All products', allProducts)
        } 
        fetchAllProducts() 
        
        // setIsLoading(false)
    }, []);

    const productNameStyle = {
        backgroundColor: "hsl(0, 0%, 100%, 0.7)",
        color: 'black'
    }
    const productPriceStyle = {
        color: 'black',
        marginTop: '90%',
        marginBottom: '0',
        backgroundColor: "#00B2FF",
        borderRadius: '10px',
        opacity: '0.7'
    }

    const viewModal = (p) => {
        setmodalProduct(p)
        setisModalOpen(true)
        console.log(p)
    }

    return (
        <div>
            <div className="row">
            {
                allProducts &&

                allProducts.map((product) => (
                    <div className="card bg-dark text-white m-4" key={product._id}>
                        <ViewProductImage proNo={product.productNo} height="200" width="200"/>
                        <div className="card-img-overlay">
                            <h6 className="card-title" style={productNameStyle}>{product.productName}</h6>
                            <center>
                                <p className="card-text" style={productPriceStyle}><strong>Rs. {product.price}</strong></p>
                                <button onClick={() => viewModal(product)} className="btn btn-outline-primary">View</button>
{/*                                 
                                <Link to={`/admin/updateitem/${product._id}`}>                            
                                    <Button color="warning" id={product._id}>Update Item</Button>
                                </Link> */}
                    
                            </center>                            
                        </div>
                    </div>
                    
                    // <div class="card m-4" style={{maxWidth: "18rem"}}>
                    //     {/* <div class="card-header">{product.productName}
                    //         <strong className="float-right">Rs. {product.price}</strong>
                    //     </div> */}
                    //     <div>
                    //         <ViewProductImage proNo={product.productNo}/>
                    //         <div class="card-img-overlay" style={{color: 'yellow'}}>{product.productName}
                    //             <strong className="float-right">Rs. {product.price}</strong>
                    //         </div>
                    //         <div class="card-img-overlay" style={{color: 'yellow'}}>{product.productName}
                    //             <strong className="float-right">Rs. {product.price}</strong>
                    //         </div>
                    //     </div>
                    // </div>
                
                    // <div class="card-deck" id="mensWear">
                    //     <div class="col-md-3 col-xs-6 ">
                    //         <div class="card cardStyle">
                    //             <ViewProductImage proNo={product.productNo}/>
                    //                 <div class="card-img-overlay">
                    //                     <h5 class="card-title cardT">{product.productName}</h5>
                    //                     <p class="price">{product.price}</p>
                    //                     <button type="button" class="btn btn-info productDetails" data-toggle="modal" data-target="#M001" 
                    //                     >View</button>
                    //                 </div>
                    //         </div>
                    //     </div>
                    // </div>

                    
                ))          
            }
            <AdminProductModal isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} product={modalProduct}/> 
                {/* <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setisModalOpen(false)}
                    contentLabel="Minimal Modal Example"
                >   
                    <h1>Hello</h1>
                    <p>hbhbfhwfhbhb</p>
                </Modal> */}
            </div>
            
        </div>
    )
}

export default AdminProducts
