import React, { useState } from "react"

const ImageSlider = ({ slides }) => {
    let image_url = " "
    const [currentIndex, setCurrentIndex] = useState(0);
    let len_slides = 0
    if(slides == " "){
        console.log("slide==space")
        slides = [
            { url: '/images/Ch_b2.jpg', title: 'chanel_brown' },
            { url: '/images/Ch_b2.jpg', title: 'chanel_black' }
        ]
    }
    else {
        slides = JSON.parse(slides)
        image_url = "http://127.0.0.1:8000/" + slides.info[currentIndex].url
        len_slides = slides.info.length
    }
    
    const slideStyles = {
        width: "100%",
        height: "100%",
        // borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage:  `url(${image_url})`
    };

    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "32px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    };

    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "32px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? len_slides - 1 : currentIndex - 1 //slides.length是陣列長度，所以slides.length - 1就是最後一張的index，把它存進newIndex再render就是最後一章顯示出來
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === len_slides - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }
    return (
        <>
            <div style={leftArrowStyles} onClick={goToPrevious}>L</div>
            <div style={rightArrowStyles} onClick={goToNext}>R</div>
            <div className="image_itself" style={slideStyles}>
                {/* images is inside this */}
            </div>
        </>
    )
}

export default ImageSlider;