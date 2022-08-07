import Head from "next/head";
import Image from "next/image";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Loader from "../components/loader";
import { useState } from "react";
import Header from "../components/header";
import NewHeader from "../components/header2";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <AnimateSharedLayout type="crossfade">
      <AnimatePresence>
        {loading ? <Loader setLoading={setLoading} /> : <Header />}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}
