import Image from "next/image";
import { AnimatePresence, motion, useTime } from "framer-motion";
import { useState } from "react";

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
    { url: "/images/gravity.webp", initial: { scale: 1, x: "0%", zIndex: 10 } },
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

  const [animItem, setAnimItem] = useState({
    scale: 0.75,
    x: "-50%",
    zIndex: 0,
  });
  const [animItem1, setAnimItem1] = useState({
    scale: 0.75,
    x: "50%",
    zIndex: 0,
  });
  const [animItem2, setAnimItem2] = useState({ scale: 1, x: "0%", zIndex: 10 });

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
        // layoutId={index === 3 ? "main-image-1" : ""}
        alt={"img" + index}
        key={"img" + index}
      />
    );
  });

  return (
    <div className="bg-white lg:pb-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <header className="flex justify-between items-center py-4 md:py-8">
          <a
            href="/"
            className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
            aria-label="logo"
          >
            <svg
              width="95"
              height="94"
              viewBox="0 0 95 94"
              className="w-6 h-auto text-indigo-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>
            WMDB
          </a>
          <nav className="hidden lg:flex gap-12">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 hover:bg-indigo-50 rounded-2xl p-3"
            >
              Home
            </a>
            <a
              href="#"
              className="inline-flex items-center text-indigo-500 text-lg font-semibold gap-1 hover:bg-indigo-50 rounded-2xl p-3"
            >
              Reviews
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 hover:bg-indigo-50 rounded-2xl p-3"
            >
              Propose New Addition
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 hover:bg-indigo-50 rounded-2xl p-3"
            >
              Vote
            </a>
          </nav>
          <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
            <a
              href="#"
              className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Connect Your Wallet
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Menu
          </button>
        </header>

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
