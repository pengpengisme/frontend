import React from "react";
import "../Business.css";

function Manager_file_update({data}){
    const editClick = (pId) => {
        window.location.href = `/product_edit/${pId}`;
    }

    return(
        <div className="bag_order_list">
            {data.map((item)=>{
                let pic = JSON.parse(item.pic)
                const pic_url = "http://127.0.0.1:8000/" + pic.info[0].url;

                return(
                <div className="bag_order">
                    <img src={pic_url} className="bag_order_img"></img>
                    <div className="bag_order_info padding">
                        <div className="bag_order_info_title">{item.brand}</div>
                        <div className="bag_order_info_word word_color">{item.name}</div>
                        <button className='btn_one' key={item.pid} onClick={() => editClick(item.pId)}><div>去瑕疵檢驗</div></button>
                    </div>
                </div>
                );
            })}
        </div>


    )
}
export default Manager_file_update;