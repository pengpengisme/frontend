import React from 'react'
import { Link } from 'react-router-dom';
import image123 from '../images/DSC06132.JPG'

const ItemCard = ({data}) => {
    return (
        // <div className='col-12 col-sm-6 col-md-3'></div>
        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-6 col-6'>
            <Link className='text-dark'>
                <div className="product-card">
                    <div className="product-image">
                        <img src={image123} alt="product image" className='img-fluid' />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">{data.brand}</h6>
                        <h5 className="product-title">{data.name}</h5>
                        <p className="price">NTD {data.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ItemCard