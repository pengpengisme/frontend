import React, { useState, useEffect }from "react";
import "./Member.css";
import profile_img from "../../images/IMG_6259.JPG";
// import bag_img_1 from "../../images/bag_1.jpg";
// import bag_img_2 from "../../images/bag_2.jpg";
// import bag_img_3 from "../../images/bag_3.jpg";
// import bag_img_4 from "../../images/bag_4.jpg";
// import bag_img_5 from "../../images/bag_5.jpg";
import { BiEditAlt } from "react-icons/bi";

const Member = ({data}) => {
    const handleClick = () => {
        window.location.href = "/member_order";
    }

    const editClick = () => {
        window.location.href = "/member_edit";
    }

    const [likePic, setLikePic] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/member_likes/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((like_pic) => {
            console.log(like_pic);
            setLikePic(like_pic);
        })
        .catch((error) => {
            console.error("Error getting likes data:", error);
        });
    }, []);

    return (
        <div className="member_container">
            <div className="info_list">
                <div className="profile">
                    <div className="profile_info">
                        <img src={profile_img} className="profile_img"></img>
                    </div>
                    {data.map((item)=>
                        <div className="profile_detail">
                            <div className="icon">
                                <div className="profile_name">{item.name}</div>
                                <button type="button" className="editicon" onClick={editClick}><BiEditAlt /></button>
                            </div>
                            <div className="detail">電子郵件: {item.mail}</div>
                            <div className="detail">Peter代幣: 5042</div>
                            <div className="detail">關注中: 52</div>
                            <div className="detail"><button type="button" className="info_btn" onClick={handleClick}>我的訂單</button></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="info_list">
                <div className="title">收藏包款</div>
                <div className="bag_img_list">
                    {likePic.map((item) => {
                        let pic = JSON.parse(item.pId_pic)
                        const pic_url = "http://127.0.0.1:8000/" + pic.info[0].url;
                        return <img src={pic_url} className="bag_img" alt={`Bag ${item.id}`} />;
                    })}
                </div>
            </div>
        </div> 
    )
}

export default Member;