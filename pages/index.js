import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/loader";
import { useEffect, useState } from "react";
import Header from "../components/header";
import MovieCards from "../components/movieCards";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
    if (window.localStorage.getItem("loaded")) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <AnimatePresence exitBeforeEnter>
      {loading ? (
        <motion.div key="loader">
          <Loader setLoading={setLoading} />
        </motion.div>
      ) : (
        <>
          <Header />
          <MovieCards />
        </>
      )}
    </AnimatePresence>
  );
}
