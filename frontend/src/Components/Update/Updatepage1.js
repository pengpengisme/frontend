import React from "react";
import './Updatepage1.css'
import BasicButtonExample from "./dropdown";


const Updatepage1 = ({ onChange }) => {
    const [brand, setBrand] = React.useState('');
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [length, setLength] = React.useState('');
    const [width, setWidth] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');

    React.useEffect(() => {
        onChange({
            brand: brand,
            name: name,
            age: age,
            length: length,
            width: width,
            height: height,
            category: category,
            description: description,
            price: price
        });
    }, [brand, name, age, length, width, height, category, description, onChange]);



    return (
        <div className="page1">
            <div className="page1leftzone">  {/* 左邊那區 */}
                <div className="page1leftbackgroundcolor">
                    <div className="page1leftbox">
                        <label>品牌</label>
                        <input className="leftinput" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                    </div>
                </div>
                <div className="page1leftbackgroundcolor">
                    <div className="page1leftbox">
                        <label>名稱</label>
                        <input className="leftinput" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                </div>
                <div className="page1leftbackgroundcolor">
                    <div className="page1leftbox">
                        <label>年齡</label>
                        <input className="leftinput" value={age} onChange={(e) => setAge(e.target.value)}></input>
                    </div>
                </div>
                <div className="page1leftbackgroundcolor">
                    <div className="page1leftbox">
                        <label>尺寸(長*寬*高)</label>
                        <div className="sizediv">
                            <input className="leftsize" value={length} onChange={(e) => setLength(e.target.value)}></input>
                            <p>*</p>
                            <input className="leftsize" value={width} onChange={(e) => setWidth(e.target.value)}></input>
                            <p>*</p>
                            <input className="leftsize" value={height} onChange={(e) => setHeight(e.target.value)}></input>
                        </div>
                    </div>
                </div>

                {/* <p className="smalltext">(長*寬*高)</p> */}
                <div className="page1leftbackgroundcolor">
                    <div className="page1leftbox">
                        <label>種類</label>
                        <input className="leftinput" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                    </div>
                </div>

                <div className="page1leftbackgroundcolor">
                    <div className="page1leftbox">
                        <label>價錢</label>
                        <input className="leftinput" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                    </div>
                </div>
            </div>

            <div className="page1rightzone"> {/* 右邊那區 */}
                <div className="page1rightbackgroundcolor">
                    <div className="page1rightbox">
                        <label >備註說明</label>
                        <input className="page1desc" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Updatepage1