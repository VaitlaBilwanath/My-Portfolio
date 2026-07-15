import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import "./ScrollTransition.css";

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.span
      className={`transition-char ${isSpace ? "space" : ""}`}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.img
      src={char}
      alt="Tech Icon"
      className="transition-icon"
      style={{
        x,
        scale,
        y,
        transformOrigin: "center",
      }}
    />
  );
};

const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 90, 0],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-Math.abs(distanceFromCenter) * 20, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.img
      src={char}
      alt="Tech Icon"
      className="transition-icon"
      style={{
        x,
        rotate,
        y,
        scale,
        transformOrigin: "center",
      }}
    />
  );
};

const Bracket = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      ></path>
    </svg>
  );
};

export const ScrollTransition = () => {
  const targetRef = useRef(null);
  const targetRef2 = useRef(null);
  const targetRef3 = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: targetRef2,
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: targetRef3,
  });

  const text = "vaitla bilwanath";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const techIcons = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
  ];
  const iconCenterIndex = Math.floor(techIcons.length / 2);

  return (
    <div className="scroll-transition-wrapper">
      <div className="scroll-hint-container">
        <span className="scroll-hint-text">
          Scroll to see more
        </span>
      </div>

      <div
        ref={targetRef}
        className="transition-section section-one"
      >
        <div
          className="transition-text-container"
          style={{
            perspective: "500px",
          }}
        >
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <div
        ref={targetRef2}
        className="transition-section section-two"
      >
        <p className="transition-sub">
          <Bracket className="transition-bracket" />
          <span>integrate with my tech stack</span>
          <Bracket className="transition-bracket flip-x" />
        </p>
        <div className="transition-icons-container">
          {techIcons.map((char, index) => (
            <CharacterV2
              key={index}
              char={char}
              index={index}
              centerIndex={iconCenterIndex}
              scrollYProgress={scrollYProgress2}
            />
          ))}
        </div>
      </div>

      <div
        ref={targetRef3}
        className="transition-section section-three"
      >
        <p className="transition-sub">
          <Bracket className="transition-bracket" />
          <span>building with clean structure</span>
          <Bracket className="transition-bracket flip-x" />
        </p>
        <div
          className="transition-icons-container"
          style={{
            perspective: "500px",
          }}
        >
          {techIcons.map((char, index) => (
            <CharacterV3
              key={index}
              char={char}
              index={index}
              centerIndex={iconCenterIndex}
              scrollYProgress={scrollYProgress3}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollTransition;
