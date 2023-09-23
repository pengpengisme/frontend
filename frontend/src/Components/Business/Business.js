import React, { useState } from "react";
import DataProvider from "../Dataprovider";
import Deposite from './pages/Manager_deposite';
import File_create from "./pages/Manager_file_create";
import To_ship from "./pages/Manager_to_ship";
import Renting from './pages/Manager_renting';
import File_update from "./pages/Manager_file_update"
import Takeoff from './pages/Manager_takeoff';

const Business= () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [1, 2, 3, 4, 5, 6];
    const pageNames = ["倉庫存放中", "待建檔", "出貨中", "租借中", "待處理", "已下架商品"];

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
                        {currentPage === 2 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=file_create" render={data => <File_create data={data} onUpdateData={() => updateDataForPage(2)} />} />}
                        {currentPage === 3 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=to_ship" render={data => <To_ship data={data} onUpdateData={() => updateDataForPage(3)} />} />}
                        {currentPage === 4 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=renting" render={data => <Renting data={data} onUpdateData={() => updateDataForPage(4)} />} />}
                        {currentPage === 5 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=file_update" render={data => <File_update data={data} onUpdateData={() => updateDataForPage(5)} />} />}
                        {currentPage === 6 && <DataProvider endpoint="http://127.0.0.1:8000/api/business/?state=takeoff" render={data => <Takeoff data={data} onUpdateData={() => updateDataForPage(6)} />} />}
                    </div>
                </div>
            </div>
        </div> 
    )

}
export default Business;