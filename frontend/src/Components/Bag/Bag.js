import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Bag.css"
import ImageSlider from "./ImageSlider"
import Comment from "./Comment/Comment"
const mId = sessionStorage.getItem('mId');

const Bag = () => {
    const params = useParams()
    let bagId = params.id
    const [bagInfo, setBag] = useState(0)
    let bagName = " "
    let bagPrice = 0
    let bagAge = 0
    let bagSize = "*"
    let bagCate = "-"
    let bagNote = "/"
    const [bagSlides, setBagSlides] = useState(" ")
    const [comments, setComment] = useState([{ "content": "Loading" }, { "content": 'Loading' }])
    let getData = async () => {
        //text info
        let product_info = await fetch(`http://127.0.0.1:8000/api/product/${bagId}`)
        let info = await product_info.json()
        setBag(info)

        //pictures
        try {
            let product_pic = await fetch(`http://127.0.0.1:8000/api/picture/${bagId}`)
            console.log(product_pic.status)
            if (product_pic.status == "404") {
                product_pic = " "
            }
            else {
                let pic = await product_pic.json()
                pic = pic.picture
                setBagSlides(pic)
            }
        }
        catch {
            console.log("no images")
        }
        //comments
        let comments = await fetch(`http://127.0.0.1:8000/api/comment/${bagId}`)
        comments = await comments.json()
        setComment(comments)
    }
    // console.log(comments[0])
    console.log(typeof (comments))
    // 使用useEffect来在组件加载时从数据库中获取数据
    useEffect(() => {
        getData()
    }, [bagId]);

    bagName = bagInfo.name
    bagPrice = bagInfo.price
    bagAge = bagInfo.age
    bagSize = bagInfo.size
    bagCate = bagInfo.category
    bagNote = bagInfo.note
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份需要加 1，並補齊兩位數
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        // 格式化日期時間為 YYYY-MM-DD HH:mm:ss
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const addToCart = () => {
        let currentDate = new Date();
        currentDate = formatDate(currentDate);
        let cartData = {
            mId: mId, //要可以抓到現在是誰在登入 userId
            pId: bagId,
            cartTime: currentDate
        }
        fetch('http://127.0.0.1:8000/api/member/addToCart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        })
    }

    const goToRent = () => {
        let rentData = {
            bagId: [bagId]
        }
        fetch('http://127.0.0.1:8000/api/goCheck/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rentData)
        })
        .then(response => {
            // 檢查後端回應是否為重定向回應 (HTTP 3xx)
            if (response.redirected) {
                // 在瀏覽器中進行重定向
                let url = '/checkout/'
                window.location.href = url
            }
        })
    }

    return (
        <div className="all_container">
            <div className="pic_container">
                <ImageSlider slides={bagSlides} />
            </div>
            <div className="right_container">
                <div className="info">
                    <div className="bag-texts" id='name'>{bagName}</div>
                    <div className="bag-texts" id='price'>NT$ {bagPrice}</div>
                    <hr class="area-divider"></hr>
                    <table className="bag-information-table">
                        <tr className="bag-texts">
                            <td>・使用年齡</td>
                            <td>{bagAge}年</td>
                        </tr>
                        <tr className="bag-texts">
                            <td>・尺寸</td>
                            <td>{bagSize}</td>
                        </tr>
                        <tr className="bag-texts">
                            <td>・類別</td>
                            <td>{bagCate}</td>
                        </tr>
                        <tr className="bag-texts">
                            <td>・備註</td>
                            <td>{bagNote}</td>
                        </tr>
                    </table>
                    <div className="info_buttons">
                        <button className="product-buttons" id="add-to-cart" onClick={addToCart}>加入租借車</button>
                        <button className="product-buttons" id="rent"onClick={goToRent}>立即租借</button>
                    </div>
                </div>
                <div className="comment_area">
                    <hr class="area-divider"></hr>
                    <div className="comment-title">留言區</div>
                    {
                        comments.map((comment) => {
                            return <Comment mId={comment.mId} content={comment.content} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Bag