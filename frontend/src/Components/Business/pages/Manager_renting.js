function Manager_renting({data}){
    
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
                    </div>
                </div>
                );
            })}
        </div>
    )
}
export default Manager_renting;