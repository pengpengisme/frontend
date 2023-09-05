import React, {useState} from "react";

import Flow_stage1 from "./Flow_stage1";
import Flow_stage2 from "./Flow_stage2";
import Flow_stage3 from "./Flow_stage3";
import Flow_stage4 from "./Flow_stage4";

import flow1 from "../../images/stage_1.png";
import flow2 from "../../images/stage_2.png";
import flow3 from "../../images/stage_3.png";
import flow4 from "../../images/stage_4.png";

import "./Flow.css";

const Flow = ()=>{

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [1, 2, 3, 4, 5];

    const setPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const updateDataForPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <div className="flow_page">
            <div className="flow_page_text">
                <p>連接裝置</p>
                <p>拍攝中</p>
                <p>系統比對中</p>
                <p>檢測結果</p>
            </div>
            {currentPage === 1 && <img src={flow1} className="flow flow_width" />}
            {currentPage === 1 && <Flow_stage1 />}

            {currentPage === 2 && <img src={flow2} className="flow flow_width" />}
            {currentPage === 2 && <Flow_stage2 />}

            {currentPage === 3 && <img src={flow3} className="flow flow_width" />}
            {currentPage === 3 && <Flow_stage3 />}

            {currentPage === 4 && <img src={flow4} className="flow flow_width" />}
            {currentPage === 4 && <Flow_stage4 />}

            {/* <div className="buttonzone">
                <button onClick={updateprebutton} className="button81">上一步</button>
                <button onClick={updatenextbutton} className="button81">下一步</button>
            </div> */}
        </div>
    )

}

export default Flow;