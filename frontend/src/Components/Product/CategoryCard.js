import React from 'react'
import category_img from "../../images/bag_5.jpg";

const CategoryCard = (props) => {
    const data = props.data;
    return (
        <section className='blog-wrapper pt-0 pb-5 home-wrapper-2'>
            <div className="row text-center">
                <h2 className='text'>Category</h2>
            </div>
            <div className='row'>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 col-2 mb-5'>
                    <div className="category-card">
                        <div className="category-image" style={{backgroundImage: {category_img}}}>
                            <img src={category_img} alt="category image" className='img-fluid'/>
                        </div>
                        <div className="category-details">
                            <h5 className="category-title">LV BaoBao</h5>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 col-2 mb-5'>
                    <div className="category-card">
                        <div className="category-image">
                            <img src={category_img} alt="category image" className='img-fluid' />
                        </div>
                        <div className="category-details">
                            <h5 className="category-title">LV Tote Bag</h5>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 col-2 mb-5'>
                    <div className="category-card">
                        <div className="category-image">
                            <img src={category_img} alt="category image" className='img-fluid' />
                        </div>
                        <div className="category-details">
                            <h5 className="category-title">LV Pouch</h5>
                        </div>    
                    </div>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 col-2 mb-5'>
                    <div className="category-card">
                        <div className="category-image">
                            <img src={category_img} alt="category image" className='img-fluid' />
                        </div>
                        <div className="category-details">
                            <h5 className="category-title">LV Buckeet</h5>
                        </div>    
                    </div>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 col-2 mb-5'>
                    <div className="category-card">
                        <div className="category-image">
                            <img src={category_img} alt="category image" className='img-fluid' />
                        </div>
                        <div className="category-details">
                            <h5 className="category-title">LV Wallet</h5>
                        </div>    
                    </div>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 col-2 mb-5'>
                    <div className="category-card">
                        <div className="category-image">
                            <img src={category_img} alt="category image" className='img-fluid' />
                        </div>
                        <div className="category-details">
                            <h5 className="category-title">LV Business Bags</h5>
                        </div>    
                    </div>
                </div>
            </div>

        </section>
    );
}

export default CategoryCard