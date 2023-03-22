import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import NextImage from "next/image";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SLIDER_AUTOPLAY_INTERVAL = 5000;
const SLIDESHOW_PUBLIC_DIR = '/img/slideshow';
const SLIDESHOW_IMAGE_ALT = 'Fruit and veg';

const imageNames = [
    'fruit_10.jpeg',
    'fruit_9.jpeg',
];

const imagesList = imageNames.map((imageName, index) => {
    return (
        <Box
            key={index}
            className="keen-slider__slide"
            height='512px'
            overflow="hidden"
            borderRadius=".25em"
            sx={{
            }}
        >
            <NextImage
                fill
                style={{
                    objectFit: "cover",
                }}
                src={`${SLIDESHOW_PUBLIC_DIR}/${imageName}`}
                alt={SLIDESHOW_IMAGE_ALT}
            />
        </Box>
    );
});

type ArrowProps = {
  left?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (e: any) => void
}

function Arrow({ left, onClick }: ArrowProps ) {
    return (
        <svg
            onClick={onClick}
            className={`arrow arrow--${left ? "left" : "right"}`}
            cursor="pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    );
}

function Slider() {
    const theme = useTheme();

    const [loaded, setLoaded] = React.useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        created() {
            setLoaded(true);
        },
    }, [
        (slider) => {
            let timeout: ReturnType<typeof setTimeout>;
            let mouseOver = false;

            function clearNextTimeout() {
                clearTimeout(timeout);
            }

            function nextTimeout() {
                clearTimeout(timeout);
                if (mouseOver) return;
                timeout = setTimeout(() => {
                    slider.next();
                }, SLIDER_AUTOPLAY_INTERVAL);
            }

            slider.on('created', () => {
                slider.container.addEventListener('mouseover', () => {
                    mouseOver = true;
                    clearNextTimeout();
                });
                slider.container.addEventListener('mouseout', () => {
                    mouseOver = false;
                    nextTimeout();
                });
                nextTimeout();
            });

            slider.on('dragStarted', clearNextTimeout);
            slider.on('animationEnded', nextTimeout);
            slider.on('updated', nextTimeout);
        },
    ]);

    return (
        <Box sx={{
            position: "relative",
        }}>
            <div ref={sliderRef} className="keen-slider">
                {imagesList}
            </div>

            {loaded && instanceRef.current && (
                <Box sx={{
                    position: "absolute",
                    width: "100%",
                    height: "2em",
                    top: 255,
                    display: "flex",
                    justifyContent: "space-between",
                    fill: theme.palette.primary.light,
                }}>
                    <Arrow
                        left
                        onClick={(e: Event) => {
                            e.stopPropagation();
                            instanceRef.current?.prev();
                        }}
                    />

                    <Arrow
                        onClick={(e: Event) => {
                            e.stopPropagation();
                            instanceRef.current?.next();
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}

export default Slider;
