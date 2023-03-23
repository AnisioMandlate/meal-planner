import styles from "./Loader.module.css";

const Loader = ({ bigSize }) => {
  return (
    <div className={`${styles.loader} ${bigSize && styles.bigSize}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
