import React from "react"
import "./test.css"
import { Carousel } from "primereact/carousel"
const Test = () => {
    const images = [
        {
            src: "https://images.pexels.com/photos/1054222/pexels-photo-1054222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Có gì khó hơn không ạ",
            dess: "Hi folks, React has been developing and becoming more powerful day by day.",
        },
        {
            src: "https://images.pexels.com/photos/5707560/pexels-photo-5707560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Có gì khó hơn không ạ",
            dess: "Hi folks, React has been developing and becoming more powerful day by day.",
        },
        {
            src: "https://images.pexels.com/photos/1477836/pexels-photo-1477836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Có gì khó hơn không ạ",
            dess: "Hi folks, React has been developing and becoming more powerful day by day.",
        },
        {
            src: "https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Có gì khó hơn không ạ",
            dess: "Hi folks, React has been developing and becoming more powerful day by day.",
        },
    ]

    const imgTemplate = (image) => {
        return (
            <div className="relative">
                <div className="absolute top-1/3 left-[150px]">
                    <h1
                        className="text-4xl mb-2 pb-2 text-white typewriter"
                        data-animation="fadeInUp"
                        data-color="#fff"
                        data-delay="0.8s"
                    >
                        {image.name}
                    </h1>
                    <h6 className="text-lg description text-white">
                        {image.dess}
                    </h6>
                </div>
                <img
                    src={image.src}
                    alt={image.name}
                    className="!w-full !h-[100vh] object-cover"
                />
            </div>
        )
    }
    return (
        <div className="w-full h-[100vh] relative">
            <div className="card">
                <Carousel
                    value={images}
                    numVisible={1}
                    numScroll={1}
                    itemTemplate={imgTemplate}
                />
            </div>
            <svg
                class="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shape-rendering="auto"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g class="parallax">
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="0"
                        fill="rgba(16,172,234,0.7)"
                    />
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="3"
                        fill="rgba(16,172,234,0.5)"
                    />
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="5"
                        fill="rgba(255,255,255,0.3)"
                    />
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="7"
                        fill="rgb(16,172,234)"
                    />
                </g>
            </svg>
        </div>
    )
}

export default Test
