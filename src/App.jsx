import React, { useState } from "react";
import Loader from "./components/Loader";
import HeroSlider from "./components/HeroSlider";
import Grid from "./components/Grid";
import LocomotiveScroll from 'locomotive-scroll';



const App = () => {
  const [loading, setLoading] = useState(true); // Loader toggle
  const locomotiveScroll = new LocomotiveScroll();


  return (
    <div className="main text-black relative">
      {loading && (
        <Loader onComplete={() => setLoading(false)} />) }
        <div className="maincontent relative">
          <HeroSlider />
          
          <div className="content relative -top-40">
            <h2 className="uppercase px-[8%] text-[10.5px] text-white font-[brillipro] mb-2.5">All Chapters</h2>
            <div className="imageblock1 min-h-screen w-[84%] mx-auto bg-white pt-8 pb-20">
              <h3 className="uppercase text-center text-[10.5px] font-[brillipro]">chapter one</h3>
              <h1 className="text-5xl text-center mt-24 font-[fanprolight]">3 is the MAGIC NUMBER</h1>
              <Grid />
            </div>
          </div>
        </div>
    </div>
  );
};

export default App;
