import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import Nav from 'react-bootstrap/Nav';
import Logout from './Logout';

function Header() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true); 
        }
    }, []);

    const handleLogoutClick = () => {
        localStorage.clear();
        setIsAuth(false);
        window.location.href = "/";
    };

    return (
        <div>
            <header className="header-upper py-3">
            <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <h2>
                                <Link className='text-dark'>UrPreaime</Link>
                            </h2>
                        </div>
                        <div className="d-none d-md-block col-5">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control py-2"
                                    placeholder="Search Product Here..."
                                    aria-label="Search Product Here..."
                                    aria-describedby="basic-addon2"
                                />
                                <span className="input-group-text p-3" id="basic-addon2">
                                    <BsSearch className='fs-5' />
                                </span>
                            </div>
                        </div>
                        <div className="d-none d-md-block col-5">
                            <div className="header-upper-links d-flex align-items-center gap-30 justify-content-end">
                                <div>
                <Nav>
                    {isAuth ? (
                        <Nav.Link as='button' onClick={handleLogoutClick}>Logout</Nav.Link>
                    ) : (
                        <Nav.Link href="/login">Login</Nav.Link>
                    )}
                </Nav>
                </div>
                                <div>
                                    <Link className='d-flex align-items-center gap-10 text-dark'>
                                        <img src="images/cart.svg" alt="cart" />
                                        <div className='d-flex flex-column'>
                                            <span className="badge bg-white text-dark">0</span>
                                            <p className='mb-0'>$ 500</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <nav className="header-bottom navbar navbar-expand-lg">
                <div className="container-xxl">
                    {/* <a className="navbar-brand" href="#">Navbar</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="menu-links navbar-nav d-flex align-items-center gap-25">
                            <li className="nav-item">
                                <NavLink className='text-dark' to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='text-dark' to='/'>Bags</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='text-dark' to='/'>Community</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='text-dark' to='/'>About/Contact</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 text-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className='me-5 d-inline-block'>Brand</span>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><Link className="dropdown-item text-dark" to="">LV</Link></li>
                                            <li><Link className="dropdown-item text-dark" to="">Balenciaga</Link></li>
                                            <li><Link className="dropdown-item text-dark" to="">Channel</Link></li>
                                        </ul>
                                    </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
            <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        </div>
    )
}

export default Header;
