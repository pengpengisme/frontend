import React from "react"
import './Cart.css';
// import CARTPRODUCT from "./Cartproduct";
import Cartproductprop from "./Cartproductprop";


export const Cart = () => {
    return (
        <div className="cart">
            {/* <p className="carttitle">shopping cart</p> */}

            {/* <div className="cartproductall">
                {CARTPRODUCT.map((product) => <Cartproductprop
                    key={product.id}
                    data={product} />
                )}
            </div> */}

            {/* <div className="cartnavdown">
                <table className="cartdowntable">
                    <tr><td className="cartnavleft">共計</td><td className="cartnavright">1件商品</td><td rowSpan={2}><button className="okbuttom">結帳</button></td></tr>
                    
                    <tr><td className="cartnavleft">總共</td><td className="cartnavright">10020元</td></tr>

                </table>
            </div> */}
        </div>
    )


}
export default Cart;