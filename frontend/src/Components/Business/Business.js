import React, { useState } from "react";
import DataProvider from "../Dataprovider";
import Deposite from './pages/Manager_deposite';
import To_ship from "./pages/Manager_to_ship";
import Delivery from './pages/Manager_delivery';
import Renting from './pages/Manager_renting';
import Takeoff from './pages/Manager_takeoff';

const Business= () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [1, 2, 3, 4, 5];
    const pageNames = ["倉庫存放中", "出貨中", "配送中", "租借中", "已下架商品"];

    const setPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const updateDataForPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <div className="member_container">
            <div className="info_list">
                <div className="title">商品管理</div>
                <div className="line"></div>
                <div className="bag_order_all">
                    <div className="btn_list business_btn">
                        {pageNumbers.map((pageNumber, index) => (
                            <div className="btn_list_btn page_btn" key={pageNumber}>
                                <button className={currentPage === pageNumber ? "btn_active" : "btn_inactive"} onClick={() => setPage(pageNumber)} >{pageNames[index]}</button>
                            </div>
                        ))}
                    </div>
                    <div className="forpages">
                        {currentPage === 1 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=deposite" render={data => <Deposite data={data} onUpdateData={() => updateDataForPage(1)} />} />}
                        {currentPage === 2 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=to_ship" render={data => <To_ship data={data} onUpdateData={() => updateDataForPage(2)} />} />}
                        {currentPage === 3 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=delivery" render={data => <Delivery data={data} onUpdateData={() => updateDataForPage(3)} />} />}
                        {currentPage === 4 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=renting" render={data => <Renting data={data} onUpdateData={() => updateDataForPage(4)} />} />}
                        {currentPage === 5 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=takeoff" render={data => <Takeoff data={data} onUpdateData={() => updateDataForPage(5)} />} />}
                    </div>
                </div>
            </div>
        </div> 
    )

}
export default Business;