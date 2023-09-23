import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { GoSearch } from "react-icons/go";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "../Cart/sidebar";
import { useNavigate } from 'react-router-dom';

const mId = sessionStorage.getItem('mId');
let pagedata;
const NavbarConsumer = () => {
    const isLoggedIn = !!mId; // 如果 mId 存在，isLoggedIn 为 true

    //menu
    const [sidebarWidth, setSidebarWidth] = useState('0px');
    const [sidebarOpacity, setSidebarOpacity] = useState(0);

    const openSidebar = () => {
        setSidebarWidth('350px');
        setSidebarOpacity(1);
    };
    const closeSidebar = () => {
        setSidebarWidth('0px');
        setSidebarOpacity(0);
    };

    //購物車
    const [cartsidebarWidth, setcartSidebarWidth] = useState('0px');
    const [cartsidebarOpacity, setcartSidebarOpacity] = useState(0);
    const opencartSidebar = () => {
        setcartSidebarWidth('400px');
        setcartSidebarOpacity(1);
    };
    const closecartSidebar = () => {
        setcartSidebarWidth('0px');
        setcartSidebarOpacity(0);
    };

    //搜尋框
    const [searchbarHeight, setsearchbarHeight] = useState('0px');
    const [searchbarOpacity, setsearchbarOpacity] = useState(0);

    const openSearchbar = () => {
        setsearchbarHeight('100%');
        setsearchbarOpacity(1);
    }
    const closeSearchbar = () => {
        setsearchbarHeight('0px');
        setsearchbarOpacity(0);
    }
    const [SearchQuery, setSearchQuery] = useState('');
    const [SearchResult, setSearchResult] = useState([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    useEffect(() => {
        console.log("searchchange " + SearchQuery);
        if (SearchQuery === '') {
            setSearchResult([]); // 清空搜索结果
        } else {
            const event = new Event('submit'); // 创建一个新的事件对象
            handleSearchSubmit(event); // 执行搜索并传递事件对象

        }
    }, [SearchQuery]);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/search/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ SearchQuery })
            })
            if (response.ok) {
                const data = await response.json();
                setSearchResult(data);
                if (Array.isArray(SearchResult)) {
                    console.log("searchResult is an array:", SearchResult);
                    console.log("submit!!" + SearchQuery);
                }
                else (console.log(typeof (SearchResult)))
            }
        }
        catch (error) {
            console.error("An error occurred:", error)
        }

    }

    function parsejson(dataString) {
        const picjson = JSON.parse(dataString);
        const result = `http://127.0.0.1:8000/${picjson.info[0].url}`;
        return result;
    }

    // const Navigate = useNavigate();
    // const handlepagechange = async (event) => {
    //     event.preventDefault();
    //     console.log('煥業')
    // }

    return (
        <div className='nav-up_outline'>
            <nav className='nav-up'>
                <a href={`/`} className='site-title'>Brandency</a>
                <div className='nav_group'>
                    <div className='link_group'>
                        <div className='border'>
                            <a href="/home" className='link'>探索包款</a>
                        </div>
                        {isLoggedIn && (<div className='border'><a href="/member" className='link'>會員資訊</a></div>)}
                        {isLoggedIn && (<div className='border'><a href="/logout" className='link'>&nbsp;登出&nbsp;</a></div>)}
                        {!isLoggedIn && (<div className='border'><a href="/login" className='link'>註冊登入</a></div>)}
                    </div>
                    <div className='icon_group'>
                        <button type="button" className="searchicon" onClick={openSearchbar} style={{ marginTop: '-4.5%' }}><GoSearch /></button>  {/*搜尋*/}
                        <button type="button" className="searchicon" onClick={opencartSidebar} style={{ marginTop: '-4.5%' }}><BsHandbag /></button> {/*購物車*/}
                        <button type="button" className="searchicon" onClick={openSidebar} style={{ marginTop: '-4.5%' }}><AiOutlineMenu /></button> {/*menu*/}
                    </div>

                    {/* linksidebar */}
                    <div className="linksidebar" style={{ width: sidebarWidth }}>
                        <a className="closebtn" onClick={closeSidebar}>×</a>
                        <div className="overlay-content" style={{ opacity: sidebarOpacity, transition: "all 0.5s 0s" }}>
                            {isLoggedIn && (<a href="/member_order">我的訂單</a>)}
                            <a href="/home" className='link'>探索包款</a>
                            {isLoggedIn && (<a href="/member" className='link'>會員資訊</a>)}
                            {isLoggedIn && (<a href="/logout" className='link'>帳戶登出</a>)}
                            {!isLoggedIn && (<a href="/login" className='link'>註冊登入</a>)}
                        </div>
                    </div>

                    {/* 購物車sidebar */}
                    <div className="cartsidebar" style={{ width: cartsidebarWidth }}>
                        <a className="closebtn" onClick={closecartSidebar}>×</a>
                        <div className="shoppingcart" style={{ opacity: cartsidebarOpacity, transition: "all 0.5s" }}><Sidebar /></div>
                    </div>


                </div>
            </nav>

            {/* 搜尋bar */}
            <div className='searchbar' style={{ height: searchbarHeight, opacity: searchbarOpacity, transition: "height 0.3s cubic-bezier(0.4, 0, 1, 1), opacity 0.3s cubic-bezier(0.4, 0, 1, 1), margin 0.3s cubic-bezier(0.4, 0, 1, 1), display 0.3s cubic-bezier(0.4, 0, 1, 1)" }}>
                <div className='searchbar_Asection'>
                    <div className='searchbar_icon'><GoSearch /></div>
                    <div className='searchbar_input_div'>
                        <form onSubmit={handleSearchSubmit}>
                            <input type="text" className="searchbar_input" name="search" autoComplete="off" autoCorrect="off" autoCapitalize="off" aria-label="搜尋" placeholder="搜尋" value={SearchQuery} onChange={handleSearchChange}></input>
                        </form>
                    </div>
                    <div className='searchbar_btn_div'><a className="searchbar_closebtn" onClick={closeSearchbar}>×</a></div>
                </div>
                <div className='searchresult'>

                    {SearchResult.map((item, index) => (

                        <a href={`http://127.0.0.1:8000/bag/${item.pId}`} >
                            <div key={index} className='eachresult'>
                                <img src={parsejson(item.pic)} className='searchimg'></img>
                                <div className='resultp'>
                                    <p className='resultpp'>{item.brand}/ </p>

                                    <p className='resultpp'> {item.name}</p>
                                </div>
                            </div>
                        </a>
                    ))}

                </div>



            </div>
        </div>
    )


}

export default NavbarConsumer;