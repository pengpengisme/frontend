import React, { useEffect, useState } from "react";
import './Checkout.css'
import CheckItem from "./CheckItem";
const mId = sessionStorage.getItem('mId');

const Checkout = () => {
    const [checkBags, setCheckBags] = useState([1, 1, 1]) //先設一個array讓他可以map through
    const getCheck = async () => {
        let checkList = await fetch('http://127.0.0.1:8000/api/getCheck/', {
            method: 'POST'
        })
        checkList = await checkList.json()
        console.log("checklist", checkList)
        setCheckBags(checkList)
    }
    useEffect(() => {
        getCheck()
    }, []);

    console.log("-------")
    const [price, setPrice] = useState(0)
    let freight = 100
    let totoalPrice = price + freight
    const getPrice = async () => {
        console.log(checkBags[0])
        let bagPrice = await fetch(`http://127.0.0.1:8000/api/product/${checkBags[0]}`)
        bagPrice = await bagPrice.json()
        bagPrice = bagPrice.price
        console.log('step3')
        setPrice(bagPrice)
        console.log(price)
    }
    useEffect(() => {
        getPrice()
    }, [checkBags]);

    var open = false;
    const check_ToggleInformation = () => {
        const information = document.querySelector(".information-container")
        const form = document.querySelector(".check-form-container")
        if (!open) {
            information.style.transform = 'translateY(0px)';
            form.style.transform = 'translateY(0px)'
            open = true;
        }
        else if (open) {
            information.style.transform = 'translateY(-500px)'
            form.style.transform = 'translateY(-441px)'
            open = false;
        }
    }

    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    let invalid_date = true
    let date1Obj = new Date(date1);
    let date2Obj = new Date(date2);
    const timeDifference = date2Obj.getTime() - date1Obj.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    const handleDate1Change = (event) => {
        setDate1(event.target.value);
    };

    const handleDate2Change = (event) => {
        setDate2(event.target.value);
    };
    useEffect(() => {
        // 確保 date1 和 date2 都有值時才進行比較
        if (date1 && date2 && date1 > date2) {
            // 如果 date1 晚於 date2
            invalid_date = true
        }
        else if (date1 && date2 && date1 < date2) {
            invalid_date = false
        }
    }, [date1, date2]);
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
    const SubmitCheck = () => {
        let orderDate = new Date();
        orderDate = formatDate(orderDate);
        let orderData = {
            mId: mId,
            pId: checkBags[0],
            payment: totoalPrice,
            order_time: orderDate,
            duration: daysDifference,
            address: "哈囉地址",
            state: "to_ship",
            startTime: date1,
            endTime: date2
        }
        if (!invalid_date) {
            fetch('http://127.0.0.1:8000/api/member/updateOrder/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            }).then(response => {
                // 檢查後端回應是否為重定向回應 (HTTP 3xx)
                if (response.redirected) {
                    // 在瀏覽器中進行重定向
                    let url = '/endcheck/'
                    window.location.href = url
                }
            })
        }
        else {
            let invalid = document.getElementById("invalid-date")
            invalid.style.display = 'block'
        }
    }
    console.log("total:", totoalPrice)
    return (
        <div className="checkoutBackground">
            <div className="check-form-page">
                <div className="check-form-container">
                    <form className="check-form">
                        <div className="check-form-up">
                            <div className="input-label">電子郵件</div>
                            <input type="email" placeholder="E-mail" className="information-input" id="email-input"></input>
                            <div className="check-and-text-comb">
                                <input type="checkbox"></input>
                                <div id="check-peter-information">我想接收關於PETER的優惠資訊</div>
                            </div>
                        </div>

                        <div className="check-form-down">
                            <div className="input-label">配送資訊</div>
                            <div className="name-input-container">
                                <input placeholder="姓" className="information-input" id="lastname-input"></input>
                                <input placeholder="名" className="information-input" id="firstname-input"></input>
                            </div>
                            <div className="address-input-container-a">
                                <div className="select-container" >
                                    <select id="check-city" className="information-input-select">
                                        <option value="">縣市</option>
                                        <option>基隆</option>
                                        <option>台北</option>
                                        <option>新北</option>
                                        <option>桃園</option>
                                        <option>新竹</option>
                                        <option>苗栗</option>
                                        <option>台中</option>
                                        <option>彰化</option>
                                        <option>南投</option>
                                        <option>雲林</option>
                                        <option>嘉義</option>
                                        <option>台南</option>
                                        <option>高雄</option>
                                        <option>屏東</option>
                                        <option>宜蘭</option>
                                        <option>花蓮</option>
                                        <option>台東</option>
                                    </select>
                                </div>
                                <input placeholder="詳細地址" className="information-input" id="firstname-input"></input>
                            </div>

                            <div className="address-input-container-b">
                                <input placeholder="開始日期" className="information-input" id="data-start-input" type="date" value={date1} onChange={handleDate1Change}></input>
                                <input placeholder="結束日期" className="information-input" id="data-end-input" type="date" value={date2} onChange={handleDate2Change}></input>
                            </div>
                            <input placeholder="連絡電話" className="information-input"></input>
                            <input placeholder="備註" className="information-input"></input>
                        </div>
                    </form>
                </div>
            </div>


            <div className="check-information">
                <div className="phone-information-toggle">
                    <button className="phone-button" onClick={check_ToggleInformation}>展開購買資訊</button>
                </div>
                <div className="information-container">
                    {   /* map through checkList */
                        checkBags.map((bagid) => {
                            console.log(bagid)
                            return <CheckItem bagId={bagid} />
                        })
                    }
                    <div className="check-final-price">
                        <div className="price-comb">
                            <div>小計</div>
                            <div>$ {price}</div>
                        </div>
                        <div className="price-comb">
                            <div>運費</div>
                            <div>$ {freight}</div>
                        </div>
                        <div className="price-comb" id="check-total-price">
                            <div>合計</div>
                            <div>$ {totoalPrice}</div>
                        </div>

                        <div className="check-button">
                            <button className="check-final-button" onClick={SubmitCheck}>送出訂單</button>
                        </div>
                        <div id="invalid-date"><p>date is invalid!</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout