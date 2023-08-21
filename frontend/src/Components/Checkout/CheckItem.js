import React, { useEffect, useState } from 'react'
import './Checkout.css'
import image from "../../images/bag_2.jpg";

const CheckItem = ({ bagId }) => {
    let bag = bagId
    const [info, setInfo] = useState({})
    const [bagPic, setPic] = useState(' ')
    let getData = async () => {
        let pic_url = ""
        //text info
        let product_info = await fetch(`http://127.0.0.1:8000/api/product/${bag}`)
        let info = await product_info.json()
        setInfo(info)
        console.log(info)
        let product_pic = await fetch(`http://127.0.0.1:8000/api/picture/${bag}`)
        console.log(product_pic.status)
        if (product_pic.status == "404") {
            product_pic = " "
        }
        else {
            let pic = await product_pic.json()
            pic = pic.picture
            pic = JSON.parse(pic)
            pic_url = "http://127.0.0.1:8000/" + pic.info[0].url
            setPic(pic_url)
        }
    }

    useEffect(() => {
        getData()
    }, [bagId])
    // console.log(info)
    var payImage_style = {
        width: "130px",
        height: "80px",
        border: "1.5px solid rgb(151, 151, 150)",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${bagPic})`

    };
    return (
        <div className='check-item'>
            <div className='check-item-title-container'>
                <div style={payImage_style}></div>
                <div className='check-item-titleText-container'>
                    <div id="check-product-name">{info.name}</div>
                    <div className="check-texts" id='check-item-price'>NT ${info.price}</div>
                </div>
            </div>
            <table className="check-information-table">
                <tbody>
                    <tr className="check-texts">
                        <td>使用年齡</td>
                        <td>{info.age}年</td>
                        <td>&emsp;&emsp;尺寸</td>
                        <td>{info.size}</td>
                    </tr>
                    <tr className="check-texts">
                        <td>類別</td>
                        <td>肩背包</td>
                        <td>&emsp;&emsp;備註</td>
                        <td>無</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CheckItem