import React from "react";
// import { SlCheck } from "react-icons/sl";

const Member_edit = ({ data }) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            mId: data.mId,
            username: event.target.name.value,
            first_name: data.first_name,
            password: "NULL",
            gender: data.gender,
            credit_card: event.target.credit_card.value,
            mail: event.target.email.value,
            address: event.target.address.value,
            tokens: data.tokens,
            lastlogin: data.lastlogin,
            lastname: data.lastname,
            defaultimg: data.defaultimg
        };
        fetch(`http://127.0.0.1:8000/api/member/updateMember/${updatedData.mId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("修改成功");
                window.location.href = "/member";

            }).catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    return (
        <div className="member_container">
            <div className="info_list">-
                <div className="edit_title">編輯會員資料</div>
                    <div className="edit_list">
                        <form onSubmit={handleSubmit}>
                            <div className="edit_flex">
                                <div className="edit_name">・姓名</div>
                                <div className="mb-3"><input type="text" className="edit_input" name="name" autoCorrect="off" autoCapitalize="off" defaultValue={data.username}></input></div>
                            </div>
                            <div className="edit_flex">
                                <div className="edit_name">・電郵</div>
                                <div className="mb-3"><input type="text" className="edit_input" name="email" autoCorrect="off" autoCapitalize="off" defaultValue={data.mail}></input></div>
                            </div>
                            {/* <div className="edit_flex">
                                <div className="edit_name">・密碼</div>
                                <div className="mb-3"><input type="password" className="edit_input" name="password" autoCorrect="off" autoCapitalize="off" defaultValue={data.password}></input></div>
                            </div> */}
                            <div className="edit_flex">
                                <div className="edit_name">・地址</div>
                                <div className="mb-3"><input type="text" className="edit_input" name="address" autoCorrect="off" autoCapitalize="off" defaultValue={data.address}></input></div>
                            </div>
                            <div className="edit_flex">
                                <div className="edit_name">・信用卡卡號</div>
                                <div className="mb-3"><input type="text" className="edit_input" name="credit_card" autoCorrect="off" autoCapitalize="off" defaultValue={data.credit_card}></input></div>
                            </div>
                            <div className="btn_outline"><input className="edit_btn" type="submit" value="確認修改"></input></div>
                        </form>
                    </div>
            </div>
        </div>
    )
}
export default Member_edit;