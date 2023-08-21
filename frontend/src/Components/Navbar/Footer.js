import React from 'react'
import { Link } from 'react-router-dom'
import { BsInstagram, BsYoutube, BsFacebook } from 'react-icons/bs'

const Footer = () => {
    return (
        <>
            <footer className='py-4'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12 col-md-3 text-center">
                            <h4 className='text-dark mb-4'>Contact us</h4>
                            <div className='text-center'>
                                <address className='text-dark fs-6'>
                                    高雄市<br />
                                    鼓山區蓮海路70號
                                </address>
                                <a href="tel: +000 123456789" className='mt-3 d-block mb-2 text-dark'>+000 123456789</a>
                                <a href="mailto: test123@gmail.com" className='mt-3 d-block mb-2 text-dark'>test123@gmail.com</a>
                                <div className="social_icons align-items-center gap-25 mt-4">
                                    <a className='text-dark mx-3' href="">
                                        <BsInstagram className='fs-4' />
                                    </a>
                                    <a className='text-dark mx-3' href="">
                                        <BsFacebook className='fs-4' />
                                    </a>
                                    <a className='text-dark mx-3' href="">
                                        <BsYoutube className='fs-4' />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 text-center">
                            <h4 className='text-dark mb-4'>Information</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className='text-dark py-2 mb-1'>Privacy Policy</Link>
                                <Link className='text-dark py-2 mb-1'>Refund Policy</Link>
                                <Link className='text-dark py-2 mb-1'>Shipping Policy</Link>
                                <Link className='text-dark py-2 mb-1'>Terms & Condition</Link>
                                <Link className='text-dark py-2 mb-1'>Blogs</Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 text-center">
                            <h4 className='text-dark mb-4'>Account</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className='text-dark py-2 mb-1'>About Us</Link>
                                <Link className='text-dark py-2 mb-1'>Contact</Link>
                                <Link className='text-dark py-2 mb-1'>Faq</Link>
                            </div>
                        </div>
                        <div className='col-12 col-md-3 text-center'>
                            <h4 className='text-dark mb-4'>Quick Links</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className='text-dark py-2 mb-1'>Pouches</Link>
                                <Link className='text-dark py-2 mb-1'>Buckeet Bags</Link>
                                <Link className='text-dark py-2 mb-1'>Totes</Link>
                                <Link className='text-dark py-2 mb-1'>Backpacks</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className='py-4'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className='text-center mb-0 text-dark'>&copy; {new Date().getFullYear()}, By Zhuanti Group</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer