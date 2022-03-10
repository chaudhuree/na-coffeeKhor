import styles from "./Banner.module.css";
const Banner = ({ buttonText, buttonClickHandler }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>coffee</span>{" "}
        <span className={styles.title2}>khor</span>{" "}
      </h1>
      <p className={styles.subTitle}>discover coffee shop near you!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={buttonClickHandler}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
