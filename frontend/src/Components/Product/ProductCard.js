import React from 'react'
import { Link } from 'react-router-dom';
import bag_img from '../../images/bag_2.jpg'

const ProductCard = ({data}) => {
    return (
            <div className='col-lg-3 col-md-6 col-sm-6 col-xs-6 col-4'>
            <Link className='text-dark' to='/bag'>
                <div className="product-card px-1">
                    <div className="product-image">
                        <img src={bag_img} alt="product image" className='img-fluid' style={{width: "400px"}} />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">{data.brand}</h6>
                        <h5 className="product-title pt-3">{data.name}</h5>
                        <p className="price">NTD {data.price}</p>
                    </div>
                </div>
            </Link>
            </div>
        
    );
}

export default ProductCard