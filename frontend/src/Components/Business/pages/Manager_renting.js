function Manager_renting({data}){
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
                        <button className='func_btn btn_1'><div>取消訂單</div></button>
                        <button className='func_btn btn_2' key={item.pid} onClick={() => editClick(item.pId)}><div>編輯訂單</div></button>
                    </div>
                </div>
                );
            })}
        </div>
    )
}
export default Manager_renting;