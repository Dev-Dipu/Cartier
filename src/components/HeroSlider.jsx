import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Logo365Svg from "/images/logo365.svg";
import MenuSvg from "/images/menu.svg";
import Menu from "./Menu";

const videos = [
    {
        bg: "https://365ayearof.cartier.com/hero-carousel/1_Creative_Alchemy_Desktop%20test%20loop%208%20sec.mp4",
        small: "https://365ayearof.cartier.com/hero-carousel/1_Creative_Alchemy_Secondary.mp4",
        title: "Time is an illusion",
        upcoming: "Creative Alchemy",
    },
    {
        bg: "https://365ayearof.cartier.com/hero-carousel/2_Trinity%20Desktop%20test%20loop%208%20sec.mp4",
        small: "https://365ayearof.cartier.com/hero-carousel/2_Trinity-secondary-test%208%20sec.mp4",
        title: "all linked by trinity",
        upcoming: "Illusion Breaker",
    },
    {
        bg: "https://365ayearof.cartier.com/hero-carousel/3_Precious_Hybrid_Desktop%20test%20loop%208%20sec.mp4",
        small: "https://365ayearof.cartier.com/hero-carousel/3_Precious_Hybrid_Secondary-test%208%20sec.mp4",
        title: "a precious new hybrid",
        upcoming: "venice film festival",
    },
    {
        bg: "https://365ayearof.cartier.com/hero-carousel/4_Venice_Desktop%20test%20loop%208%20sec_3.mp4",
        small: "https://365ayearof.cartier.com/hero-carousel/4_Venice_Secondary-test%208%20sec_3.mp4",
        title: "venice film festival",
        upcoming: "Illusion Breaker",
    },
];

const SLIDE_DURATION = 10; // seconds

