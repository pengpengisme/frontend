import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard';
import Slideshow from './slideshow';
import CategoryCard from './CategoryCard';

const SearchResult = ({ data }) => {
    console.log(data);
    // return (
    //     <>
    //         <section className='home-wrapper-1 '>
    //             <div className='d-flex flex-column'>
    //                 <div className='row justify-content-center' style={{ padding: 0 }}>
    //                     {/* <div className='col' style={{padding:0}}>
    //           <Slideshow/>
    //         </div> */}
    //                 </div>
    //             </div>
    //         </section>
    //         <section className='row pt-3'>
    //             <div className='col text-center'>
    //                 <h2 className='text'>New Items</h2>
    //             </div>
    //         </section>
    //         <section className='blog-wrapper pt-0 pb-5 home-wrapper-2'>
    //             <div className="row">
    //                 {data.map((element, key) =>
    //                     <ProductCard key={key} data={element} />
    //                 )}
    //             </div>
    //         </section>
    //         <section className='blog-wrapper pt-0 pb-5 home-wrapper-2'>
    //             <div className='row'>
    //                 <CategoryCard />
    //             </div>
    //         </section>
    //     </>
    // )
}

export default SearchResult