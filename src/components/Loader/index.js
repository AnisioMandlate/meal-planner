import styles from "./Loader.module.css";
import { motion } from "framer-motion";

const LoaderComponents = () => {
  return (
    <>
      <div>
        {" "}
        <span className={styles.skeleton_loader_background} />
      </div>
      <br />
      <div>
        <span className={styles.skeleton_loader_gradient} />
      </div>
      <div>
        <span className={styles.skeleton_loader} />
      </div>
    </>
  );
};

const Loader = () => {
  return (
    <div className={styles.skeleton_container}>
      <LoaderComponents />
      <br />
      <br />
      <LoaderComponents />
    </div>
  );
};

export const RouteLoader = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0 } }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className={styles.route_loader}
    >
      Loading...
    </motion.div>
  );
};

export default Loader;
