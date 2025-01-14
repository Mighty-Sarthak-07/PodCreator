import React, { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";

const CardsData = [
  {
    id: 1,
    img: "https://image.freepik.com/vecteurs-libre/illustration-concept-podcast_52683-53658.jpg",
    title: "Expand your mind, one podcast at a time.",
    desc: "Podcasts offer a convenient way to learn, stay informed, and entertain yourself while on the go. Whether it's for personal growth, professional insights, or simply relaxation, listening to podcasts enhances knowledge, sharpens skills, and keeps you connected to the world.",
  },
];

const Maincard = () => {
  const [expanded, setExpanded] = useState(false);

  const handleViewClick = () => {
    setExpanded(true); 
  };

  const handleCollapseClick = () => {
    setExpanded(false); 
  };

  return (
    <div className="lg:flex hidden container">
      <div className="p-10 ml-[300px] items-center  flex gap-6">
        {CardsData.map(({ id, img, title, desc }) => {
          return (
            <div
              key={id}
              className="text-white shadow-md rounded-lg overflow-hidden relative group "
            >
              <img
                src={img}
                alt=""
                className="w-full max-w-[500px] lg:max-h-[350px] rounded-lg"
              />
              <div className="absolute left-0 top-[-100%] opacity-0 group-hover:opacity-100 group-hover:top-[0] p-4 w-full h-full bg-black/60 group-hover:backdrop-blur-sm duration-500">
                <div className="space-y-4 p-6">
                  <Slide cascade>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <Fade cascade damping={0.05}>
                      <div className="text-sm">
                        {expanded ? desc : `${desc.substring(0, 100)}...`}
                      </div>
                    </Fade>
                    <div>
                      <button
                        onClick={expanded ? handleCollapseClick : handleViewClick}
                        className="border border-white px-4 py-2 rounded-lg text-sm hover:bg-black/20 duration-300"
                      >
                        {expanded ? "Collapse" : "View"}
                      </button>
                    </div>
                  </Slide>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Maincard;
