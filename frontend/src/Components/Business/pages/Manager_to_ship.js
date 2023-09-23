import $ from 'jquery';
function Manager_to_ship({data}){
    const editClick = (pId, index) => {
        const product = data.find((item) => item.pId === pId);
        const updatedData = {
            pId: product.pId,
            name: product.name,
            description: product.description,
            price: product.price,
            brand: product.brand,
            age: product.age,
            size: product.size,
            likes: product.likes,
            state: "renting",
        };
            
        $.ajax({
            url:`http://127.0.0.1:8000/api/update_product/${updatedData.pId}/`,
            method:"POST",
            data:updatedData,
            dataType:"json"
        }).done(function(){
            alert("商品已出貨!");
            $('.bag_order').eq(index).css("display", "none");
        });
    }

    return(
        <div className="bag_order_list">
            {data.map((item, index)=>{
                let pic = JSON.parse(item.pic)
                const pic_url = "http://127.0.0.1:8000/" + pic.info[0].url;

                return(
                <div className="bag_order">
                    <img src={pic_url} className="bag_order_img"></img>
                    <div className="bag_order_info padding">
                        <div className="bag_order_info_title">{item.brand}</div>
                        <div className="bag_order_info_word word_color">{item.name}</div>
                        <button className='btn_one' key={item.pId} onClick={() => editClick(item.pId, index)}><div>完成出貨</div></button>
                    </div>
                </div>
                );
            })}
        </div>
    )
}
export default Manager_to_ship;