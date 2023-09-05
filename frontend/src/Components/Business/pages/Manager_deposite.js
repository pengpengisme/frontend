import $ from 'jquery';

function Manager_deposite({data}){
    const editClick = (pId) => {
        window.location.href = `/product_edit/${pId}`;
    }
    
    const takeoff = (pId, index) => {
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
            state: "takeoff",
        };
            
        $.ajax({
            url:`http://127.0.0.1:8000/api/update_product/${updatedData.pId}/`,
            method:"POST",
            data:updatedData,
            dataType:"json"
        }).done(function(){
            alert("商品已下架!");
            $('.bag_order').eq(index).css("display", "none");
        });
    };
    
    return(
        <div className="bag_order_list">
            {data.map((item, index)=>{
                let pic_url;
                if(item.pic){
                    let pic = JSON.parse(item.pic);
                    pic_url = "http://127.0.0.1:8000/" + pic.info[0].url;
                }else{
                    pic_url = "";
                }

                return(
                <div className="bag_order">
                    <img src={pic_url} className="bag_order_img"></img>
                    <div className="bag_order_info padding">
                        <div className="bag_order_info_title">{item.brand}</div>
                        <div className="bag_order_info_word word_color">{item.name}</div>
                        <button className='func_btn btn_1' onClick={() => takeoff(item.pId, index)}><div>下架商品</div></button>
                        <button className='func_btn btn_2' key={item.pId} onClick={() => editClick(item.pId)}><div>編輯商品</div></button>
                    </div>
                </div>
                );
            })}
        </div>
    )
}
export default Manager_deposite;