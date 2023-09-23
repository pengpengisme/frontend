import React, { useState, useEffect } from "react";
import "./Member.css";
import profile_img from "../../images/IMG_6259.JPG";
import { BiEditAlt } from "react-icons/bi";

const mId = sessionStorage.getItem('mId');
console.log(mId)
const Member = ({ data }) => {
    const handleClick = () => {
        window.location.href = "/member_order";
    };

    const editClick = () => {
        window.location.href = "/member_edit";
    }

    const [likePic, setLikePic] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/member_likes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mId })
        })
            .then((response) => response.json())
            .then((like_pic) => {
                // console.log(like_pic);
                setLikePic(like_pic);
            })
            .catch((error) => {
                console.error("Error getting likes data:", error);
            });
    }, []);

    if (mId) {
        return (
            <div className="member_container">
                <div className="info_list">
                    <div className="profile">
                        <div className="profile_info">
                            <img src={data.defaultimg} className="profile_img"></img>
                        </div>
                        <div className="profile_detail">
                            <div className="icon">
                                <div className="profile_name">{data.username}</div>
                                <button type="button" className="editicon" onClick={editClick}><BiEditAlt /></button>
                            </div>
                            <div className="detail">電子郵件: {data.mail}</div>
                            <div className="detail">Peter代幣: 5042</div>
                            <div className="detail">關注中: 52</div>
                            <div className="detail"><button type="button" className="info_btn" onClick={handleClick}>我的訂單</button></div>
                        </div>
                    </div>
                </div>
                <div className="info_list">
                    <div className="title">收藏包款</div>
                    <div className="bag_img_list">
                        {likePic.map((item) => {
                            let pic = JSON.parse(item.pId_pic)  //because資料庫存的json檔
                            const pic_url = "http://127.0.0.1:8000/" + pic.info[0].url;
                            return <img src={pic_url} className="bag_img" alt={`Bag ${item.id}`} />;
                        })}
                    </div>
                </div>
            </div>
        )
    } else {
        window.location.href = "/login";
    }
}

export default Member;