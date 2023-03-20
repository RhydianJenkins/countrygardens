import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import NextImage from "next/image";
import { Box } from "@mui/material";

const images = [
    { image: "/img/slideshow/fruit_10.jpeg", alt: "image1" },
];

const imagesList = images.map((image, index) => {
    return (
        <Box
            position='relative'
            key={index}
        >
            <NextImage
                fill
                src={image.image}
                alt={image.alt}
            />
        </Box>
    );
});

function Arrow(props: {
  left?: boolean
  onClick: (e: any) => void
}) {
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    );
}

function Slider() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [loaded, setLoaded] = React.useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    return (
        <>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    {imagesList}
                </div>

                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                        />

                        <Arrow
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                        />
                    </>
                )}
            </div>

            {loaded && instanceRef.current && (
                <div className="dots">
                    {images.map((_image, idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx);
                                }}
                                className={"dot" + (currentSlide === idx ? " active" : "")}
                            ></button>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default Slider;
