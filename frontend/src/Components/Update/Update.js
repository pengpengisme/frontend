import React, { useState } from "react";
import './Update.css'
import Updatepage1 from "./Updatepage1";
import Updatepage2 from "./Updatepage2";
import flow1 from "../../images/FLOW1.png"
import flow2 from "../../images/FLOW2.png"
import axios from "axios";

export const Update = () => {

    const [whichpage, setpage] = useState(1)
    const [formData, setFormData] = useState({
        page1: '',
        product_pic: []
    })


    const updatenextbutton = () => {
        const currentpage = whichpage;
        console.log("currentpage");
        let newpage = whichpage;
        if (currentpage !== 2) {
            newpage = whichpage + 1;
            setpage(newpage)
            console.log(formData)
        }else {
            newpage = 3;//跳轉頁面
            console.log(formData)
            handlesubmit()
        }

    }
    const updateprebutton = () => {
        const currentpage = whichpage;
        let newpage = whichpage;
        if (currentpage !== 1) {
            newpage = whichpage - 1;
            setpage(newpage)
        }
        else {
            newpage = 0;//跳轉頁面OR隱藏BUTTON
        }
    }

    const handleFormChange = (field, value) => {
        setFormData((prevFormData) => {
            if (field === 'product_pic') {
                // 如果更新的是照片陣列，將新選擇的照片加入到之前的照片陣列中
                return {
                    ...prevFormData,
                    product_pic: [...prevFormData.product_pic, ...value],
                };
            } else {
                // 其他欄位的更新
                return {
                    ...prevFormData,
                    [field]: value,
                };
            }
        });
    };

    const handlesubmit = () => {
        const formDataToUpload = new FormData();
        formDataToUpload.append('page1', JSON.stringify(formData.page1))

        // 將 product_pic 檔案列表添加到 formDataToUpload
        for (let i = 0; i < formData.product_pic.length; i++) {
            formDataToUpload.append('product_pic', formData.product_pic[i]);
        }

        console.log(formDataToUpload)

        const csrfToken = document.cookie.match(/csrftoken=([^;]+)/);

        axios.post('http://127.0.0.1:8000/api/upload_product/', formDataToUpload, {
            headers: {
                "X-CSRFToken": csrfToken,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                console.log('照片上傳成功！');
                // 在這裡可以更新頁面或做其他處理
            })
            .catch((error) => {
                console.error('照片上傳失敗：', error);
            });

    }


    return (
        <div className="update">
            <div className="updateflowtext">
                <p>輸入基本資訊</p>
                <p>上傳商品照</p>
            </div>
            {whichpage === 1 && <img src={flow1} className="flow" />}
            {whichpage === 1 && <Updatepage1 onChange={(value) => handleFormChange('page1', value)} />}

            {whichpage === 2 && <img src={flow2} className="flow" />}
            {whichpage === 2 && <Updatepage2 onChange={(value) => handleFormChange('product_pic', value)} />}

            <div className="buttonzone">
                <button onClick={updateprebutton} className="button81">上一步</button>
                <button onClick={updatenextbutton} className="button81">下一步</button>
            </div>
        </div>


    )



}

export default Update