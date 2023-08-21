import React from "react";
// import NavbarConsumer from "./NavbarConsumer";
import banner_1 from "../../images/bagBanner01.gif"
import banner_2 from "../../images/bagBanner02.jpg"
import banner_3 from "../../images/bagBanner03.gif"

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const image = [
    {
        number: 1,
        title: 'Gambar 1',
        image: `${banner_1}`
    },
    {
        number: 2,
        title: 'Gambar 2',
        image: `${banner_2}`
    },
    {
        number: 3,
        title: 'Gambar 3',
        image: `${banner_3}`
    }
]
const delay = 2500;


function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translateX(${-index * 100}%)`}}
        // style={{ `position:'fixed', z-index:'-1'}}
      >
        {/* {colors.map((backgroundColor, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundColor }}> 
        </div>
        ))} */}
        {image.map((item, index) => (
            <div key={index} className="slide">
                <img
                    src={item.image}
                    className="img-fluid"
                    alt={item.title}
                />
            </div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;