const HeroSlider = () => {
    const [index, setIndex] = useState(0);
    const [cursorHidden, setCursorHidden] = useState(false); // 👈 hide/show cursor
    const [menuOpen, setMenuOpen] = useState(false);    

    const videoRefs = useRef([]);
    const smallRefs = useRef([]);
    const headingRef = useRef(null);
    const controlsRef = useRef(null);
    const intervalRef = useRef(null);

    const cursorRef = useRef(null);

    const nextSlide = () => setIndex((prev) => (prev + 1) % videos.length);
    const prevSlide = () =>
        setIndex((prev) => (prev - 1 + videos.length) % videos.length);

    // Reset auto-slide
    const resetInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            nextSlide();
        }, SLIDE_DURATION * 1000);
    };

    // Auto-slide setup
    useEffect(() => {
        resetInterval();
        return () => clearInterval(intervalRef.current);
    }, []);

    // Wipe animation
    useEffect(() => {
        const current = videoRefs.current[index];
        const prev =
            videoRefs.current[(index - 1 + videos.length) % videos.length];

        const smallCurrent = smallRefs.current[index];
        const smallPrev =
            smallRefs.current[(index - 1 + videos.length) % videos.length];

        videoRefs.current.forEach((v) => v && (v.style.zIndex = 0));
        smallRefs.current.forEach((s) => s && (s.style.zIndex = 0));

        if (prev) prev.style.zIndex = 1;
        if (current) current.style.zIndex = 2;
        if (smallPrev) smallPrev.style.zIndex = 1;
        if (smallCurrent) smallCurrent.style.zIndex = 2;

        const tl = gsap.timeline();

        // bg videos wipe
        tl.fromTo(
            current,
            { xPercent: 100, skewX: 10 },
            { xPercent: 0, skewX: 0, duration: 1.2, ease: "power4.inOut" }
        ).to(
            prev,
            { xPercent: -100, skewX: -10, duration: 1.2, ease: "power4.inOut" },
            "<"
        );

        // small video wipe (same as bg)
        tl.fromTo(
            smallCurrent,
            { xPercent: 100, skewX: 10 },
            { xPercent: 0, skewX: 0, duration: 1.2, ease: "power4.inOut" },
            "<"
        ).to(
            smallPrev,
            { xPercent: -100, skewX: -10, duration: 1.2, ease: "power4.inOut" },
            "<"
        );

        // heading + controls fade/blur
        tl.to(
            [headingRef.current, controlsRef.current],
            {
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.6,
                ease: "power2.out",
            },
            0
        ).fromTo(
            [headingRef.current, controlsRef.current],
            { opacity: 0, filter: "blur(10px)" },
            {
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out",
            },
            0.8
        );
    }, [index]);

    // Mouse move effect for cursor
    useEffect(() => {
        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power3.out",
            });
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <div className="hero relative h-screen text-white cursor-pointer">
            {/* Background videos */}
            <div className="fixed h-full w-full inset-0 -z-10 overflow-hidden">
                {videos.map((vid, i) => (
                    <video
                        key={i}
                        ref={(el) => (videoRefs.current[i] = el)}
                        className="absolute inset-0 w-full object-cover"
                        autoPlay
                        loop
                        muted
                    >
                        <source src={vid.bg} type="video/mp4" />
                    </video>
                ))}
            </div>

            {/* Foreground */}
            <div className="relative z-10 min-h-screen">
                {/* Header */}
                <div  className="flex justify-between items-center px-16 py-12">
                    <img
                        onClick={() => {
                            window.location.reload();
                        }} // reset slider on logo click
                        onMouseEnter={() => setCursorHidden(true)} // hide cursor
                        onMouseLeave={() => setCursorHidden(false)} // show cursor
                        src={Logo365Svg}
                        alt="Logo"
                        className="w-46 invert"
                    />
                    <img
                        onClick={() => setMenuOpen((prev) => !prev)}
                        onMouseEnter={() => setCursorHidden(true)} // hide cursor
                        onMouseLeave={() => setCursorHidden(false)} // show cursor
                        className="invert w-4"
                        src={MenuSvg}
                        alt="Menu"
                    />
                </div>

                {/* Info */}
                <div className="absolute top-2/5 px-[8%] w-full">
                    <div className="flex justify-between items-end relative">
                        {/* Small video + Title */}
                        <div className="flex items-center gap-10 relative">
                            <div className="w-36 aspect-[3/4] overflow-hidden relative">
                                {videos.map((vid, i) => (
                                    <video
                                        key={i}
                                        ref={(el) =>
                                            (smallRefs.current[i] = el)
                                        }
                                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                                            i === index
                                                ? "opacity-100 z-10"
                                                : "opacity-0 z-0"
                                        }`}
                                        autoPlay
                                        loop
                                        muted
                                        src={vid.small}
                                    />
                                ))}
                            </div>

                            <h1
                                ref={headingRef}
                                className="uppercase text-8xl w-124 leading-none font-[fanproitalic] relative z-20"
                            >
                                {videos[index].title}
                            </h1>
                        </div>

                        {/* Controls */}
                        <div
                            ref={controlsRef}
                            className="aspect-[4/3] flex flex-col justify-end gap-4 relative z-20 pointer-events-auto"
                            onMouseEnter={() => setCursorHidden(true)} // hide cursor
                            onMouseLeave={() => setCursorHidden(false)} // show cursor
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col w-44">
                                    <h3 className="uppercase text-[12px] opacity-70 font-[brillipro]">
                                        Next up
                                    </h3>
                                    <h3 className="uppercase text-[12px] text-nowrap font-[brillipro]">
                                        {
                                            videos[(index + 1) % videos.length]
                                                .upcoming
                                        }
                                    </h3>
                                </div>
                                <div className="btns flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            prevSlide();
                                            resetInterval();
                                        }}
                                    >
                                        <ChevronLeft className="w-6 h-6 cursor-pointer" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            nextSlide();
                                            resetInterval();
                                        }}
                                    >
                                        <ChevronRight className="w-6 h-6 cursor-pointer" />
                                    </button>
                                </div>
                            </div>

                            {/* Line loader */}
                            <div className="w-full h-0.5 bg-white/30 relative overflow-hidden">
                                <div
                                    key={index}
                                    className="absolute left-0 top-0 h-full bg-white animate-[lineFill_var(--d)_linear]"
                                    style={{ "--d": `${SLIDE_DURATION}s` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Menu open={menuOpen} />
            </div>

            {/* Custom cursor */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 ${
                    cursorHidden ? "opacity-0" : "opacity-100"
                }`}
            >
                <div className="border border-white text-white px-4 py-2 text-sm uppercase font-medium">
                    Read More
                </div>
            </div>

            {/* Tailwind keyframes */}
            <style>{`
          @keyframes lineFill {
            from { width: 0% }
            to { width: 100% }
          }
      `}</style>
        </div>
    );
};

export default HeroSlider;
