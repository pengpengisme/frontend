import React, { useState } from "react";
import "./Member.css";

import DataProvider from '../Dataprovider';
import History from "./pages/History";
import Waiting_payment from "./pages/Waiting_payment";
import Waiting_received from "./pages/Waiting_received";
import Waiting_shipped from "./pages/Waiting_shipped";

const Member_test = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [1, 2, 3, 4];
    const pageNames = ["歷史訂單", "出貨中", "配送中", "租借中"];

    const setPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="member_container">
            <div className="info_list">
                <div className="title">我的訂單</div>
                <div className="line"></div>
                <div className="bag_order_all">
                    <div className="btn_list">
                        {pageNumbers.map((pageNumber, index) => (
                            <div className="btn_list_btn" key={pageNumber}>
                                <button className={currentPage === pageNumber ? "btn_active" : "btn_inactive"} onClick={() => setPage(pageNumber)}>{pageNames[index]}</button>
                            </div>
                        ))}
                    </div>
                    <div className="forpages">
                        {currentPage === 1 && <DataProvider endpoint="http://127.0.0.1:8000/api/member/member_order/?state=history" render={data => <History data={data} />} />}
                        {currentPage === 2 && <DataProvider endpoint="http://127.0.0.1:8000/api/member/member_order/?state=to_ship" render={data => <Waiting_payment data={data} />} />}
                        {currentPage === 3 && <DataProvider endpoint="http://127.0.0.1:8000/api/member/member_order/?state=delivery" render={data => <Waiting_received data={data} />} />}
                        {currentPage === 4 && <DataProvider endpoint="http://127.0.0.1:8000/api/member/member_order/?state=renting" render={data => <Waiting_shipped data={data} />} />}
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default Member_test;
