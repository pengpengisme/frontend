import React, {useState} from 'react';
import "./Navbar.css";
import { GoSearch } from "react-icons/go";
import { AiOutlineMenu } from "react-icons/ai";

const NavbarManager = () => {
    const linkNumbers = [1, 2, 3];
    const link = ["/update", "/business", "/flow_system"];
    const linkTag = ["上架商品", "商品管理", "檢驗系統"];

    //menu
    const [sidebarWidth, setSidebarWidth] = useState('0px');
    const [sidebarOpacity, setSidebarOpacity] = useState(0);

    const openSidebar = () => {
        setSidebarWidth('350px');
        setSidebarOpacity(1);
    };
    const closeSidebar = () =>{
        setSidebarWidth('0px');
        setSidebarOpacity(0);
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

    return (
        <>
            <div className='nav-up_outline'>
                <nav className='nav-up'>
                    <a href='/' className='site-title'>PETER</a>
                    <div className='nav_group'>
                        <div className='link_group'>
                            {linkNumbers.map((linkNumber, index) => (
                                <> 
                                    <div className='border business_border'>
                                        <a key={linkNumber} href={link[index]} className='link'>{linkTag[index]}</a>
                                    </div> 
                                </>
                            ))} 
                        </div>
                        <div className='icon_group'>
                            <button type="button" className="searchicon" onClick={openSearchbar} style={{marginTop: '-4.5%'}}><GoSearch /></button>  {/*搜尋*/}
                            <button type="button" className="searchicon" onClick={openSidebar} style={{marginTop: '-4.5%'}}><AiOutlineMenu /></button> {/*menu*/}
                        </div>

                        {/* linksidebar */}
                        <div className="linksidebar" style={{ width: sidebarWidth }}>
                            <a className="closebtn" onClick={closeSidebar}>×</a>
                            <div className="overlay-content" style={{ opacity:sidebarOpacity, transition: "all 0.5s 0s" }}>
                                {linkNumbers.map((linkNumber, index) => (
                                    <a key={linkNumber} href={link[index]}>{linkTag[index]}</a>
                                ))}  
                            </div>
                        </div>
                    </div>
                </nav>

                {/* 搜尋bar */}
                <div className='searchbar' style={{ height: searchbarHeight, opacity:searchbarOpacity, transition: "height 0.3s cubic-bezier(0.4, 0, 1, 1), opacity 0.3s ease-in-out" }}>
                    <div className='searchbar_icon'><GoSearch /></div>
                    <div className='searchbar_input_div'><input type="text" className="searchbar_input" name="search" autoComplete="off" autoCorrect="off" autoCapitalize="off" aria-label="搜尋" placeholder="搜尋"></input></div>
                    <div className='searchbar_btn_div'><a className="searchbar_closebtn" onClick={closeSearchbar}>×</a></div>
                </div>
            </div>
        </>
    )
}

export default NavbarManager;