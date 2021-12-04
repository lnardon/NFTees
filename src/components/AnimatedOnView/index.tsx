import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion, AnimationProps } from "framer-motion";

interface PropsInterface {
  renderProps: () => {};
  variants: AnimationProps["variants"];
  index: number | null;
  className: string;
}

function AnimatedOnViewport({
  renderProps,
  variants,
  index = null,
  className = "",
}: PropsInterface): JSX.Element {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      custom={index}
      className={className}
    >
      {renderProps()}
    </motion.div>
  );
}

export default AnimatedOnViewport;
