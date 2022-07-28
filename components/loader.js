import Image from "next/image";
import { motion } from "framer-motion";
import joker from "/public/images/joker.webp";
import suicide from "/public/images/suicide.webp";
import godzilla from "/public/images/godzilla.webp";
import inception from "/public/images/inception.webp";
import odyssey from "/public/images/2001-a-space-odyssey.webp";
import avengers from "/public/images/avengers-endgame.webp";
import widow from "/public/images/black-widow.webp";
import kong from "/public/images/godzilla-vs-kong.webp";
import star from "/public/images/star-wars.webp";
import star2 from "/public/images/star-wars2.webp";
import lion from "/public/images/the-lion-king.webp";
import lord from "/public/images/the-lord-of-the-rings.webp";
// Import images

const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
};

export const ImageBlock = ({
  posX,
  posY,
  variants,
  id,
  name,
  classes,
  ids,
}) => {
  return (
    <motion.div
      variants={variants}
      className={`absolute origin-center flex items-center justify-center ${classes}`}
      style={{
        top: `${posY}vh`,
        left: `${posX}vw `,
      }}
    >
      <Image
        // className="w-full object-fill"
        src={id}
        // fallback={`/images/${id}.jpg`}
        alt={name}
      />
    </motion.div>
  );
};

export default function Loader() {
  return (
    <motion.div className="overflow-hidden h-screen">
      <motion.div
        variants={container}
        // onAnimationComplete={() => setLoading(false)}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <ImageBlock
          variants={item}
          id={joker}
          name="joker"
          classes="w-[400px] left-[16%] bottom-[14%]"
        />
        <motion.div
          variants={itemMain}
          className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center"
        >
          <motion.img
            className="w-[400px] flex"
            layoutId="main-image-1"
            src="/images/john.webp"
          />
        </motion.div>
        <ImageBlock
          variants={item}
          id={suicide}
          name="suicide"
          classes="w-[400px] right-[12%] top-[8%] "
        />
        <ImageBlock
          variants={item}
          id={inception}
          name="inception"
          classes="max-w-[400px] w-[40%] right-[20%] bottom-[12%]"
        />
        <ImageBlock
          variants={item}
          id={godzilla}
          name="godzilla"
          classes="w-[400px] left-[14%] top-[12%]"
        />
        <ImageBlock
          variants={item}
          id={odyssey}
          name="odyssey"
          classes="w-[400px] left-[2%] top-[2%]"
        />
        <ImageBlock
          variants={item}
          id={avengers}
          name="avengers"
          classes="w-[400px] left-[6%] bottom-[8%]"
        />
        <ImageBlock
          variants={item}
          id={widow}
          name="widow"
          classes="w-[400px] right-[26%] top-[4%]"
        />
        <ImageBlock
          variants={item}
          id={kong}
          name="kong"
          classes="w-[400px] right-[2%] bottom-[4%]"
        />
        <ImageBlock
          variants={item}
          id={star}
          name="star"
          classes="w-[400px] left-[30%] bottom-[4%]"
        />
        <ImageBlock
          variants={item}
          id={star2}
          name="star2"
          classes="w-[400px] left-[26%] top-[6%]"
        />
        <ImageBlock
          variants={item}
          id={lord}
          name="lord"
          classes="w-[400px] right-[36%] top-[18%]"
        />
        <ImageBlock
          variants={item}
          id={lion}
          name="lion"
          classes="w-[400px] left-[20%] bottom-[6%]"
        />
      </motion.div>
    </motion.div>
  );
}
