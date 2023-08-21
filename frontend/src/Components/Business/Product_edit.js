import React from "react";

const Product_edit = ({data}) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            pId : data.pId,
            name: event.target.name.value,
            description: event.target.description.value,
            price: event.target.price.value,
            brand: event.target.brand.value,
            age: event.target.age.value,
            size: event.target.size.value,
            likes: data.likes,
            state: ["to_ship", "delivery", "renting"].includes(data.state) ? event.target.state.value : data.state
        };

        fetch(`http://127.0.0.1:8000/api/update_product/${updatedData.pId}/`, {
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert("修改成功!");
            window.location.href = "/business";
        })
        .catch((error) => {
            console.error("Error updating data:", error);
        });
    };

    return (
        <div className="member_container">
            <div className="info_list">
                <div className="edit_title">編輯商品資料</div>
                {data && (
                    <div className="edit_list">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="edit_name">・名稱</div>
                                <div className="mb-3"><input type="text" className="edit_input" name="name" autoCorrect="off" autoCapitalize="off" defaultValue={data.name}></input></div>
                            </div>
                            <div>
                                <div className="edit_name" style={{width:"35%"}}>・產品描述</div>
                                <div className="mb-3"><textarea type="text" rows="8" className="edit_input" name="description" autoCorrect="off" autoCapitalize="off" defaultValue={data.description}></textarea></div>
                            </div>
                            <div>
                                <div className="edit_name">・價格</div>
                                <div className="mb-3"><input type="text" className="edit_input" name="price" autoCorrect="off" autoCapitalize="off" defaultValue={data.price}></input></div>
                            </div>
                            <div>
                                <div className="edit_name">・品牌</div>
                                <div className="mb-3"><input type="text" className="edit_input" name="brand" autoCorrect="off" autoCapitalize="off" defaultValue={data.brand}></input></div>
                            </div>
                            <div>
                                <div className="edit_name">・年齡</div>
                                <div className="mb-3"><input type="text" className="edit_input" name="age" autoCorrect="off" autoCapitalize="off" defaultValue={data.age}></input></div>
                            </div>
                            <div>
                                <div className="edit_name">・尺寸</div>
                                <div className="mb-3"><input type="text" className="edit_input" name="size" autoCorrect="off" autoCapitalize="off" defaultValue={data.size}></input></div>
                            </div>
                            {["to_ship", "delivery", "renting"].includes(data.state) && (
                                <div>
                                    <div className="edit_name">・狀態</div>
                                    <div className="mb-3">
                                        <select name="state" className="edit_input" defaultValue={data.state}>
                                            <option value="to_ship">出貨中</option>
                                            <option value="delivery">配送中</option>
                                            <option value="renting">租借中</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            <div className="manager_btn_outline"><input className="edit_btn edit_float" type="submit" value="確認修改"></input></div>
                        </form>
                    </div>
                )} 
            </div>
        </div>
    )
}
export default Product_edit;