import React from "react";
import './Updatepage2.css'
import { useState, useEffect } from "react";



const Updatepage3 = (props) => {

    const [selectedFiles, setSelectedFiles] = useState([]);


    const handleFileChange = (e) => {
        const files = e.target.files;
        const newSelectedFiles = Array.from(files);
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...newSelectedFiles]);
        props.onChange(files); // 將選擇的檔案傳遞給父組件
    };

    console.log(selectedFiles);

    return (
        <div className="updatepage23">
            <div className="page23plusarrow">
                <div className="selectlist_includelisttitle">
                    <p>已選擇的鑑定照片：</p>
                    {selectedFiles.length > 0 && (
                        <ul>
                            {selectedFiles.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
            <div className="page23downzone">
                <input type="file" multiple onChange={(e) => {
                    handleFileChange(e);
                }} />
            </div>
        </div>

    )
}
export default Updatepage3