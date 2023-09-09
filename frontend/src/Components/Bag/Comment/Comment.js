import React, { useEffect, useState } from "react";
import "./Comment.css"

const mId = sessionStorage.getItem('mId');

const Comment = ({content, rank}) => {
    const  [username, setUsername] = useState("Loading")
    //留言的使用這頭像
    // const image = './images/userPhoto.png'
    // const userPic_style = {
    //     margin: "0",
    //     width: "45px",
    //     height: "45px",
    //     borderRadius: "100%",
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     backgroundImage: `url(${image})`,
    // };

    const getUserData = async() => {
        let userData = await fetch(`http://127.0.0.1:8000/api/member/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mId })
        })
        userData = await userData.json()
        setUsername(userData.username)
    }

    useEffect(() => {
        getUserData()
    }, [mId]);

    return (
        <div className="comments">
            <div className='right_part'>
                <div className='comment_info'>
                    <div className='userName'>{username}</div>
                </div>
                <div className='content'>{content}</div>
            </div>
        </div>
        
    )
}

export default Comment