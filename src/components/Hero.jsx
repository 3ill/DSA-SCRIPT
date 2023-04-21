import { dsa } from "../assets";
import { motion } from "framer-motion";
import { slideAnimation, fadeAnimation } from "../utils/motion";

const Hero = () => {
  const { headerWrapper, navWrapper, imageStyle, h2Style } = styles;
  const git = import.meta.env.VITE_GIT_URL;
  return (
    <header className={`${headerWrapper}`}>
      <motion.nav className={`${navWrapper}`} {...slideAnimation("left")}>
        <img src={dsa} alt="dsa_logo" className={`${imageStyle}`} />

        <button
          type="button"
          onClick={() => window.open(git)}
          className="black_btn"
        >
          Github
        </button>
      </motion.nav>
      <h1 className="head_text">
        {" "}
        Summarize Articles with <br className="max-md:hidden" />
        <span className="purple_gradient">OPENAI GPT-4</span>
      </h1>
      <motion.h2 className={`${h2Style}`} {...fadeAnimation}>
        Introducing DsaScript, an innovative open-source article summarizer
        designed to simplify lengthy articles into concise and clear summaries.{" "}
      </motion.h2>
    </header>
  );
};
const styles = {
  headerWrapper: "w-full flex justify-center items-center flex-col",
  navWrapper: "flex justify-between items-center flex-row w-full mb-10 pt-3",
  imageStyle: "w-16 object-contain rounded-md",
  h2Style: " desc",
};
export default Hero;
