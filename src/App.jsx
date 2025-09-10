import React, { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import HeroSlider from "./components/HeroSlider";
import Grid from "./components/Grid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import imageblockdata from './imageblockdata'

gsap.registerPlugin(ScrollTrigger);

const bgImages = [
    "https://365ayearof.cartier.com/images/compressedImages/landing-fullscreen_01-opt-1920.WEBP",
    "https://365ayearof.cartier.com/images/compressedImages/landing-fullscreen_02-opt-1920.WEBP",
    "https://365ayearof.cartier.com/images/compressedImages/landing-fullscreen_03-opt-1920.WEBP",
]; // replace with your background images

const App = () => {
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);
    const imageBlocksRef = useRef([]);
    const headingRefs = useRef([]);
    const subHeadingRefs = useRef([]);
    const bgDivRef = useRef(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        // Initialize Locomotive Scroll
        const locoScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 1.2,
        });

        // ScrollTrigger scrollerProxy
        ScrollTrigger.scrollerProxy(scrollRef.current, {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, {
                          duration: 0,
                          disableLerp: true,
                      })
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
        });

        locoScroll.on("scroll", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh();

        // Control HeroSlider opacity
        ScrollTrigger.create({
            scroller: scrollRef.current,
            start: "710vh top",
            onEnter: () => {
                document.querySelector(".heroslider").style.opacity = 0;
            },
            onLeaveBack: () => {
                document.querySelector(".heroslider").style.opacity = 1;
            },
        });

            // Fade out 'All Chapters' heading on scroll
            ScrollTrigger.create({
                scroller: scrollRef.current,
                trigger: ".allchapters-heading",
                start: "top 70%",
                end: "top 66%",
                scrub: true,
                // markers: true,
                onEnter: () => {
                    document.querySelector(".allchapters-heading").style.opacity = 0;
                },
                onLeaveBack: () => {
                    document.querySelector(".allchapters-heading").style.opacity = 1;
                },
            });

        // Animate each image block
        imageBlocksRef.current.forEach((block, i) => {
            // Zoom in/out animation
            gsap.timeline({
                scrollTrigger: {
                    scroller: scrollRef.current,
                    trigger: block,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true,
                },
            })
                .to(block, { scale: 1.22, ease: "linear" })
                .to(block, { scale: 1, ease: "linear" });

            // Heading animations
            gsap.to([headingRefs.current[i], subHeadingRefs.current[i]], {
                yPercent: 100,
                opacity: 1,
                ease: "power2.in",
                scrollTrigger: {
                    scroller: scrollRef.current,
                    trigger: block,
                    start: "top 50%",
                    end: "top 30%",
                    scrub: true,
                },
            });

            // Inside imageBlocksRef.current.forEach((block, i) => { ... })

            // Change background on enter/leave
            ScrollTrigger.create({
                scroller: scrollRef.current,
                trigger: block,
                start: "top top",
                end: "bottom bottom",
                onEnter: () => {
                    if (bgDivRef.current) {
                        bgDivRef.current.style.backgroundImage = `url(${bgImages[i]})`;
                        bgDivRef.current.style.backgroundSize = "cover";
                        bgDivRef.current.style.backgroundPosition = "center";
                    }
                },
                onEnterBack: () => {
                    if (bgDivRef.current) {
                        bgDivRef.current.style.backgroundImage = `url(${bgImages[i]})`;
                        bgDivRef.current.style.backgroundSize = "cover";
                        bgDivRef.current.style.backgroundPosition = "center";
                    }
                },
                onLeaveBack: () => {
                    if (bgDivRef.current && i === 0) {
                        bgDivRef.current.style.backgroundImage = "";
                    }
                },
            });

            // 🔥 Scale animation for background
            gsap.fromTo(
                bgDivRef.current,
                { scale: 1.3 }, // start scale
                {
                    scale: 1, // end scale
                    ease: "linear",
                    scrollTrigger: {
                        scroller: scrollRef.current,
                        trigger: block,
                        start: "top top", // when block starts
                        end: "bottom top", // until block ends
                        scrub: true,
                        // markers: true
                    },
                }
            );
        });

        return () => {
            if (locoScroll) locoScroll.destroy();
            ScrollTrigger.removeEventListener("refresh", () =>
                locoScroll.update()
            );
        };
    }, []);

    const titles = [
        "3 is the MAGIC NUMBER",
        "The Art of Time",
        "Jewels of Legacy",
    ];

    return (
        <div className="main text-black relative overflow-hidden">
            {loading && <Loader onComplete={() => setLoading(false)} />}
            <div
                ref={bgDivRef}
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
            ></div>

            <div
                ref={scrollRef}
                data-scroll-container
                className="maincontent relative"
            >
                <div className="heroslider">
                    <HeroSlider />
                </div>
                {/* Fullscreen background div */}
                <div className="content relative pt-20 -top-66">
                    <h2 className="allchapters-heading uppercase px-[8%] text-[10.5px] text-white font-[brillipro] mb-4" style={{ transition: 'opacity 0.3s' }}>
                        All Chapters
                    </h2>

                    {[0, 1, 2].map((_, i) => (
                        <div
                            key={i}
                            ref={(el) => (imageBlocksRef.current[i] = el)}
                            className="imageblock1  w-[84%] mx-auto bg-white pt-2 pb-20 overflow-hidden mb-160"
                        >
                            <h3
                                ref={(el) => (headingRefs.current[i] = el)}
                                className="uppercase text-center text-[10px] font-[brillipro] will-change-transform opacity-0"
                            >
                                chapter {i + 1}
                            </h3>
                            <h1
                                ref={(el) => (subHeadingRefs.current[i] = el)}
                                className="text-5xl text-center mt-12 font-[fanprolight] will-change-transform opacity-0"
                            >
                                {titles[i]}
                            </h1>
                            <Grid data={imageblockdata[i]} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
