const history = ({data}) => {
    return(
        <>
            <div className="bag_order_list">
                {data.map((item)=>{
                    let pic = JSON.parse(item.product_pic)
                    const pic_url = "http://127.0.0.1:8000/" + pic.info[0].url;
                    return (
                        <div className="bag_order" key={item.oId}>
                            <img src={pic_url} className="bag_order_img" alt={`Product ${item.oId}`} />
                            <div className="bag_order_info">
                                <div className="bag_order_info_word">{item.product_name}</div>
                                <div className="bag_order_info_word">租借日期: {item.startTime}</div>
                                <div className="bag_order_info_word">租借期限: {item.endTime}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
export default history;