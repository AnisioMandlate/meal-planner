import styles from "./Loader.module.css";

const LoaderComponents = () => {
  return (
    <>
      <div>
        {" "}
        <span class={styles.skeleton_loader_background} />
      </div>
      <br />
      <div>
        <span class={styles.skeleton_loader_gradient} />
      </div>
      <div>
        <span class={styles.skeleton_loader} />
      </div>
    </>
  );
};

const Loader = () => {
  return (
    <div class={styles.skeleton_container}>
      <LoaderComponents />
      <br />
      <br />
      <LoaderComponents />
    </div>
  );
};

export default Loader;
