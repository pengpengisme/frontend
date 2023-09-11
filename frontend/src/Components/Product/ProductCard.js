import React from 'react'
import { Link } from 'react-router-dom';
// import bag_img from '../../images/bag_2.jpg'

const ProductCard = ({data}) => {
    console.log(data);
    const pic = JSON.parse(data.pic)
    const pic_url = "http://127.0.0.1:8000/" + pic.info[0].url;
    console.log(pic_url);

    return (
            <div className='col-lg-3 col-md-6 col-sm-6 col-xs-6 col-4'>
            <Link className='text-dark' to='/bag'>
                <div className="product-card px-1">
                    <div className="product-image">
                        <img src={pic_url} alt="product image" className='img-fluid' style={{width: "400px", aspectRatio: 1 / 1}} />
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