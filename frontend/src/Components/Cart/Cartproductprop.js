import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './Cartproductprop.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const mId = sessionStorage.getItem('mId');

export const Cartproductprop = (props) => {

    const [cart, setcart] = useState([0, 0]);
    // const [pic, setpic] = useState([]);

    useEffect(() => {
        axios.post("http://127.0.0.1:8000/api/cart/", { mId: mId })
            .then(response => {
                // console.log(response.data)
                const updatecart = response.data.map(item => {
                    // console.log(item.pId_pic)
                    let pic = JSON.parse(item.pId_pic);
                    // console.log(pic)


                    return (
                        {
                            mId: item.mId,
                            pId: item.pId,
                            brand: item.pId_brand,
                            name: item.pId_name,
                            price: item.pId_price,
                            startTime: item.startTime,
                            endTime: item.endTime,
                            pic: "http://127.0.0.1:8000/" + pic.info[0].url,
                        }
                    )

                });
                // console.log(updatecart)
                setcart(updatecart);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    const handleDelete = (pId) => {
        axios.delete(`http://127.0.0.1:8000/api/cart/${pId}/`)
            .then(response => {
                // console.log(response.data.message);
                axios.post("http://127.0.0.1:8000/api/cart/", { mId: mId })
                    .then(response => {
                        const updatecart = response.data.map(item => {
                            // let pic = item.pId_pic.json()
                            let pic = JSON.parse(item.pId_pic)

                            return (
                                {
                                    mId: item.mId,
                                    pId: item.pId,
                                    brand: item.pId_brand,
                                    name: item.pId_name,
                                    price: item.pId_price,
                                    startTime: item.startTime,
                                    endTime: item.endTime,
                                    pic: "http://127.0.0.1:8000/" + pic.info[0].url,
                                }
                            )

                        });
                        // console.log(updatecart)
                        setcart(updatecart);
                    })

            })
            .catch(error => {
                console.log(error.response.data.error);
            });
    }

    return (
        <div className="cartproduct">
            {cart.map((cart_product) => (
                <div key={cart_product.pId} className="cartitem">

                    <div className="cartimage">
                        <img src={cart_product.pic} alt="Product Image" />
                    </div>

                    <div className="description">
                        <div className="brand">
                            <div className="brane_name_use_to_display_row">
                                <p className="brandandname">{cart_product.brand}</p>
                                <p className="brandandname">{cart_product.name}</p>
                            </div>
                            <p>NT${cart_product.price}</p>
                        </div>
                        <div className="sedate">
                            <p>開始日期：</p>
                            <p>{cart_product.startTime}</p>
                        </div>
                        <div className="sedate">
                            <p>歸還日期：</p>
                            <p>{cart_product.endTime}</p>
                        </div>
                    </div>
                    <button className="deletebutton" onClick={handleDelete.bind(null, cart_product.pId)}>刪除</button>
                </div>
            ))}
        </div>
    );

}


export default Cartproductprop;