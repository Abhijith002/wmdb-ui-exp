import { AnimatePresence, motion, useTime } from "framer-motion";
import { useState } from "react";
import ActualHeader from "./actualHeader";

export default function Header() {
  // Slider images
  const imgData = [
    {
      url: "/images/bahubali.webp",
      initial: { scale: 0.9, x: "60%", zIndex: 1 },
    },
    {
      url: "/images/interstellar.webp",
      initial: { scale: 0.9, x: "40%", zIndex: 2 },
    },
    {
      url: "/images/skyfall.webp",
      initial: { scale: 0.9, x: "20%", zIndex: 3 },
    },
    {
      url: "/images/gravity.webp",
      initial: { scale: 1, x: "0%", zIndex: 10 },
    },
    {
      url: "/images/tron.webp",
      initial: { scale: 0.9, x: "-20%", zIndex: 3 },
    },
    {
      url: "/images/worldwar.webp",
      initial: { scale: 0.9, x: "-40%", zIndex: 2 },
    },
    {
      url: "/images/inglourious-basterds.webp",
      initial: { scale: 0.9, x: "-60%", zIndex: 1 },
    },
  ];

  // Slider image next states
  const [animStates, setAnimStates] = useState([
    {
      next: { scale: 0.9, x: "-60%", zIndex: 0 },
    },
    {
      next: { scale: 0.9, x: "60%", zIndex: 1 },
    },
    {
      next: { scale: 0.9, x: "40%", zIndex: 2 },
    },
    {
      next: { scale: 0.9, x: "20%", zIndex: 3 },
    },
    {
      next: { scale: 1, x: "0%", zIndex: 10 },
    },
    {
      next: { scale: 0.9, x: "-20%", zIndex: 3 },
    },
    {
      next: { scale: 0.9, x: "-40%", zIndex: 2 },
    },
  ]);

  // Calculate next state of the image slider
  const determineVariants = (itm, index) => {
    let val = { scale: 0.9, x: "-60%", zIndex: index };
    if (itm.next.x == "60%") {
      val.zIndex = 0;
      return val;
    } else {
      val = {
        scale: 0.9,
        x: (parseInt(itm.next.x) + 20).toString() + "%",
        zIndex:
          parseInt(itm.next.x) + 20 > 0
            ? itm.next.zIndex - 1
            : itm.next.zIndex + 1,
      };
    }

    if (val.x == "0%") {
      val.scale = 1;
      val.zIndex = 10;
    }
    return val;
  };

  // Animation complete handler
  const handleAnimItem = (definition, name) => {
    setAnimStates(
      animStates.map((anim, ind) => {
        let itm = determineVariants(anim, ind);
        return { next: itm };
      })
    );
  };

  // Images div
  const images = imgData.map((value, index) => {
    return (
      <motion.img
        className="max-w-full absolute last:relative top-0 left-0 transition-all outline-1 outline outline-transparent shadow-2xl rounded-3xl"
        initial={value.initial}
        animate={animStates[index].next}
        onAnimationComplete={(definition) =>
          handleAnimItem(definition, value, index)
        }
        transition={{
          duration: 5,
          ease: "easeInOut",
          delay: 2,
        }}
        src={value.url}
        // layoutId={value.layout && "main-image-1"}
        alt={"img" + index}
        key={"img" + index}
      />
    );
  });

  return (
    <div className="bg-white lg:pb-4">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <ActualHeader />

        <div className="w-full hidden lg:block bg-gray-50 border rounded-lg shadow-sm overflow-hidden">
          <section className="flex items-center justify-center">
            <motion.div className="my-5 mx-auto w-[650px] p-0 relative max-w-full inline-grid place-items-center items-end">
              {images}
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}
