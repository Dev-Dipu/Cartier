import React, { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import HeroSlider from "./components/HeroSlider";
import Grid from "./components/Grid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

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
          ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
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
        document.querySelector('.heroslider').style.opacity = 0;
      },
      onLeaveBack: () => {
        document.querySelector('.heroslider').style.opacity = 1;
      }
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
      }).to(block, { scale: 1.22, ease: "linear" }).to(block, { scale: 1, ease: "linear" });

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

      // Change background image when block reaches bottom
      ScrollTrigger.create({
        scroller: scrollRef.current,
        trigger: block,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => {
          if (bgDivRef.current) {
        bgDivRef.current.style.backgroundImage = `url(${bgImages[i]})`;
        bgDivRef.current.style.backgroundSize = "cover";
        bgDivRef.current.style.backgroundPosition = "center"
        bgDivRef.current.style.transform = "scale(1.22)";
          }
        },
        onEnterBack: () => {
          if (bgDivRef.current) {
        bgDivRef.current.style.backgroundImage = `url(${bgImages[i]})`;
        bgDivRef.current.style.backgroundSize = "cover";
        bgDivRef.current.style.backgroundPosition = "center";
        bgDivRef.current.style.transform = "scale(1.22)";
          }
        },
        onLeave: () => {
          if (bgDivRef.current) {
        bgDivRef.current.style.transform = "scale(1)";
          }
        },
        onLeaveBack: () => {
          if (bgDivRef.current && i===0) {
        bgDivRef.current.style.backgroundImage = "";
        bgDivRef.current.style.transform = "scale(1)";
          }
        },
        scrub: true,
      });

      // Animate background zoom out as you scroll through the block
      gsap.from(bgDivRef.current, {
        scale: 1.2,
        ease: "linear",
        scrollTrigger: {
          scroller: scrollRef.current,
          trigger: block,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });

    return () => {
      if (locoScroll) locoScroll.destroy();
      ScrollTrigger.removeEventListener("refresh", () => locoScroll.update());
    };
  }, []);

  return (
    <div className="main text-black relative overflow-hidden">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div
        ref={bgDivRef}
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
      ></div>    

      <div ref={scrollRef} data-scroll-container className="maincontent relative">
        <div className="heroslider">
          <HeroSlider />
        </div>
        {/* Fullscreen background div */}
        <div className="content relative pt-20 -top-66">
          <h2 className="uppercase px-[8%] text-[10.5px] text-white font-[brillipro] mb-10">
            All Chapters
          </h2>

          {[0, 1, 2].map((_, i) => (
            <div
              key={i}
              ref={(el) => (imageBlocksRef.current[i] = el)}
              className="imageblock1 min-h-screen w-[84%] mx-auto bg-white pt-2 pb-20 overflow-hidden mb-160"
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
                3 is the MAGIC NUMBER
              </h1>
              <Grid />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
