import React, { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import HeroSlider from "./components/HeroSlider";
import Grid from "./components/Grid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";


gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);
  const imageBlockRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const locomotivescroll = new LocomotiveScroll({
    el: document.querySelector(".maincontent"),
    smooth: true,
  });

  useEffect(() => {
    if (imageBlockRef.current) {
      // ✅ Timeline for zoom in → zoom out
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageBlockRef.current,
          start: "top 80%",   // section starts entering
          end: "bottom 40%",  // till it leaves
          scrub: 2,
        },
      });

      // zoom in (1 → 1.2)
      tl.to(imageBlockRef.current, { scale: 1.2, ease: "linear" });
      // zoom out (1.2 → 1)
      tl.to(imageBlockRef.current, { scale: 1, ease: "linear" });
    }

    // ✅ Text slide down (mask out effect)
    if (headingRef.current && subHeadingRef.current) {
      gsap.to([headingRef.current, subHeadingRef.current], {
        yPercent: 100, // slide down
        opacity: 1,    // fade out a bit
        ease: "power2.in",
        scrollTrigger: {
          trigger: imageBlockRef.current,
          start: "top 50%",   // when block enters
          end: "top 30%",     // slightly scroll
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <div className="main text-black relative overflow-hidden">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className="maincontent relative">
        <HeroSlider />

        <div className="content relative -top-40">
          <h2 className="uppercase px-[8%] text-[10.5px] text-white font-[brillipro] mb-2.5">
            All Chapters
          </h2>
          <div
            ref={imageBlockRef}
            className="imageblock1 min-h-screen w-[84%] mx-auto bg-white pt-8 pb-20 overflow-hidden"
          >
            {/* heading to be masked out */}
            <h3
              ref={headingRef}
              className="uppercase text-center text-[10.5px] font-[brillipro] will-change-transform opacity-0"
            >
              chapter one
            </h3>
            <h1
              ref={subHeadingRef}
              className="text-5xl text-center mt-24 font-[fanprolight] will-change-transform opacity-0"
            >
              3 is the MAGIC NUMBER
            </h1>

            <Grid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
